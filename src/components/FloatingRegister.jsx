import { motion } from 'framer-motion';

const FloatingRegister = () => (
  <motion.a
    href="#tickets"
    className="fixed right-6 top-1/2 z-[80] hidden -translate-y-1/2 rotate-90 transform overflow-hidden rounded-full border border-white/30 bg-white/5 px-6 py-2 font-semibold uppercase tracking-[0.4em] text-[10px] text-white shadow-neon hover:bg-white/15 lg:block"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    Register Now
  </motion.a>
);

export default FloatingRegister;
