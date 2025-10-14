import { motion } from 'framer-motion';
import ColorShiftText from './effects/ColorShiftText.jsx';

const galleryImages = [
  'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80&sat=-100',
  'https://images.unsplash.com/photo-1520256862855-398228c41684?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1518895949257-7621c3c786d4?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1505739671374-bd06c2f93770?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=900&q=80',
];

const Gallery = () => (
  <section id="gallery" className="relative bg-[#05060c] py-24">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute left-10 top-0 h-48 w-48 rounded-full bg-neon-pink/15 blur-3xl" />
      <span className="absolute bottom-8 right-6 h-40 w-40 rounded-full bg-electric-blue/15 blur-3xl" />
    </div>
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-headline text-4xl text-white sm:text-5xl">
            <ColorShiftText>Neon Memory Vault</ColorShiftText>
          </h2>
          <p className="mt-4 max-w-2xl text-white/70">Snapshots from previous chaos editions & concept art for what’s brewing in 2025.</p>
        </div>
        <motion.a
          href="https://www.instagram.com/explore/tags/Madooza2025/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-neon-pink hover:text-neon-pink"
          whileHover={{ scale: 1.05 }}
        >
          Follow #Madooza2025
        </motion.a>
      </div>

      <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3">
        {galleryImages.map((src, index) => (
          <motion.div
            key={src}
            className="relative mb-6 overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-neon"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: index * 0.04 }}
          >
            <motion.img
              src={src}
              alt="Madooza gallery"
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
            />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10 bg-black/60 opacity-0 transition hover:opacity-100" />
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-center text-sm uppercase tracking-[0.4em] text-white/60">Tag your chaos — <span className="text-neon-pink">#Madooza2025</span></p>
    </div>
  </section>
);

export default Gallery;
