import { motion } from 'framer-motion';
import { RiTeamFill, RiBrushFill, RiRestaurant2Fill } from 'react-icons/ri';
import { GiBallerinaShoes, GiMicrophone } from 'react-icons/gi';
import ColorShiftText from './effects/ColorShiftText.jsx';
import NeonSparkles from './effects/NeonSparkles.jsx';

const events = [
  {
    title: 'Cosplay Multiverse',
    icon: <RiTeamFill className="h-10 w-10" />,
    tagline: 'Suit up, glitch out, and own the neon catwalk.',
    accent: '#FF00E6',
  },
  {
    title: 'Dance Battle Nexus',
    icon: <GiBallerinaShoes className="h-10 w-10" />,
    tagline: 'Crew vs crew, sync vs chaos — amplified beats only.',
    accent: '#00FFFF',
  },
  {
    title: 'Art Arena',
    icon: <RiBrushFill className="h-10 w-10" />,
    tagline: 'Graffiti drones, live murals, and pixel-spray throwdowns.',
    accent: '#D0FF00',
  },
  {
    title: 'Food & Fun Street',
    icon: <RiRestaurant2Fill className="h-10 w-10" />,
    tagline: 'Cyber snacks, bubble tea chemistry, and midnight ramen.',
    accent: '#FF00E6',
  },
  {
    title: 'Creator Workshops',
    icon: <GiMicrophone className="h-10 w-10" />,
    tagline: 'Storyboarding, beat labs, cosplay craft, and streaming hacks.',
    accent: '#00FFFF',
  },
];

const Events = () => (
  <section id="events" className="relative border-y border-white/10 bg-[#06060a] py-24">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -top-12 left-10 h-44 w-44 rounded-full bg-neon-pink/15 blur-3xl" />
      <span className="absolute bottom-6 right-8 h-52 w-52 rounded-full bg-cyber-lime/20 blur-3xl" />
    </div>
    <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6">
      <NeonSparkles className="absolute inset-0 -z-10" count={20} />
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-headline text-4xl text-white sm:text-5xl">
          <ColorShiftText>Event Hyperdrive</ColorShiftText>
        </h2>
        <p className="max-w-xl text-white/70">Neon decks of competitions, collabs, and curated chaos. Scroll sideways to preview the madness.</p>
      </div>

      <div className="no-scrollbar -mx-6 flex gap-6 overflow-x-auto px-6 pb-4">
        {events.map((event, index) => (
          <motion.div
            key={event.title}
            className="card-hover relative min-w-[280px] max-w-sm flex-1 rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur-xl"
            style={{ boxShadow: '0 0 30px rgba(255, 0, 230, 0.12)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            whileHover={{ y: -12 }}
          >
            <div
              className="absolute inset-0 rounded-[32px] opacity-30"
              style={{ backgroundColor: `${event.accent}26` }}
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-6">
              <div className="flex items-center gap-4 text-cyber-lime">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/60 text-neon-pink shadow-neon">
                  {event.icon}
                </div>
                <h3 className="font-headline text-2xl text-white">{event.title}</h3>
              </div>
              <p className="text-sm text-white/70">{event.tagline}</p>
              <motion.a
                href="#tickets"
                className="mt-auto inline-flex w-fit items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-cyber-lime hover:text-cyber-lime"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
                <span className="h-2 w-2 rounded-full bg-cyber-lime" />
              </motion.a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Events;
