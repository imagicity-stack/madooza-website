import { motion } from 'framer-motion';
import { FaInstagram, FaYoutube, FaThreads } from 'react-icons/fa6';

const Footer = () => (
  <footer className="relative overflow-hidden border-t border-white/10 bg-[#040409] py-20">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,230,0.12),transparent_60%)]" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

    <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:justify-between">
      <div className="space-y-6 lg:max-w-sm">
        <div className="flex items-center gap-4">
          <img src="/neon-logo.svg" alt="Madooza" className="h-14 w-14" />
          <div>
            <p className="font-headline text-2xl text-white">Madooza</p>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Powered by IMAGICITY — The Creative Engine</p>
          </div>
        </div>
        <p className="text-sm text-white/70">
          A futuristic creative fest built for the dreamers, disruptors, and neon souls of Hazaribagh. Plug in, power up, and ride the chaos.
        </p>
        <div className="flex gap-4">
          {[
            { icon: <FaInstagram />, href: 'https://www.instagram.com/imagicity/' },
            { icon: <FaYoutube />, href: 'https://www.youtube.com/' },
            { icon: <FaThreads />, href: 'https://www.threads.net/' },
          ].map((social) => (
            <motion.a
              key={social.href}
              href={social.href}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white/80 transition hover:border-neon-pink hover:text-neon-pink"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <motion.form
        className="glass-panel relative flex-1 border-white/10 p-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="font-headline text-2xl text-electric-blue">Glow with us</h3>
        <p className="mt-2 text-sm text-white/70">Drop a line for collaborations, stall setups, or backstage access.</p>
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Name</label>
            <input className="glow-input" placeholder="You, the disruptor" />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Email</label>
            <input className="glow-input" type="email" placeholder="vibes@madooza.com" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">Message</label>
            <textarea className="glow-input min-h-[120px]" placeholder="Tell us your idea" />
          </div>
        </div>
        <motion.button type="button" className="mt-8 glow-button" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          Send Transmission
        </motion.button>
      </motion.form>
    </div>

    <p className="mt-16 text-center text-xs uppercase tracking-[0.4em] text-white/50">© {new Date().getFullYear()} IMAGICITY. All rights reserved.</p>
  </footer>
);

export default Footer;
