import { motion } from 'framer-motion';
import { RiTeamFill, RiBrushFill, RiRestaurant2Fill } from 'react-icons/ri';
import { GiBallerinaShoes, GiMicrophone } from 'react-icons/gi';

const events = [
  {
    title: 'Cosplay Multiverse',
    icon: <RiTeamFill className="h-10 w-10" />,
    tagline: 'Suit up, glitch out, and own the neon catwalk.',
    color: 'from-[#FF00E6]/40 to-transparent',
  },
  {
    title: 'Dance Battle Nexus',
    icon: <GiBallerinaShoes className="h-10 w-10" />,
    tagline: 'Crew vs crew, sync vs chaos — amplified beats only.',
    color: 'from-[#00FFFF]/40 to-transparent',
  },
  {
    title: 'Art Arena',
    icon: <RiBrushFill className="h-10 w-10" />,
    tagline: 'Graffiti drones, live murals, and pixel-spray throwdowns.',
    color: 'from-[#D0FF00]/40 to-transparent',
  },
  {
    title: 'Food & Fun Street',
    icon: <RiRestaurant2Fill className="h-10 w-10" />,
    tagline: 'Cyber snacks, bubble tea chemistry, and midnight ramen.',
    color: 'from-[#FF00E6]/40 to-transparent',
  },
  {
    title: 'Creator Workshops',
    icon: <GiMicrophone className="h-10 w-10" />,
    tagline: 'Storyboarding, beat labs, cosplay craft, and streaming hacks.',
    color: 'from-[#00FFFF]/40 to-transparent',
  },
];

const Events = () => (
  <section id="events" className="relative border-y border-white/10 bg-[#06060a] py-24">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,0,230,0.18),transparent_60%)]" />
    <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-headline text-4xl text-white sm:text-5xl">Event Hyperdrive</h2>
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
            <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${event.color} opacity-40`} />
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
