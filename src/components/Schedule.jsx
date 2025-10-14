import { motion } from 'framer-motion';
import ColorShiftText from './effects/ColorShiftText.jsx';

const highlights = [
  {
    day: 'Day 1 — Feb 15',
    segments: [
      { time: '10:00', title: 'Opening Portal', detail: 'Neon parade and glitch-mapped stage reveal.' },
      { time: '13:00', title: 'Cosplay Multiverse', detail: 'Catwalk with motion-tracked VFX overlays.' },
      { time: '18:00', title: 'Synthwave Sundowner', detail: 'Live DJs, ambient drones, and holographic sky show.' },
    ],
  },
  {
    day: 'Day 2 — Feb 16',
    segments: [
      { time: '09:30', title: 'Workshops in Orbit', detail: 'Creator labs on beat-making, anime art, and streaming.' },
      { time: '15:00', title: 'Dance Battle Nexus', detail: 'Final showdown with interactive LED floor.' },
      { time: '20:30', title: 'Chaos Finale', detail: 'Mass cosplay flash mob + surprise headline act.' },
    ],
  },
];

const Schedule = () => (
  <section id="schedule" className="relative border-y border-white/10 bg-black/80 py-24">
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute left-12 top-6 h-48 w-48 rounded-full bg-electric-blue/15 blur-3xl" />
      <span className="absolute bottom-10 right-8 h-60 w-60 rounded-full bg-cyber-lime/15 blur-3xl" />
    </div>
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="flex flex-col gap-10 lg:flex-row">
        <motion.div
          className="glass-panel flex-1 border-white/10 p-8"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-headline text-4xl text-white">
            <ColorShiftText className="text-4xl">Venue Intel</ColorShiftText>
          </h2>
          <p className="mt-4 text-white/70">Mount Litera Zee School, Hazaribagh — transformed into a neon megaverse with luminous pathways and immersive domes.</p>
          <div className="mt-6 overflow-hidden rounded-[30px] border border-white/10">
            <iframe
              title="Madooza Venue"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.932400612466!2d85.3622891750989!3d23.19146747906518!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4d6f5fca289b1%3A0x5e1f71666da68c9e!2sMount%20Litera%20Zee%20School%20Hazaribagh!5e0!3m2!1sen!2sin!4v1696958452935!5m2!1sen!2sin"
              width="100%"
              height="320"
              style={{ border: 0, filter: 'hue-rotate(180deg) saturate(160%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.div
          className="relative flex-1"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="timeline relative rounded-[32px] border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
            <h3 className="font-headline text-3xl text-neon-pink">
              <ColorShiftText className="text-3xl">Schedule Timeline</ColorShiftText>
            </h3>
            <div className="mt-10 space-y-12">
              {highlights.map((day) => (
                <div key={day.day}>
                  <p className="font-headline text-xl text-electric-blue">{day.day}</p>
                  <div className="mt-6 space-y-10">
                    {day.segments.map((segment, index) => (
                      <motion.div
                        key={`${day.day}-${segment.time}`}
                        className="timeline-item relative rounded-3xl border border-white/10 bg-black/60 p-6 pl-12 text-white/80 shadow-neon"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                      >
                        <p className="font-headline text-lg text-cyber-lime">{segment.time}</p>
                        <p className="mt-2 text-xl text-white">{segment.title}</p>
                        <p className="mt-2 text-sm text-white/70">{segment.detail}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Schedule;
