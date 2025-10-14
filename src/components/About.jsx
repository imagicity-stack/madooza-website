import { motion } from 'framer-motion';

const About = () => (
  <section id="about" className="relative z-10 border-t border-white/10 bg-black/70 py-24">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -top-10 right-10 h-40 w-40 rounded-full bg-electric-blue/20 blur-3xl" />
      <span className="absolute bottom-0 left-6 h-52 w-52 rounded-full bg-neon-pink/20 blur-3xl" />
    </div>

    <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
      <motion.div
        className="flex-1 space-y-8"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-headline text-3xl text-white sm:text-5xl">
          A festival by <span className="text-neon-pink">IMAGICITY</span> for Mount Litera, Hazaribagh — where
          <span className="text-electric-blue"> art</span>, <span className="text-cyber-lime">anime</span>, and youth culture collide.
        </h2>
        <p className="text-lg text-white/70">
          Inspired by glitch art and cyberpunk metropolises, Madooza brings immersive installations, cult screenings,
          and chaotic collabs to life. Expect neon bazaars, VR realms, digital graffiti, and culinary mashups that light up the night.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {[{ title: 'Immersive Worlds', body: 'XR domes, projection mapping, and VR fan verses.' }, { title: 'Creator Labs', body: 'Workshops, zine stations, and motion-capture dance-offs.' }, { title: 'Community Pulse', body: 'Local artists, student collectives, and pop-up fandom galleries.' }, { title: 'Energy', body: 'Electric beats, hyperpop DJs, and synthwave sunsets.' }].map((item) => (
            <motion.div
              key={item.title}
              className="glass-panel border border-white/10 p-6"
              whileHover={{ translateY: -10 }}
            >
              <h3 className="font-headline text-xl text-electric-blue">{item.title}</h3>
              <p className="mt-2 text-sm text-white/70">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="relative flex-1"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <motion.div
          className="relative mx-auto aspect-square w-full max-w-md rounded-[40px] border border-white/20 bg-black/80 p-10 shadow-neon"
          animate={{ rotateX: [0, 8, -6, 0], rotateY: [0, -12, 10, 0], rotateZ: [0, 2, -2, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div
            className="absolute inset-5 rounded-[32px] border border-white/10 opacity-60"
            style={{ boxShadow: '0 0 50px rgba(255, 0, 230, 0.18)', backgroundColor: 'rgba(0, 255, 255, 0.08)' }}
          />
          <div className="relative flex h-full flex-col justify-between">
            <motion.div
              className="rounded-3xl border border-white/20 bg-white/10 p-6 text-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <h3 className="font-headline text-2xl text-neon-pink">Chaos Capsule</h3>
              <p className="mt-2 text-sm text-white/70">Interactive holograms, AR murals, and glitch-echo tunnels.</p>
            </motion.div>

            <motion.div
              className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            >
              <h3 className="font-headline text-xl text-electric-blue">Creator Orbit</h3>
              <p className="mt-2 text-sm text-white/60">Meetups for illustrators, beatmakers, streamers, and storytellers.</p>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default About;
