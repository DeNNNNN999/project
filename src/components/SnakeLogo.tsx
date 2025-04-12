import React, { useRef, useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import * as THREE from 'three'
import gsap from 'gsap'
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise.js'

// --- Procedural Texture Generation ---

const createProceduralPythonMaps = (
  width = 1024,
  height = 1024,
  baseColor = new THREE.Color('#3A2D1E'), // Dark brown base
  patternColor1 = new THREE.Color('#B8860B'), // Dark goldenrod
  patternColor2 = new THREE.Color('#FADA5E'), // Lighter gold
  edgeColor = new THREE.Color('#1C160E'), // Dark edge/detail
  scaleNoiseStrength = 0.15,
  patternScale = 0.008,
) => {
  const canvasAlbedo = document.createElement('canvas')
  const canvasNormal = document.createElement('canvas')
  const canvasRough = document.createElement('canvas')
  canvasAlbedo.width = canvasNormal.width = canvasRough.width = width
  canvasAlbedo.height = canvasNormal.height = canvasRough.height = height

  const ctxAlbedo = canvasAlbedo.getContext('2d')
  const ctxNormal = canvasNormal.getContext('2d')
  const ctxRough = canvasRough.getContext('2d')
  if (!ctxAlbedo || !ctxNormal || !ctxRough) throw new Error('Failed to get 2D context')

  const simplex = new SimplexNoise()

  // Fill base colors
  ctxAlbedo.fillStyle = baseColor.getStyle()
  ctxAlbedo.fillRect(0, 0, width, height)
  ctxNormal.fillStyle = 'rgb(128, 128, 255)' // Base normal map color (flat)
  ctxNormal.fillRect(0, 0, width, height)
  ctxRough.fillStyle = 'rgb(180, 180, 180)' // Base roughness (0.7)
  ctxRough.fillRect(0, 0, width, height)

  const imgDataAlbedo = ctxAlbedo.getImageData(0, 0, width, height)
  const imgDataNormal = ctxNormal.getImageData(0, 0, width, height)
  const imgDataRough = ctxRough.getImageData(0, 0, width, height)
  const dataAlbedo = imgDataAlbedo.data
  const dataNormal = imgDataNormal.data
  const dataRough = imgDataRough.data

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const u = x / width
      const v = y / height

      // --- Patterns (Albedo) ---
      const noiseVal = simplex.noise(x * patternScale, y * patternScale * 0.5)
      const patternShape = Math.abs(simplex.noise(x * patternScale * 0.5, y * patternScale * 1.5) * 2.0)
      const patternMask =
        THREE.MathUtils.smoothstep(noiseVal, 0.4, 0.6) * (1.0 - THREE.MathUtils.smoothstep(patternShape, 0.8, 1.2))

      const edgeMask =
        THREE.MathUtils.smoothstep(noiseVal, 0.35, 0.4) * (1.0 - THREE.MathUtils.smoothstep(noiseVal, 0.6, 0.65))

      let color = baseColor.clone()
      const patternMix = patternColor1.clone().lerp(patternColor2, Math.sin(x * 0.05) * 0.5 + 0.5)
      color.lerp(patternMix, patternMask)
      color.lerp(edgeColor, edgeMask * 0.8)

      // --- Scales (Albedo, Normal, Roughness) ---
      const scaleX = x / (width * 0.015)
      const scaleY = y / (height * 0.025) + (Math.floor(x / (width * 0.015)) % 2 === 0 ? 0.5 : 0)
      const scaleU = scaleX - Math.floor(scaleX)
      const scaleV = scaleY - Math.floor(scaleY)
      const scaleDist = Math.sqrt((scaleU - 0.5) ** 2 + (scaleV - 0.5) ** 2) * 2.0 // 0 to ~1.4

      const scaleMask = 1.0 - THREE.MathUtils.smoothstep(0.7, 0.8, scaleDist)
      const scaleEdge =
        THREE.MathUtils.smoothstep(0.65, 0.7, scaleDist) * (1.0 - THREE.MathUtils.smoothstep(0.8, 0.85, scaleDist))

      // Darken between scales (Albedo)
      color.multiplyScalar(1.0 - scaleEdge * 0.3)
      // Add slight color variation based on scale position
      const scaleNoise = simplex.noise(scaleX * 0.5, scaleY * 0.5) * scaleNoiseStrength
      color.offsetHSL(scaleNoise * 0.1, scaleNoise * 0.2, scaleNoise * 0.1)

      dataAlbedo[idx] = color.r * 255
      dataAlbedo[idx + 1] = color.g * 255
      dataAlbedo[idx + 2] = color.b * 255
      dataAlbedo[idx + 3] = 255

      // --- Normal Map Generation ---
      const scaleNormalStrength = 1.0
      const nx = (scaleU - 0.5) * scaleNormalStrength * scaleMask
      const ny = (scaleV - 0.5) * scaleNormalStrength * scaleMask * 0.8 // Scales are flatter vertically
      const nz = Math.sqrt(1.0 - nx * nx - ny * ny)
      dataNormal[idx] = (nx + 1.0) * 0.5 * 255
      dataNormal[idx + 1] = (ny + 1.0) * 0.5 * 255
      dataNormal[idx + 2] = nz * 255
      dataNormal[idx + 3] = 255

      // --- Roughness Map ---
      const baseRoughness = 0.7
      const scaleRoughness = 0.5 // Scales slightly smoother
      const roughVal = THREE.MathUtils.lerp(baseRoughness, scaleRoughness, scaleMask)
      dataRough[idx] = roughVal * 255
      dataRough[idx + 1] = roughVal * 255
      dataRough[idx + 2] = roughVal * 255
      dataRough[idx + 3] = 255
    }
  }

  ctxAlbedo.putImageData(imgDataAlbedo, 0, 0)
  ctxNormal.putImageData(imgDataNormal, 0, 0)
  ctxRough.putImageData(imgDataRough, 0, 0)

  const albedoTexture = new THREE.CanvasTexture(canvasAlbedo)
  const normalTexture = new THREE.CanvasTexture(canvasNormal)
  const roughnessTexture = new THREE.CanvasTexture(canvasRough)

  albedoTexture.wrapS = albedoTexture.wrapT = THREE.RepeatWrapping
  normalTexture.wrapS = normalTexture.wrapT = THREE.RepeatWrapping
  roughnessTexture.wrapS = roughnessTexture.wrapT = THREE.RepeatWrapping

  albedoTexture.needsUpdate = true
  normalTexture.needsUpdate = true
  roughnessTexture.needsUpdate = true

  return { albedoTexture, normalTexture, roughnessTexture }
}

// --- Snake Eye Texture (Similar to previous but maybe slightly adjusted) ---
const createSnakeEyeTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext('2d')
  if (!ctx) return new THREE.CanvasTexture(canvas)

  ctx.fillStyle = '#100802'
  ctx.fillRect(0, 0, 256, 256)

  const gradient = ctx.createRadialGradient(128, 128, 60, 128, 128, 115)
  gradient.addColorStop(0, '#FCEABB') // Lighter Yellow Core
  gradient.addColorStop(0.5, '#E8A317') // Gold/Orange
  gradient.addColorStop(0.8, '#B8860B') // Dark Gold
  gradient.addColorStop(1, '#4A3305') // Dark Brown edge
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.arc(128, 128, 115, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#000000' // Pupil
  ctx.beginPath()
  ctx.ellipse(128, 128, 10, 95, 0, 0, Math.PI * 2)
  ctx.fill()

  // Iris details
  ctx.strokeStyle = 'rgba(0,0,0,0.3)'
  ctx.lineWidth = 1
  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 60 + Math.random() * 50
    ctx.beginPath()
    ctx.moveTo(128 + Math.cos(angle) * 60, 128 + Math.sin(angle) * 60)
    ctx.lineTo(128 + Math.cos(angle) * radius, 128 + Math.sin(angle) * radius)
    ctx.stroke()
  }

  ctx.fillStyle = 'rgba(255, 255, 255, 0.8)' // Main Highlight
  ctx.beginPath()
  ctx.arc(150, 100, 14, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)' // Secondary Highlight
  ctx.beginPath()
  ctx.arc(110, 155, 7, 0, Math.PI * 2)
  ctx.fill()

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// --- Shaders ---
const vertexShader = `
  uniform float uTime;
  uniform float uProgress; // Normalized position along the curve (0 to 1)
  uniform float uWiggleSpeed;
  uniform float uWiggleAmplitude;
  uniform float uScaleAmplitude;
  uniform sampler2D uNormalMap; // To displace along normal

  attribute vec3 tubeInfo; // x: segment index, y: progress along segment, z: tube radius scale

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDistortion;

  // Simplex noise function (you can include the full function or use a pre-imported one)
  float snoise(vec3 v); // Assume snoise is available

  vec3 orthogonal(vec3 v) {
    return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0) : vec3(0.0, -v.z, v.y));
  }

  void main() {
    vUv = uv;
    vNormal = normal;

    // --- Body Undulation ---
    float tubeProgress = tubeInfo.y; // Progress along the entire tube length
    float timeOffset = tubeProgress * 20.0 - uTime * uWiggleSpeed;
    float wiggle = sin(timeOffset) * cos(timeOffset * 0.7) * uWiggleAmplitude * (1.0 - tubeProgress * 0.5); // Dampen towards tail

    // --- Breathing/Pulse ---
    float pulse = sin(uTime * 2.0 + tubeProgress * 5.0) * uScaleAmplitude * (1.0 - tubeProgress * 0.7);

    // Calculate displacement direction (binormal)
    vec3 tangent = normalize(vec3(modelMatrix * vec4(normal, 0.0)).xyz); // Approximation
    vec3 bitangent = orthogonal(tangent); // Calculate a vector perpendicular to normal

    // Apply displacement
    vec3 displacedPosition = position + bitangent * wiggle + normal * pulse;

    // --- Apply Noise Distortion based on Normal Map (Subtle Scale Texture) ---
    // Sample normal map based on UV (might need adjustment based on texture mapping)
    // vec3 sampledNormal = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
    // float scaleNoise = snoise(displacedPosition * 10.0 + uTime * 0.5) * 0.005;
    // displacedPosition += normal * scaleNoise; // Displace along surface normal

    vDistortion = wiggle + pulse; // Pass distortion amount to fragment shader

    vec4 mvPosition = modelViewMatrix * vec4(displacedPosition, 1.0);
    vViewPosition = -mvPosition.xyz;
    gl_Position = projectionMatrix * mvPosition;
  }
`
// Include snoise function here if not globally available
const snoiseFunc = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
`

const fragmentShader = `
  uniform sampler2D uAlbedoMap;
  uniform sampler2D uNormalMap;
  uniform sampler2D uRoughnessMap;
  uniform float uTime;
  uniform float uDistortion; // Receive from vertex shader
  uniform vec3 uLightDirection;
  uniform vec3 uCameraPosition;
  uniform float uEnvMapIntensity;
  uniform samplerCube uEnvMap; // Environment Map

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vDistortion;

  // Basic PBR calculation functions (simplified)
  float DistributionGGX(vec3 N, vec3 H, float roughness) {
      float a = roughness * roughness;
      float a2 = a * a;
      float NdotH = max(dot(N, H), 0.0);
      float NdotH2 = NdotH * NdotH;
      float nom = a2;
      float denom = (NdotH2 * (a2 - 1.0) + 1.0);
      denom = PI * denom * denom;
      return nom / max(denom, 0.0001); // Avoid divide by zero
  }

  float GeometrySchlickGGX(float NdotV, float roughness) {
      float r = (roughness + 1.0);
      float k = (r*r) / 8.0;
      float nom = NdotV;
      float denom = NdotV * (1.0 - k) + k;
      return nom / max(denom, 0.0001);
  }

  float GeometrySmith(vec3 N, vec3 V, vec3 L, float roughness) {
      float NdotV = max(dot(N, V), 0.0);
      float NdotL = max(dot(N, L), 0.0);
      float ggx2 = GeometrySchlickGGX(NdotV, roughness);
      float ggx1 = GeometrySchlickGGX(NdotL, roughness);
      return ggx1 * ggx2;
  }

   vec3 fresnelSchlick(float cosTheta, vec3 F0) {
        return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
    }


  void main() {
    vec3 albedo = texture2D(uAlbedoMap, vUv).rgb;
    vec3 normalMap = texture2D(uNormalMap, vUv).rgb * 2.0 - 1.0;
    float roughness = texture2D(uRoughnessMap, vUv).r;
    float metalness = 0.1; // Pythons aren't metallic

    // TBN matrix
    vec3 N = normalize(vNormal);
    vec3 T = normalize(dFdx(vViewPosition)); // Approximated tangent
    vec3 B = normalize(cross(N, T));         // Approximated bitangent
    mat3 TBN = mat3(T, B, N);

    // Apply normal map
    N = normalize(TBN * normalMap);

    // Vectors for lighting
    vec3 V = normalize(uCameraPosition - (-vViewPosition)); // View direction
    vec3 L = normalize(uLightDirection);                    // Light direction
    vec3 H = normalize(V + L);                              // Halfway vector
    vec3 R = reflect(-V, N);                                // Reflection vector

    // Fresnel
    vec3 F0 = vec3(0.04); // Base reflectance for dielectrics
    F0 = mix(F0, albedo, metalness);
    vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);

    // Cook-Torrance BRDF
    float NDF = DistributionGGX(N, H, roughness);
    float G = GeometrySmith(N, V, L, roughness);
    vec3 numerator = NDF * G * F;
    float denominator = 4.0 * max(dot(N, V), 0.0) * max(dot(N, L), 0.0) + 0.0001; // Avoid divide by zero
    vec3 specular = numerator / denominator;

    // Diffuse (Lambertian)
    float NdotL = max(dot(N, L), 0.0);
    vec3 kD = (1.0 - F) * (1.0 - metalness); // Energy conservation
    vec3 diffuse = kD * albedo / PI;

    // --- Ambient / Environment Light ---
    // Sample environment map based on reflection vector
    vec3 envColor = textureCube(uEnvMap, R).rgb * uEnvMapIntensity;
    vec3 ambient = envColor * albedo * 0.5; // Simple ambient contribution

    // Combine lighting
    vec3 Lo = (diffuse + specular) * NdotL * vec3(1.0); // Assume light color is white
    vec3 color = Lo + ambient;

    // --- Add Subtle Distortion Color Tint ---
    float distAmount = abs(vDistortion) * 15.0; // Amplify distortion effect
    color = mix(color, vec3(0.8, 0.6, 0.4), smoothstep(0.1, 0.5, distAmount) * 0.1); // Warm tint on stretch/compress

    // Gamma Correction (Approximate)
    color = pow(color, vec3(1.0/2.2));

    gl_FragColor = vec4(color, 1.0);
  }
`

// --- React Component ---
const SnakeLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const state = useRef({
    isHovered: false,
    isClicked: false,
    mouse: new THREE.Vector2(0.5, 0.5),
    targetMouse: new THREE.Vector2(0.5, 0.5),
    progress: Math.random(),
    scene: new THREE.Scene(),
    camera: new THREE.PerspectiveCamera(50, 1, 0.1, 100),
    renderer: null as THREE.WebGLRenderer | null,
    snakeTube: null as THREE.Mesh | null,
    snakeHead: null as THREE.Group | null,
    leftEye: null as THREE.Mesh | null,
    rightEye: null as THREE.Mesh | null,
    curve: null as THREE.CatmullRomCurve3 | null,
    animationFrameId: null as number | null,
    shaderMaterial: null as THREE.ShaderMaterial | null,
    headMaterial: null as THREE.MeshStandardMaterial | null,
    eyeMaterial: null as THREE.MeshStandardMaterial | null,
    envMap: null as THREE.CubeTexture | null,
    directionalLight: new THREE.DirectionalLight(0xfff0e5, 1.5),
    ambientLight: new THREE.AmbientLight(0x667799, 0.6),
    rimLight: new THREE.DirectionalLight(0x88aaff, 0.4), // Cooler rim light
  }).current

  const navigate = useNavigate()

  const jsPoints = useMemo(
    () => [
      new THREE.Vector3(0.8, 2.1, 0.0),
      new THREE.Vector3(1.1, 2.3, 0.1),
      new THREE.Vector3(1.3, 2.1, 0.0),
      new THREE.Vector3(1.4, 1.5, -0.1),
      new THREE.Vector3(1.4, 0.5, 0.0),
      new THREE.Vector3(1.35, -0.5, 0.1),
      new THREE.Vector3(1.1, -1.0, 0.0),
      new THREE.Vector3(0.7, -1.2, -0.1),
      new THREE.Vector3(0.2, -1.1, 0.0),
      new THREE.Vector3(-0.1, -0.8, 0.1),
      new THREE.Vector3(-0.4, -0.5, 0.0),
      new THREE.Vector3(-0.8, -0.7, -0.1),
      new THREE.Vector3(-1.1, -0.9, 0.0),
      new THREE.Vector3(-1.4, -0.6, 0.1),
      new THREE.Vector3(-1.5, -0.2, 0.0),
      new THREE.Vector3(-1.2, 0.4, -0.1),
      new THREE.Vector3(-0.7, 0.9, 0.0),
      new THREE.Vector3(-0.3, 1.2, 0.1),
      new THREE.Vector3(0.2, 1.4, 0.0),
      new THREE.Vector3(0.6, 1.5, -0.1),
      new THREE.Vector3(0.9, 1.4, 0.0),
      new THREE.Vector3(1.1, 1.2, 0.1),
      new THREE.Vector3(1.2, 1.0, 0.0),
    ],
    [],
  )

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || state.renderer) return

    state.camera.position.set(0, 0.2, 4.8)
    state.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })
    state.renderer.setSize(64, 64)
    state.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    state.renderer.outputColorSpace = THREE.SRGBColorSpace // Correct color space

    // --- Environment Map ---
    const envMapLoader = new THREE.CubeTextureLoader()
    // Replace with paths to your small cube map images (or use a default one)
    // Small blurred images are fine for reflections
    state.envMap = envMapLoader.load([
      'px.png',
      'nx.png',
      'py.png',
      'ny.png',
      'pz.png',
      'nz.png', // Example paths
    ])
    state.envMap.colorSpace = THREE.SRGBColorSpace
    state.scene.environment = state.envMap

    // --- Materials ---
    const { albedoTexture, normalTexture, roughnessTexture } = createProceduralPythonMaps()
    const headEyeTexture = createSnakeEyeTexture()

    state.shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: state.progress },
        uWiggleSpeed: { value: 4.0 },
        uWiggleAmplitude: { value: 0.04 },
        uScaleAmplitude: { value: 0.015 },
        uAlbedoMap: { value: albedoTexture },
        uNormalMap: { value: normalTexture },
        uRoughnessMap: { value: roughnessTexture },
        uLightDirection: { value: state.directionalLight.position.clone().normalize() },
        uCameraPosition: { value: state.camera.position },
        uEnvMap: { value: state.envMap },
        uEnvMapIntensity: { value: 0.6 },
      },
      vertexShader: snoiseFunc + vertexShader, // Prepend noise function
      fragmentShader: fragmentShader,
      defines: {
        PI: Math.PI.toFixed(5), // Pass PI to shader
      },
    })

    state.headMaterial = new THREE.MeshStandardMaterial({
      map: createProceduralPythonMaps(
        512,
        512,
        new THREE.Color('#4A3D2E'),
        new THREE.Color('#B09050'),
        new THREE.Color('#E0C070'),
        new THREE.Color('#2A1A0A'),
        0.1,
        0.01,
      ).albedoTexture,
      normalMap: createProceduralPythonMaps(512, 512).normalTexture, // Reuse normal gen
      roughnessMap: createProceduralPythonMaps(512, 512).roughnessTexture, // Reuse roughness gen
      roughness: 0.6,
      metalness: 0.15,
      envMap: state.envMap,
      envMapIntensity: 0.7,
    })
    state.eyeMaterial = new THREE.MeshStandardMaterial({
      map: headEyeTexture,
      roughness: 0.05,
      metalness: 0.1,
      envMap: state.envMap,
      envMapIntensity: 1.0,
      emissive: new THREE.Color(0x111111),
      emissiveIntensity: 0.4,
      transparent: true, // Allows slight alpha in texture if needed
      depthWrite: false, // Helps with rendering on top
    })

    // --- Geometry ---
    state.curve = new THREE.CatmullRomCurve3(jsPoints, true, 'catmullrom', 0.6)
    const tubeSegments = 150
    const tubeRadius = 0.16
    const radialSegments = 16
    const tubeGeometry = new THREE.TubeGeometry(state.curve, tubeSegments, tubeRadius, radialSegments, true)

    // Add tubeInfo attribute for shader
    const numVertices = tubeGeometry.attributes.position.count
    const tubeInfo = new Float32Array(numVertices * 3)
    const uv = tubeGeometry.attributes.uv.array
    for (let i = 0; i < numVertices; i++) {
      tubeInfo[i * 3] = Math.floor(uv[i * 2] * tubeSegments) // Segment index
      tubeInfo[i * 3 + 1] = uv[i * 2] // Progress along tube (UV.x)
      tubeInfo[i * 3 + 2] = 1.0 // Radius scale (can be modulated later)
    }
    tubeGeometry.setAttribute('tubeInfo', new THREE.BufferAttribute(tubeInfo, 3))

    state.snakeTube = new THREE.Mesh(tubeGeometry, state.shaderMaterial)
    state.scene.add(state.snakeTube)

    // --- Head ---
    state.snakeHead = new THREE.Group()
    const headGeometry = new THREE.SphereGeometry(0.22, 24, 20) // Slightly larger, more detail
    // Taper the head slightly
    const posAttr = headGeometry.attributes.position
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      const z = posAttr.getZ(i)
      if (x > 0) {
        // Front of head
        posAttr.setX(i, x * (1.0 + x * 0.2)) // Make snout slightly pointier
        posAttr.setY(i, y * (1.0 - x * 0.1)) // Flatten top/bottom slightly
        posAttr.setZ(i, z * (1.0 - x * 0.1))
      } else {
        // Back of head
        posAttr.setX(i, x * (1.0 + x * 0.1)) // Bulge back slightly
      }
    }
    headGeometry.computeVertexNormals()

    const headMesh = new THREE.Mesh(headGeometry, state.headMaterial)
    state.snakeHead.add(headMesh)

    const eyeSize = 0.06
    const eyeGeometry = new THREE.SphereGeometry(eyeSize, 12, 12)
    state.leftEye = new THREE.Mesh(eyeGeometry, state.eyeMaterial)
    state.leftEye.position.set(0.12, 0.08, 0.17) // Position adjusted for new head shape
    state.snakeHead.add(state.leftEye)
    state.rightEye = new THREE.Mesh(eyeGeometry, state.eyeMaterial)
    state.rightEye.position.set(0.12, 0.08, -0.17)
    state.snakeHead.add(state.rightEye)
    state.scene.add(state.snakeHead)

    // --- Lighting ---
    state.scene.add(state.ambientLight)
    state.scene.add(state.directionalLight)
    state.directionalLight.position.set(2, 3, 4)
    state.directionalLight.lookAt(state.scene.position)
    state.scene.add(state.rimLight)
    state.rimLight.position.set(-1, -0.5, -2)
    state.rimLight.lookAt(state.scene.position)

    // --- Animation Loop ---
    const clock = new THREE.Clock()
    let targetLookAt = new THREE.Vector3()
    let currentHeadOffset = new THREE.Quaternion()
    let targetHeadOffset = new THREE.Quaternion()
    let headWanderTime = 0

    const animate = () => {
      state.animationFrameId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const time = clock.getElapsedTime()

      // Update progress
      const baseSpeed = 0.09
      const hoverSpeedMultiplier = state.isHovered ? 0.4 : 1.0
      const clickSpeedMultiplier = state.isClicked ? 0.1 : 1.0 // Slow down significantly on click hold
      state.progress = (state.progress + delta * baseSpeed * hoverSpeedMultiplier * clickSpeedMultiplier) % 1

      // Update shader uniforms
      if (state.shaderMaterial) {
        state.shaderMaterial.uniforms.uTime.value = time
        state.shaderMaterial.uniforms.uProgress.value = state.progress
        state.shaderMaterial.uniforms.uCameraPosition.value.copy(state.camera.position)
        state.shaderMaterial.uniforms.uLightDirection.value.copy(state.directionalLight.position).normalize()

        if (state.shaderMaterial.uniforms.uAlbedoMap.value?.map) {
          state.shaderMaterial.uniforms.uAlbedoMap.value.offset.x = -state.progress * 8 // Adjust texture scroll speed
        }
      }

      if (state.curve && state.snakeHead) {
        const headPos = state.curve.getPointAt(state.progress)
        const lookAtPos = state.curve.getPointAt((state.progress + 0.01) % 1) // Point slightly ahead

        // --- Head Orientation ---
        // Base orientation following the curve
        const baseTarget = new THREE.Object3D()
        baseTarget.position.copy(headPos)
        baseTarget.lookAt(lookAtPos)
        const baseQuaternion = baseTarget.quaternion

        // --- Head Wandering ---
        headWanderTime += delta
        if (headWanderTime > 2 + Math.random() * 3) {
          // Change target wander every 2-5 seconds
          headWanderTime = 0
          const wanderAngleX = (Math.random() - 0.5) * 0.3 // Small random angle
          const wanderAngleY = (Math.random() - 0.5) * 0.4
          targetHeadOffset.setFromEuler(new THREE.Euler(wanderAngleX, wanderAngleY, 0, 'XYZ'))
        }
        // Smoothly interpolate current offset towards target offset
        currentHeadOffset.slerp(targetHeadOffset, delta * 0.5)

        // Combine base orientation with wander offset
        const finalQuaternion = baseQuaternion.multiply(currentHeadOffset)

        // Apply final position and orientation smoothly
        state.snakeHead.position.lerp(headPos, 0.5) // Smoother position update
        state.snakeHead.quaternion.slerp(finalQuaternion, 0.3) // Smoother rotation update

        // --- Eye Tracking (on hover) ---
        if (state.isHovered && state.leftEye && state.rightEye) {
          state.mouse.lerp(state.targetMouse, 0.08)
          const rect = containerRef.current?.getBoundingClientRect()
          if (rect) {
            const vec = new THREE.Vector3(state.mouse.x * 2 - 1, -(state.mouse.y * 2 - 1), 0.5)
            vec.unproject(state.camera)
            const dir = vec.sub(state.camera.position).normalize()
            const distance = -state.camera.position.z / dir.z // Approx distance to z=0 plane
            const pos = state.camera.position.clone().add(dir.multiplyScalar(distance * 1.5)) // Look slightly past cursor
            targetLookAt.lerp(pos, 0.15)
          }

          const headInverse = new THREE.Matrix4().copy(state.snakeHead.matrixWorld).invert()
          const localLookAt = targetLookAt.clone().applyMatrix4(headInverse)
          localLookAt.z = Math.max(localLookAt.z, 0.1) // Prevent looking backwards

          // Add slight delay/overshoot to eye movement
          const targetEyeQuaternionL = new THREE.Quaternion().setFromRotationMatrix(
            new THREE.Matrix4().lookAt(state.leftEye.position, localLookAt, state.leftEye.up),
          )
          const targetEyeQuaternionR = new THREE.Quaternion().setFromRotationMatrix(
            new THREE.Matrix4().lookAt(state.rightEye.position, localLookAt, state.rightEye.up),
          )
          state.leftEye.quaternion.slerp(targetEyeQuaternionL, delta * 8.0)
          state.rightEye.quaternion.slerp(targetEyeQuaternionR, delta * 8.0)

          // Zoom camera slightly
          gsap.to(state.camera.position, { z: 4.2, duration: 0.8, ease: 'power2.out' })
          gsap.to(state.shaderMaterial.uniforms.uWiggleAmplitude, { value: 0.02, duration: 0.5 }) // Calm down wiggle
        } else {
          // Return eyes to default forward look smoothly
          const defaultLook = new THREE.Quaternion() // Identity quaternion looks forward in local space
          state.leftEye?.quaternion.slerp(defaultLook, delta * 5.0)
          state.rightEye?.quaternion.slerp(defaultLook, delta * 5.0)

          // Return camera
          gsap.to(state.camera.position, { z: 4.8, duration: 0.8, ease: 'power2.out' })
          gsap.to(state.shaderMaterial?.uniforms.uWiggleAmplitude, { value: 0.04, duration: 0.5 }) // Restore wiggle
        }
      }

      state.renderer?.render(state.scene, state.camera)
    }

    // --- Event Handlers ---
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      state.targetMouse.x = (event.clientX - rect.left) / rect.width
      state.targetMouse.y = (event.clientY - rect.top) / rect.height
    }
    const handleMouseEnter = () => (state.isHovered = true)
    const handleMouseLeave = () => {
      state.isHovered = false
      state.targetMouse.set(0.5, 0.5)
    } // Reset target mouse on leave
    const handleClick = () => {
      if (state.isClicked) return
      state.isClicked = true

      // Quick head shake/nod animation
      gsap.to(state.snakeHead!.rotation, {
        x: state.snakeHead!.rotation.x + 0.3,
        y: state.snakeHead!.rotation.y - 0.2,
        duration: 0.15,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      })

      // Pulse scale slightly
      gsap.to(state.snakeHead!.scale, {
        x: 1.1,
        y: 1.1,
        z: 1.1,
        duration: 0.1,
        ease: 'power1.out',
        yoyo: true,
        repeat: 1,
      })

      // After a delay, navigate
      gsap.delayedCall(0.4, () => {
        state.isClicked = false
        navigate('/')
      })
    }

    const container = containerRef.current
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('click', handleClick)

    animate()

    // --- Cleanup ---
    return () => {
      if (state.animationFrameId) cancelAnimationFrame(state.animationFrameId)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('click', handleClick)

      // Dispose textures, materials, geometries
      state.scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose()
          const materials = Array.isArray(object.material) ? object.material : [object.material]
          materials.forEach(material => {
            if (material) {
              Object.values(material).forEach((value: any) => {
                if (value instanceof THREE.Texture) {
                  value.dispose()
                }
              })
              material.dispose()
            }
          })
        }
      })
      state.envMap?.dispose()
      state.renderer?.dispose()
      state.renderer = null
      console.log('SnakeLogo cleaned up')
    }
  }, [navigate, state, jsPoints]) // jsPoints included as it's memoized

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-16 h-16 overflow-hidden rounded-full shadow-xl cursor-pointer bg-gradient-to-br from-slate-950 via-slate-900 to-black"
      style={{ WebkitMaskImage: 'radial-gradient(circle, white 100%, transparent 100%)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle interactive glow - more refined */}
      <motion.div
        className="absolute inset-[-5px] border border-yellow-600/0 rounded-full blur-[2px]"
        animate={{
          borderColor: state.isHovered
            ? ['rgba(234, 179, 8, 0)', 'rgba(234, 179, 8, 0.6)', 'rgba(234, 179, 8, 0)']
            : 'rgba(234, 179, 8, 0)',
          scale: state.isHovered ? 1.1 : 1,
          opacity: state.isHovered ? [0, 1, 0] : 0,
        }}
        transition={{ duration: 1.8, repeat: state.isHovered ? Infinity : 0, ease: 'linear', delay: 0.2 }}
        style={{ pointerEvents: 'none' }}
      />
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 bg-gradient-radial from-yellow-800/15 via-yellow-900/5 to-transparent blur-md"
        animate={{ opacity: state.isHovered ? 1 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}

export default SnakeLogo
