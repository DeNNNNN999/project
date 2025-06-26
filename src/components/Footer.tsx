import { motion } from 'motion/react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-gray-400">
            © {currentYear}{' '}
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-purple-500 to-violet-600">
              DeNNNNN999
            </span>
            {' '}• Все права защищены
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;