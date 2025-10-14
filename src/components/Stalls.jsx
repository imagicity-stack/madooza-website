import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ColorShiftText from './effects/ColorShiftText.jsx';
import NeonSparkles from './effects/NeonSparkles.jsx';

const stalls = [
  {
    title: 'Neon Merch Labs',
    features: ['Custom art drops', 'Augmented reality posters', 'Holographic sticker packs'],
    accent: '#FF00E6',
  },
  {
    title: 'Food Reactor',
    features: ['Glow bubble tea', 'Cyber ramen stalls', 'Molecular candy bar'],
    accent: '#00FFFF',
  },
  {
    title: 'Indie Artist Alley',
    features: ['Live commissions', 'Chill-out sketch lounge', 'Instant NFT minting booth'],
    accent: '#D0FF00',
  },
  {
    title: 'Gaming Spire',
    features: ['LAN tournaments', 'Retro arcade glitchcade', 'VR showdown pods'],
    accent: '#FF00E6',
  },
];

const tiers = [
  {
    name: 'Silver',
    price: '₹25,000',
    perks: ['Logo on digital banners', '2 complimentary VIP passes', 'Spotlight in social media blast'],
  },
  {
    name: 'Gold',
    price: '₹50,000',
    perks: ['Stage shout-outs', 'Dedicated interactive booth', 'Branded AR filter experience'],
  },
  {
    name: 'Platinum',
    price: '₹1,00,000',
    perks: ['Prime stage backdrop', 'Custom activation with IMAGICITY', 'Post-event aftermovie feature'],
  },
];

const SponsorModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 px-6 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="glass-panel w-full max-w-2xl border-white/20 p-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-headline text-3xl text-electric-blue">Become a Sponsor</h3>
              <p className="mt-2 text-white/70">Drop your details — our partnership squad will reach out with custom activations.</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/20 px-4 py-1 text-sm text-white/70 transition hover:border-neon-pink hover:text-neon-pink"
            >
              Close
            </button>
          </div>

          <form className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Brand Name</label>
              <input className="glow-input" placeholder="Your neon collective" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Contact Email</label>
              <input className="glow-input" type="email" placeholder="hello@madooza.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">Activation Idea</label>
              <textarea className="glow-input min-h-[140px]" placeholder="Tell us how you want to ignite the fest" />
            </div>
            <motion.button
              type="button"
              className="glow-button md:col-span-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              Submit Interest
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Stalls = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="tickets" className="relative border-b border-white/10 bg-black/70 py-24">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <span className="absolute -bottom-10 left-0 h-52 w-52 rounded-full bg-cyber-lime/20 blur-3xl" />
        <span className="absolute -top-16 right-16 h-48 w-48 rounded-full bg-electric-blue/20 blur-3xl" />
      </div>
      <NeonSparkles className="absolute inset-0 -z-10" count={18} />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="font-headline text-4xl text-white sm:text-5xl">
              <ColorShiftText>Stalls &amp; Sponsorships</ColorShiftText>
            </h2>
            <p className="mt-4 max-w-2xl text-white/70">
              Plug into the festival grid with immersive stalls or sponsor tiers designed for brands who dare to glow.
            </p>
          </div>
          <motion.button
            type="button"
            className="glow-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
          >
            Become a Sponsor
          </motion.button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stalls.map((stall) => (
            <motion.div
              key={stall.title}
              className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{ backgroundColor: `${stall.accent}26` }}
              />
              <div className="relative z-10 space-y-4">
                <h3 className="font-headline text-2xl text-white">{stall.title}</h3>
                <ul className="space-y-2 text-sm text-white/70">
                  {stall.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyber-lime" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="glass-panel border border-white/10 p-10">
          <h3 className="font-headline text-2xl text-neon-pink">
            <ColorShiftText className="text-2xl">Sponsorship Tiers</ColorShiftText>
          </h3>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div key={tier.name} className="rounded-[28px] border border-white/10 bg-black/60 p-6">
                <div className="flex items-baseline justify-between">
                  <p className="font-headline text-xl text-electric-blue">{tier.name}</p>
                  <p className="font-headline text-2xl text-cyber-lime">{tier.price}</p>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  {tier.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-neon-pink" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <SponsorModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </section>
  );
};

export default Stalls;
