import { useEffect, useMemo, useState } from 'react';

const involveItems = [
  {
    id: 'sponsor',
    title: 'Become a Sponsor',
    copy:
      'Plug your brand into the city\'s loudest youth stage. Let\'s craft neon-drenched experiences that your audiences will never forget.',
    accent: 'card-blue',
    cta: 'Sponsor Us',
  },
  {
    id: 'stall',
    title: 'Book a Stall',
    copy:
      'Serve flavours, merch, or mad art. Claim your premium stall and feed the frenzy of thousands hunting for something fresh.',
    accent: 'card-orange',
    cta: 'Book Stall',
    payment: 2500,
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    copy:
      'Run the backstage chaos. Work with artists, DJs, and creators while keeping the madness on beat.',
    accent: 'card-magenta',
    cta: 'Join Crew',
  },
  {
    id: 'partner',
    title: 'Partner with Imagicity',
    copy:
      'Co-create stages, workshops, and collabs that push Hazaribagh into the spotlight. We\'re open to wild ideas.',
    accent: 'card-cyan',
    cta: 'Partner Up',
  },
];

const modalConfigs = {
  tickets: {
    heading: 'Buy Ticket',
    blurb:
      'Lock your pass to MADOOZA and dive into neon nights, food explosions, and genre-bending performances.',
    payment: 20,
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
    ],
  },
  stall: {
    heading: 'Book a Stall',
    blurb:
      'Tell us what you\'re bringing to the chaos and confirm your ₹2500 slot. Only the boldest experiences make it in.',
    payment: 2500,
    fields: [
      { name: 'brand', label: 'Brand / Project', type: 'text', required: true },
      { name: 'contact', label: 'Primary Contact', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'concept', label: 'What are you showcasing?', type: 'textarea', required: true },
    ],
  },
  sponsor: {
    heading: 'Become a Sponsor',
    blurb:
      'Drop your details and let\'s design a sponsorship tier that electrifies young Hazaribagh.',
    fields: [
      { name: 'brand', label: 'Brand Name', type: 'text', required: true },
      { name: 'contact', label: 'Contact Person', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'goals', label: 'Collaboration Goals', type: 'textarea', required: false },
    ],
  },
  volunteer: {
    heading: 'Volunteer with MADOOZA',
    blurb:
      'Fill this in and we\'ll loop you into crew briefings, rehearsals, and creative missions.',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'skills', label: 'Skills / Interests', type: 'textarea', required: true },
    ],
  },
  partner: {
    heading: 'Partner with Imagicity',
    blurb:
      'Let\'s co-design experiences, hackathons, or pop-ups. Drop your idea and we\'ll reach out.',
    fields: [
      { name: 'org', label: 'Organisation / Collective', type: 'text', required: true },
      { name: 'contact', label: 'Contact Person', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'proposal', label: 'Collab Idea', type: 'textarea', required: true },
    ],
  },
};

const App = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [paymentState, setPaymentState] = useState({});

  useEffect(() => {
    const sections = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openModal = (id) => {
    setActiveModal(id);
    setPaymentState((prev) => ({ ...prev, [id]: 'idle' }));
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleInputChange = (modalId, fieldName, value) => {
    setFormValues((prev) => ({
      ...prev,
      [modalId]: { ...prev[modalId], [fieldName]: value },
    }));
  };

  const handleSubmit = (modalId, event) => {
    event.preventDefault();
    if (!modalId) return;
    if (modalConfigs[modalId]?.payment) {
      setPaymentState((prev) => ({ ...prev, [modalId]: 'processing' }));
      setTimeout(() => {
        setPaymentState((prev) => ({ ...prev, [modalId]: 'success' }));
      }, 1400);
    } else {
      setPaymentState((prev) => ({ ...prev, [modalId]: 'success' }));
    }
  };

  const navLinks = useMemo(
    () => [
      { href: '#about', label: 'About' },
      { href: '#events', label: 'Events' },
      { href: '#involve', label: 'Involve' },
      { href: '#partners', label: 'Partners' },
      { href: '#contact', label: 'Contact' },
    ],
    []
  );

  const renderModal = () => {
    if (!activeModal) return null;
    const config = modalConfigs[activeModal];
    if (!config) return null;
    const status = paymentState[activeModal] || 'idle';

    return (
      <div className="modal-backdrop" role="dialog" aria-modal="true">
        <div className="modal-card">
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Close form">
            ×
          </button>
          <h3>{config.heading}</h3>
          <p className="modal-blurb">{config.blurb}</p>
          {status === 'success' ? (
            <div className="modal-success">
              <h4>We\'ve got your details!</h4>
              <p>Our crew will reach out shortly with the next steps. Stay tuned for the madness.</p>
              <button className="neon-button" type="button" onClick={closeModal}>
                Close
              </button>
            </div>
          ) : (
            <form className="modal-form" onSubmit={(event) => handleSubmit(activeModal, event)}>
              {config.fields.map((field) => (
                <label key={field.name}>
                  <span>{field.label}</span>
                  {field.type === 'textarea' ? (
                    <textarea
                      required={field.required}
                      value={formValues[activeModal]?.[field.name] || ''}
                      onChange={(event) => handleInputChange(activeModal, field.name, event.target.value)}
                      rows={4}
                    />
                  ) : (
                    <input
                      type={field.type}
                      required={field.required}
                      value={formValues[activeModal]?.[field.name] || ''}
                      onChange={(event) => handleInputChange(activeModal, field.name, event.target.value)}
                    />
                  )}
                </label>
              ))}
              {config.payment ? (
                <button
                  className={`neon-button button-pulse ${status === 'processing' ? 'is-loading' : ''}`}
                  type="submit"
                  disabled={status === 'processing'}
                >
                  {status === 'processing' ? 'Processing Payment…' : `Pay ₹${config.payment}`}
                </button>
              ) : (
                <button className="neon-button" type="submit">
                  Submit Details
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="app-shell">
      <nav className="navbar">
        <div className="nav-inner">
          <a className="logo" href="#hero">
            MADOOZA
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
          <button className="neon-button neon-glow nav-ticket" type="button" onClick={() => openModal('tickets')}>
            Buy Ticket ₹20
          </button>
        </div>
      </nav>

      <header id="hero" className="hero-section parallax">
        <div className="hero-overlay animated-gradient" />
        <div className="hero-content">
          <h1 className="hero-title">MADOOZA – THE SOUND OF PURE MADNESS</h1>
          <p className="hero-subtext">Hazaribagh\'s first youth cultural carnival.</p>
          <button className="neon-button neon-glow button-pulse" type="button" onClick={() => openModal('tickets')}>
            Book Your Pass
          </button>
        </div>
      </header>

      <section className="ticker" aria-hidden="true">
        <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
        <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
      </section>

      <main>
        <section id="about" className="section fade-section">
          <div className="section-heading">
            <h2>About Madooza</h2>
            <span className="section-accent" />
          </div>
          <p className="lead">
            Madooza is not just another fest — it’s Hazaribagh’s first creative explosion where art, food, music, and ideas
            collide. Conceptualized and organized by IMAGICITY, Madooza gives local creators, brands, and students a platform
            that feels premium yet rooted. From vibrant food stalls to live exhibitions, performances, and interactive zones,
            every corner of Madooza is designed to spark curiosity and collaboration. It’s where creativity meets opportunity —
            for entrepreneurs, artists, and dreamers ready to make noise in a Tier-3 city.
          </p>
        </section>

        <section id="events" className="section fade-section">
          <div className="section-heading">
            <h2>Events</h2>
            <span className="section-accent" />
          </div>
          <div className="event-grid">
            {[
              {
                title: 'Food Stalls 🍜',
                copy: 'Gourmet chaos from local chefs, cloud kitchens, and pop-up innovators.',
              },
              {
                title: 'Cosplay Corner 🎭',
                copy: 'Anime, gaming, and desi folklore mash-ups under neon lights.',
              },
              {
                title: 'Dance Arena 💃',
                copy: 'Street battles, K-pop covers, and freestyle crews bringing the heat.',
              },
              {
                title: 'DJ Night 🎧',
                copy: 'Bass-heavy sets from regional selectors and secret guest performers.',
              },
              {
                title: 'Art & Exhibition 🎨',
                copy: 'Immersive installations, live murals, and digital art drops.',
              },
              {
                title: 'Local Brands Market 🛍️',
                copy: 'Limited-edition merch and craft from Hazaribagh’s boldest makers.',
              },
            ].map((item) => (
              <article key={item.title} className="tile neon-glow">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="involve" className="section fade-section">
          <div className="section-heading">
            <h2>Involve With Us</h2>
            <span className="section-accent" />
          </div>
          <div className="involve-grid">
            {involveItems.map((item) => (
              <article key={item.id} className={`involve-card ${item.accent} neon-glow`}>
                <div className="card-body">
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </div>
                <button className="card-button" type="button" onClick={() => openModal(item.id)}>
                  {item.cta}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="guests" className="section fade-section">
          <div className="section-heading">
            <h2>Guests</h2>
            <span className="section-accent" />
          </div>
          <div className="guest-grid">
            {[1, 2, 3].map((slot) => (
              <div key={slot} className="guest-card">
                <span className="guest-placeholder">To Be Revealed Soon</span>
              </div>
            ))}
          </div>
        </section>

        <section id="partners" className="section fade-section">
          <div className="section-heading">
            <h2>Partners</h2>
            <span className="section-accent" />
          </div>
          <p className="lead center">Coming Soon.</p>
          <div className="partners-grid">
            {[1, 2, 3, 4].map((slot) => (
              <div key={slot} className="partner-placeholder" aria-hidden="true" />
            ))}
          </div>
        </section>

        <section id="contact" className="section fade-section">
          <div className="section-heading">
            <h2>Contact Us</h2>
            <span className="section-accent" />
          </div>
          <p className="lead center">Contact us for more details.</p>
          <form className="contact-form">
            <label>
              <span>Name</span>
              <input type="text" name="name" required />
            </label>
            <label>
              <span>Email</span>
              <input type="email" name="email" required />
            </label>
            <label className="full">
              <span>Message</span>
              <textarea name="message" rows={4} required />
            </label>
            <button className="neon-button neon-glow" type="submit">
              Send Message
            </button>
          </form>
          <p className="contact-email">info@madooza.com</p>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2025 MADOOZA | Organized by IMAGICITY</p>
        <div className="footer-socials">
          <a href="https://instagram.com" aria-label="Instagram">IG</a>
          <a href="https://facebook.com" aria-label="Facebook">FB</a>
          <a href="mailto:info@madooza.com" aria-label="Email">Mail</a>
        </div>
      </footer>

      {renderModal()}
    </div>
  );
};

export default App;
