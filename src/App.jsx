import { useCallback, useEffect, useMemo, useState } from 'react';
import CosplayPage from './pages/CosplayPage';

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
    id: 'cosplay-card',
    title: 'Join the Cosplay Arena',
    copy:
      'Unleash your alter ego in neon lights. Walk the grounds in character and face off in the MAD Parade showdown.',
    accent: 'card-violet',
    cta: 'Explore Cosplay Arena',
    navigateTo: 'cosplay',
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

const festivalColumns = [
  {
    id: 'gaming',
    title: 'Gaming',
    copy: 'LAN battles, retro revival, VR chaos — welcome to the arena.',
    color: '#ff3b5c',
    textColor: '#0b0616',
  },
  {
    id: 'expo',
    title: 'Expo',
    copy: 'Hands-on showcases from bold startups, makers, and brand labs.',
    color: '#b2ff1c',
    textColor: '#0b0616',
  },
  {
    id: 'creators',
    title: 'Creators',
    copy: 'Content studios, live podcasts, collab challenges & creator drops.',
    color: '#ff9f1c',
    textColor: '#0b0616',
  },
  {
    id: 'cosplay',
    title: 'Cosplay',
    copy: 'Suit up for the MAD Parade and rule the MADVERSE runway.',
    color: '#8338ec',
    textColor: '#ffffff',
  },
  {
    id: 'esports',
    title: 'Esports',
    copy: 'Caster-led showdowns with high-stakes brackets and prize pools.',
    color: '#00bbf9',
    textColor: '#0b0616',
  },
  {
    id: 'live-acts',
    title: 'Live Acts',
    copy: 'DJs, indie bands, and midnight cyphers to keep the night loud.',
    color: '#ff4d00',
    textColor: '#0b0616',
  },
];

const HomeSections = ({ openModal, onNavigate }) => (
  <>
    <section id="about" className="section fade-section section-about">
      <div className="section-inner">
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
      </div>
    </section>

    <section id="festivals" className="section fade-section section-festivals">
      <div className="section-inner festival-heading">
        <div className="section-heading">
          <h2>Festivals</h2>
          <span className="section-accent" />
        </div>
        <p className="lead">
          Six immersive worlds across the MADOOZA grounds — dive into every colour-drenched experience.
        </p>
      </div>
      <div className="festival-grid">
        {festivalColumns.map((item) => (
          <article
            key={item.id}
            className="festival-card"
            style={{ '--festival-bg': item.color, '--festival-text': item.textColor }}
          >
            <div className="festival-content">
              <span className="festival-tag">{item.title}</span>
              <p>{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </section>

    <section id="involve" className="section fade-section section-involve">
      <div className="section-inner">
        <div className="section-heading">
          <h2>Involve With Us</h2>
          <span className="section-accent" />
        </div>
        <div className="involve-grid">
          {involveItems.map((item) => (
            <article key={item.id} className={`involve-card ${item.accent}`}>
              <div className="card-body">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <button
                className="card-button"
                type="button"
                onClick={() => {
                  if (item.navigateTo) {
                    onNavigate(item.navigateTo);
                  } else {
                    openModal(item.id);
                  }
                }}
              >
                {item.cta}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="guests" className="section fade-section section-guests">
      <div className="section-inner">
        <div className="section-heading">
          <h2>Guests</h2>
          <span className="section-accent" />
        </div>
        <div className="guest-grid">
          {[1, 2, 3].map((slot) => (
            <div key={slot} className="guest-card">
              <div className="guest-image-frame">
                <img src="https://placehold.co/260x260?text=Guest+Image" alt="Guest reveal placeholder" />
              </div>
              <span className="guest-placeholder">To Be Revealed Soon</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section id="partners" className="section fade-section section-partners">
      <div className="section-inner">
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
      </div>
    </section>

    <section id="contact" className="section fade-section section-contact">
      <div className="section-inner">
        <div className="contact-layout">
          <div className="contact-text">
            <div className="section-heading">
              <h2>Contact Us</h2>
              <span className="section-accent" />
            </div>
            <p className="lead">Contact us for more details.</p>
            <p className="contact-email">info@madooza.com</p>
          </div>
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
            <button className="neon-button" type="submit">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  </>
);

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
      "Tell us what you're bringing to the chaos and confirm your ₹2500 slot. Only the boldest experiences make it in.",
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
      "Drop your details and let's design a sponsorship tier that electrifies young Hazaribagh.",
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
      "Fill this in and we'll loop you into crew briefings, rehearsals, and creative missions.",
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
      "Let's co-design experiences, hackathons, or pop-ups. Drop your idea and we'll reach out.",
    fields: [
      { name: 'org', label: 'Organisation / Collective', type: 'text', required: true },
      { name: 'contact', label: 'Contact Person', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'proposal', label: 'Collab Idea', type: 'textarea', required: true },
    ],
  },
  cosplayRegistration: {
    heading: 'Cosplay Arena Registration',
    blurb:
      'Secure your slot in the MADOOZA Cosplay Arena. ₹299 gets you parade access, pro photography, and a shot at neon glory.',
    payment: 299,
    fields: [
      { name: 'stageName', label: 'Performer / Stage Name', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true },
      { name: 'character', label: 'Character / Concept', type: 'text', required: true },
      { name: 'universe', label: 'Source (Anime / Game / Film / Original)', type: 'text', required: false },
    ],
  },
};

const getInitialView = () => {
  if (typeof window === 'undefined') {
    return 'home';
  }
  const params = new URLSearchParams(window.location.search);
  return params.get('view') === 'cosplay' ? 'cosplay' : 'home';
};

const App = () => {
  const [currentView, setCurrentView] = useState(getInitialView);
  const [activeModal, setActiveModal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [paymentState, setPaymentState] = useState({});
  const isCosplayView = currentView === 'cosplay';

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getInitialView());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateView = useCallback((view, hash) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (view === 'cosplay') {
      params.set('view', 'cosplay');
    } else {
      params.delete('view');
    }

    const basePath = window.location.pathname.split('?')[0];
    const queryString = params.toString();
    const nextUrl = `${basePath}${queryString ? `?${queryString}` : ''}${hash || ''}`;

    window.history.pushState({ view }, '', nextUrl);
    setCurrentView(view);

    if (view === 'home') {
      if (hash) {
        setTimeout(() => {
          const target = document.querySelector(hash);
          target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 160);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (currentView === 'cosplay') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (window.location.hash && currentView === 'home') {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    }
  }, [currentView]);

  const handleNavClick = useCallback(
    (event, hash) => {
      event.preventDefault();
      updateView('home', hash);
    },
    [updateView]
  );

  const handleLogoClick = useCallback(
    (event) => {
      event.preventDefault();
      updateView('home', '#hero');
    },
    [updateView]
  );

  const handleCosplayNavigate = useCallback(() => {
    updateView('cosplay');
  }, [updateView]);

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
  }, [currentView]);

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
      { href: '#festivals', label: 'Festivals' },
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
          <a className="logo" href="/" onClick={handleLogoClick}>
            MADOOZA
          </a>
          <div className="nav-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link"
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a href="?view=cosplay" className="nav-link" onClick={(event) => { event.preventDefault(); handleCosplayNavigate(); }}>
              Cosplay
            </a>
          </div>
          <button className="neon-button nav-ticket" type="button" onClick={() => openModal('tickets')}>
            Buy Ticket ₹20
          </button>
        </div>
      </nav>

      {!isCosplayView && (
        <header id="hero" className="hero-section parallax">
          <div className="hero-content">
            <h1 className="hero-title">MADOOZA – THE SOUND OF PURE MADNESS</h1>
            <p className="hero-subtext">Hazaribagh's first youth cultural carnival.</p>
            <button className="neon-button button-pulse" type="button" onClick={() => openModal('tickets')}>
              Book Your Pass
            </button>
          </div>
        </header>
      )}

      <section className="ticker" aria-hidden="true">
        <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
        <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
      </section>

      <main>
        {isCosplayView ? (
          <CosplayPage onBack={() => updateView('home')} onProceed={() => openModal('cosplayRegistration')} />
        ) : (
          <HomeSections openModal={openModal} onNavigate={handleCosplayNavigate} />
        )}
      </main>

      <footer className="site-footer">
        <p>© 2025 MADOOZA | Organized by IMAGICITY</p>
        <div className="footer-socials">
          <a href="https://instagram.com" aria-label="Instagram">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7zm5 3.5A3.5 3.5 0 1 1 8.5 12 3.5 3.5 0 0 1 12 8.5zm0 2A1.5 1.5 0 1 0 13.5 12 1.5 1.5 0 0 0 12 10.5zm5.25-3.75a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
            </svg>
          </a>
          <a href="https://facebook.com" aria-label="Facebook">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M13.5 9H15V6h-1.5C11.57 6 10 7.57 10 9.5V11H8v3h2v7h3v-7h2.25l.75-3H13v-1.5A.5.5 0 0 1 13.5 9Z" />
            </svg>
          </a>
          <a href="mailto:info@madooza.com" aria-label="Email">
            <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
              <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm0 2v.21l8 5.33 8-5.33V7H4zm16 10V9.79l-7.47 4.98a1 1 0 0 1-1.06 0L4 9.79V17h16z" />
            </svg>
          </a>
        </div>
      </footer>

      {renderModal()}
    </div>
  );
};

export default App;
