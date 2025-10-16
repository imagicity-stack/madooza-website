import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiInstagram, FiYoutube, FiFacebook, FiArrowRight } from 'react-icons/fi';
import Dither from './effects/Dither.jsx';
import ScrollStack, { ScrollStackItem } from './effects/ScrollStack.jsx';
import Shuffle from './effects/Shuffle.jsx';

if (typeof window !== 'undefined' && gsap.core.globals().ScrollTrigger !== ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage = ({ onNavigate }) => {
  const pageRef = useRef(null);
  const sectionsRef = useRef([]);
  const shuffleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero .animate-in',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.12,
        }
      );

      sectionsRef.current.forEach((section) => {
        if (!section) return;
        gsap.fromTo(
          section.querySelectorAll('.animate-in'),
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
            },
          }
        );
      });

      if (shuffleRef.current) {
        const tiles = shuffleRef.current.querySelectorAll('.shuffle-tile');
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });
        tl.to(tiles, {
          rotate: (index) => (index % 2 === 0 ? 15 : -15),
          yPercent: (index) => (index % 3) * 8 - 12,
          scale: 1.12,
          opacity: 0.9,
          duration: 1.4,
          ease: 'expo.out',
          stagger: {
            each: 0.045,
            from: 'random',
          },
        }).to(
          tiles,
          {
            rotate: 0,
            yPercent: 0,
            scale: 1,
            opacity: 0.65,
            duration: 1.1,
            ease: 'power3.inOut',
            stagger: {
              each: 0.03,
              from: 'edges',
            },
          },
          '>-0.65'
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="landing-page">
      <div className="dither-backdrop" aria-hidden="true">
        <Dither
          waveColor={[0.2, 0.65, 1]}
          disableAnimation={false}
          enableMouseInteraction
          mouseRadius={0.4}
          colorNum={5}
          waveAmplitude={0.35}
          waveFrequency={3}
          waveSpeed={0.06}
        />
      </div>
      <header className="hero" id="hero">
        <div className="hero-background" aria-hidden="true">
          <div className="hero-noise" />
          <div className="shuffle-cluster" ref={shuffleRef}>
            {Array.from({ length: 30 }).map((_, index) => (
              <span key={`shuffle-${index}`} className="shuffle-tile" />
            ))}
          </div>
        </div>
        <div className="container hero-content">
          <p className="tagline animate-in">Hazaribagh · 2025 · Imagicity</p>
          <Shuffle
            text="Madooza – The Sound of Pure Madness."
            tag="h1"
            className="hero-title"
            shuffleDirection="right"
            duration={0.45}
            shuffleTimes={2}
            animationMode="evenodd"
            stagger={0.04}
            triggerOnce
            triggerOnHover
            textAlign="left"
          />
          <p className="hero-subtitle animate-in">
            Dive into an explosive collision of art, food, music, and ideas. Madooza brings the
            city's boldest creators and dreamers together for a night that feels premium, raw, and
            unforgettable.
          </p>
          <div className="badge-row animate-in">
            <span className="badge">Live Performances</span>
            <span className="badge">Interactive Zones</span>
            <span className="badge">Creator Market</span>
          </div>
          <button className="btn animate-in" onClick={() => onNavigate('/tickets')}>
            Buy Ticket – ₹20
            <FiArrowRight />
          </button>
          <div className="hero-social animate-in">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FiYoutube />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FiFacebook />
            </a>
          </div>
        </div>
      </header>

      <section id="about" ref={(el) => (sectionsRef.current[0] = el)} className="section-shell">
        <div className="section-frame">
          <div className="section-content">
            <h2 className="section-title animate-in">About Madooza</h2>
            <p className="section-subtitle animate-in">
              Madooza is not just another fest — it’s Hazaribagh’s first creative explosion where art,
              food, music, and ideas collide. Conceptualized and organized by IMAGICITY, Madooza is
              built to give local creators, brands, and students a platform that feels premium yet
              rooted.
            </p>
            <p className="section-subtitle animate-in" style={{ marginTop: '1.4rem' }}>
              From vibrant food stalls to live exhibitions, performances, and interactive zones, every
              corner of Madooza is designed to spark curiosity and collaboration. It’s a space where
              creativity meets opportunity — for entrepreneurs, artists, and dreamers ready to make
              noise in a Tier-3 city.
            </p>
          </div>
        </div>
      </section>

      <section id="involve" ref={(el) => (sectionsRef.current[1] = el)} className="section-shell">
        <div className="section-frame">
          <div className="section-content">
            <h2 className="section-title animate-in">Involve With Us</h2>
            <p className="section-subtitle animate-in">
              Pick your playground. Whether you’re showcasing, supporting, or volunteering, we’ll make
              the madness worth it.
            </p>
            <div className="stack-wrapper animate-in">
              <ScrollStack
                className="involve-stack"
                useWindowScroll
                itemDistance={140}
                itemScale={0.06}
                itemStackDistance={55}
                stackPosition="32%"
                scaleEndPosition="18%"
                baseScale={0.82}
              >
                <ScrollStackItem itemClassName="stall-card">
                  <span className="stack-tagline">Signature marketplace arena</span>
                  <h3>Put Up Your Stall</h3>
                  <p>
                    Secure a hero stall placement with premium lighting, power, and concierge support so
                    your brand steals the crowd from the moment the gates open.
                  </p>
                  <button className="btn stack-btn" onClick={() => onNavigate('/stall')}>
                    Apply – ₹2500
                  </button>
                </ScrollStackItem>
                <ScrollStackItem itemClassName="volunteer-card">
                  <span className="stack-tagline">Crew the madness</span>
                  <h3>Become a Volunteer</h3>
                  <p>
                    Run stage flips, guide VIPs, and earn all-access credentials while building real
                    festival ops experience alongside the Imagicity core team.
                  </p>
                  <button className="btn stack-btn" onClick={() => onNavigate('/volunteer')}>
                    Join the Crew
                  </button>
                </ScrollStackItem>
                <ScrollStackItem itemClassName="sponsor-card">
                  <span className="stack-tagline">Amplify the spectacle</span>
                  <h3>Become a Sponsor</h3>
                  <p>
                    Co-create headline moments, stage takeovers, and immersive brand drops that put your
                    logo in every reel and recap.
                  </p>
                  <button className="btn stack-btn" onClick={() => onNavigate('/sponsor')}>
                    Partner With Us
                  </button>
                </ScrollStackItem>
              </ScrollStack>
            </div>
          </div>
        </div>
      </section>

      <section id="guests" ref={(el) => (sectionsRef.current[2] = el)} className="section-shell">
        <div className="section-frame">
          <div className="section-content">
            <h2 className="section-title animate-in">Guests</h2>
            <p className="section-subtitle animate-in">To be revealed soon.</p>
            <div className="guests-grid">
              <div className="guest-frame animate-in" data-pulse>
                <span>Guest</span>
              </div>
              <div className="guest-frame animate-in" data-pulse>
                <span>Guest</span>
              </div>
              <div className="guest-frame animate-in" data-pulse>
                <span>Guest</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="partners" ref={(el) => (sectionsRef.current[3] = el)} className="section-shell">
        <div className="section-frame">
          <div className="section-content">
            <h2 className="section-title animate-in">Partners</h2>
            <p className="section-subtitle animate-in">Coming soon.</p>
            <div className="placeholder-grid">
              <div className="placeholder-box animate-in" />
              <div className="placeholder-box animate-in" />
              <div className="placeholder-box animate-in" />
              <div className="placeholder-box animate-in" />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" ref={(el) => (sectionsRef.current[4] = el)} className="section-shell">
        <div className="section-frame">
          <div className="section-content contact-grid">
            <div>
              <h2 className="section-title animate-in">Contact Us</h2>
              <p className="section-subtitle animate-in">
                Contact us for more details. Email us anytime at{' '}
                <a href="mailto:info@madooza.com" className="link-pill">
                  info@madooza.com
                </a>
                .
              </p>
              <div className="contact-bubbles animate-in">
                <span>Venue Support</span>
                <span>Creator Collaborations</span>
                <span>Press &amp; Media</span>
              </div>
            </div>
            <form className="contact-form" style={{ marginTop: '2rem' }}>
              <input className="animate-in" type="text" placeholder="Name" required />
              <input className="animate-in" type="email" placeholder="Email" required />
              <textarea className="animate-in" placeholder="Message" required />
              <button type="submit" className="btn animate-in" style={{ width: 'fit-content' }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <span>© 2025 Madooza | Powered by Imagicity</span>
          <div className="footer-icons">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <FiYoutube />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FiFacebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
