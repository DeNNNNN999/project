import { useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import gsap from 'gsap';

interface ProjectCardProps {
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: string;
  demoUrl?: string;
}

const ProjectCard = ({ title, description, features, technologies, icon, demoUrl }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // 3D Transform эффект при наведении
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = -(y - centerY) / 20;
      const rotateY = (x - centerX) / 20;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 1000,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="relative backdrop-blur-sm will-change-transform cursor-pointer rounded-xl overflow-hidden"
      style={{ 
        transformStyle: 'preserve-3d',
        background: 'linear-gradient(165deg, rgba(30,30,50,0.9) 0%, rgba(56,30,150,0.7) 100%)',
        boxShadow: '0 0 20px rgba(67,24,255,0.1)'
      }}
    >
      {/* Внутренний градиентный эффект */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-violet-500/5 to-transparent pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[rgba(67,24,255,0.2)] p-2 rounded-lg backdrop-blur-md">
            <Icon icon={icon} className="text-3xl text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-300 mb-4">{description}</p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-300">
              <Icon icon="ph:check-circle" className="text-emerald-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-[rgba(67,24,255,0.15)] rounded-full text-sm text-blue-300 backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 bg-[rgba(67,24,255,0.2)] 
                     px-4 py-2 rounded-full transition-all duration-300 backdrop-blur-sm
                     hover:bg-[rgba(67,24,255,0.3)]"
          >
            <span>Открыть демо</span>
            <Icon 
              icon="ph:arrow-right" 
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        )}
      </div>

      {/* Subtle border */}
      <div className="absolute inset-px rounded-xl pointer-events-none bg-gradient-to-b from-white/5 to-transparent" />
    </div>
  );
};

export default ProjectCard;