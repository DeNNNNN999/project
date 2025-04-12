import React, { useEffect, useState } from 'react';

interface WatermarkProps {
  text?: string;
  opacity?: number;
}

const Watermark: React.FC<WatermarkProps> = ({ 
  text = 'Портфолио Защищено', 
  opacity = 0.12 
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Запрет скриншотов в полноэкранном режиме (работает только в некоторых браузерах)
    const preventCapture = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(err => {
          console.error(`Ошибка при выходе из полноэкранного режима: ${err.message}`);
        });
      }
    };
    
    document.addEventListener('fullscreenchange', preventCapture);
    
    return () => {
      document.removeEventListener('fullscreenchange', preventCapture);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-50 select-none overflow-hidden"
      style={{ 
        opacity,
        backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='150'%3E%3Ctext x='0' y='120' transform='rotate(-30)' fill='rgba(150,150,150,0.5)' font-size='15'%3E${text}%3C/text%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat'
      }}
    />
  );
};

export default Watermark;
