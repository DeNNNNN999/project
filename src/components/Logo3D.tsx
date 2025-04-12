import React from 'react';
import { motion } from 'motion/react';

// Этот компонент остается для обратной совместимости, но используется новая анимированная версия в TopNav
const Logo3D = () => {
  return (
    <motion.div
      className="relative w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center overflow-hidden"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-white font-bold text-2xl">P</span>
    </motion.div>
  );
};

export default Logo3D;
