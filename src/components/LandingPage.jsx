import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiInstagram, FiYoutube, FiFacebook, FiArrowRight } from 'react-icons/fi';

if (typeof window !== 'undefined' && gsap.core.globals().ScrollTrigger !== ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingPage = ({ onNavigate }) => {
  const heroTitleRef = useRef(null);
  const sectionsRef = useRef([]);

  const titleLetters = useMemo(
    () => 'Madooza – The Sound of Pure Madness.'.split('').map((char, index) => ({
      char,
      key: `${char}-${index}`,
    })),
    []
  );

  useEffect(() => {
    if (!heroTitleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-title span',
        { y: 90, opacity: 0, rotateX: 65 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          ease: 'back.out(1.8)',
          stagger: 0.035,
          duration: 0.9,
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
    }, heroTitleRef);

    return () => ctx.revert();
  }, []);

  return (
    <div>
      <header className="hero" id="hero">
        <div className="hero-background" aria-hidden="true">
          <div className="hero-shape shape-1" />
          <div className="hero-shape shape-2" />
          <div className="hero-shape shape-3" />
        </div>
        <div className="container hero-content">
          <p className="tagline animate-in">Hazaribagh · 2025 · Imagicity</p>
          <h1 className="hero-title" ref={heroTitleRef}>
            {titleLetters.map(({ char, key }) => (
              <span key={key}>{char === ' ' ? '\u00A0' : char}</span>
            ))}
          </h1>
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
        </div>
      </header>

      <section id="about" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="container">
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
      </section>

      <section id="involve" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="container">
          <h2 className="section-title animate-in">Involve With Us</h2>
          <p className="section-subtitle animate-in">
            Pick your playground. Whether you’re showcasing, supporting, or volunteering, we’ll make
            the madness worth it.
          </p>
          <div className="card-grid" style={{ marginTop: '2rem' }}>
            <article className="card animate-in">
              <h3>Have Your Own Stall</h3>
              <p>
                Lock in a high-energy stall space that spotlights your brand to thousands of curious
                attendees.
              </p>
              <button className="btn" style={{ marginTop: '1.6rem' }} onClick={() => onNavigate('/stall')}>
                Apply – ₹2500
              </button>
            </article>
            <article className="card animate-in">
              <h3>Become a Sponsor</h3>
              <p>
                Plug your brand into the heart of Madooza and collaborate on premium, high-impact
                experiences.
              </p>
              <button className="btn" style={{ marginTop: '1.6rem' }} onClick={() => onNavigate('/sponsor')}>
                Partner With Us
              </button>
            </article>
            <article className="card animate-in">
              <h3>Become a Volunteer</h3>
              <p>
                Join the dream team that keeps the madness flowing. Gain backstage access and
                hands-on experience.
              </p>
              <button className="btn" style={{ marginTop: '1.6rem' }} onClick={() => onNavigate('/volunteer')}>
                Join The Crew
              </button>
            </article>
          </div>
        </div>
      </section>

      <section id="guests" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="container">
          <h2 className="section-title animate-in">Guests</h2>
          <p className="section-subtitle animate-in">To be revealed soon.</p>
          <div className="guests-grid">
            <div className="guest-frame animate-in">Guest</div>
            <div className="guest-frame animate-in">Guest</div>
            <div className="guest-frame animate-in">Guest</div>
          </div>
        </div>
      </section>

      <section id="partners" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container">
          <h2 className="section-title animate-in">Partners</h2>
          <p className="section-subtitle animate-in">Coming soon.</p>
          <div className="placeholder-grid">
            <div className="placeholder-box animate-in" />
            <div className="placeholder-box animate-in" />
            <div className="placeholder-box animate-in" />
            <div className="placeholder-box animate-in" />
          </div>
        </div>
      </section>

      <section id="contact" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="container">
          <h2 className="section-title animate-in">Contact Us</h2>
          <p className="section-subtitle animate-in">
            Contact us for more details. Email us anytime at{' '}
            <a href="mailto:info@madooza.com" style={{ color: 'var(--aqua-blue)' }}>
              info@madooza.com
            </a>
            .
          </p>
          <form className="contact-form" style={{ marginTop: '2rem' }}>
            <input className="animate-in" type="text" placeholder="Name" required />
            <input className="animate-in" type="email" placeholder="Email" required />
            <textarea className="animate-in" placeholder="Message" required />
            <button type="submit" className="btn animate-in" style={{ width: 'fit-content' }}>
              Send Message
            </button>
          </form>
        </div>
      </section>

      <footer>
        <div className="container footer-content">
          <p>© 2025 Madooza | Powered by Imagicity</p>
          <div className="social-links" aria-label="Social media links">
            <a href="https://instagram.com" aria-label="Instagram">
              <FiInstagram />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FiYoutube />
            </a>
            <a href="https://facebook.com" aria-label="Facebook">
              <FiFacebook />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
