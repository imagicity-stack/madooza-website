import { motion } from 'framer-motion';

const palette = ['#FF00E6', '#00FFFF', '#D0FF00'];

// Inspired by Reactbits' color cycling text ideas.
const ColorShiftText = ({ children, className = '' }) => (
  <motion.span
    className={`inline-block font-headline ${className}`}
    animate={{ color: [...palette, palette[0]] }}
    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    style={{ textShadow: '0 0 18px rgba(255, 0, 230, 0.35)' }}
  >
    {children}
  </motion.span>
);

export default ColorShiftText;
