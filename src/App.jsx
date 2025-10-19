import { useCallback, useEffect, useMemo, useState } from 'react';
import CosplayPage from './pages/CosplayPage';
import CircularGallery from './components/CircularGallery';

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

const festivalItems = [
  {
    id: 'gaming',
    title: 'Gaming Arena',
    copy: 'LAN battles, retro revival, VR chaos — welcome to the arena.',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'expo',
    title: 'Innovation Expo',
    copy: 'Hands-on showcases from bold startups, makers, and brand labs.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'creators',
    title: 'Creator Studios',
    copy: 'Content studios, live podcasts, collab challenges & creator drops.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'cosplay',
    title: 'Cosplay Parade',
    copy: 'Suit up for the MAD Parade and rule the MADVERSE runway.',
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'esports',
    title: 'Esports Clash',
    copy: 'Caster-led showdowns with high-stakes brackets and prize pools.',
    image: 'https://images.unsplash.com/photo-1511871893393-82e9c16b81e0?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'live-acts',
    title: 'Live Acts',
    copy: 'DJs, indie bands, and midnight cyphers to keep the night loud.',
    image: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?auto=format&fit=crop&w=1200&q=80',
  },
];

const festivalGalleryItems = festivalItems.map((item) => ({ image: item.image, text: item.title }));

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
      <div className="festival-gallery">
        <div className="festival-gallery-frame">
          <CircularGallery
            items={festivalGalleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.05}
            scrollEase={0.02}
          />
        </div>
        <div className="festival-gallery-copy">
          {festivalItems.map((item) => (
            <article key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
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
        <div className="footer-meta">
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
        </div>

        <div className="footer-legals">
          <details>
            <summary>Privacy Policy – Madooza</summary>
            <div className="legal-content">
              <p>
                <strong>Last Updated:</strong> October 2025
              </p>
              <ol>
                <li>
                  <h4>Introduction</h4>
                  <p>
                    Welcome to Madooza, organized by IMAGICITY. We value your privacy and are committed to protecting your
                    personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you
                    visit our website or register for the event.
                  </p>
                </li>
                <li>
                  <h4>Information We Collect</h4>
                  <p>We may collect the following types of information:</p>
                  <ul>
                    <li>Personal details such as name, email address, phone number, and age when you register or buy tickets.</li>
                    <li>Payment information processed securely through our payment gateway. We do not store card or banking details.</li>
                    <li>Usage data including device information, browser type, pages visited, and interaction logs collected via cookies or analytics tools.</li>
                  </ul>
                </li>
                <li>
                  <h4>How We Use Your Information</h4>
                  <p>We use your information to:</p>
                  <ul>
                    <li>Process event registrations and payments.</li>
                    <li>Communicate updates, confirmations, and event-related details.</li>
                    <li>Improve our website’s performance and user experience.</li>
                    <li>Ensure event security and regulatory compliance.</li>
                  </ul>
                </li>
                <li>
                  <h4>Data Protection</h4>
                  <p>
                    Your personal information is stored on secure servers. We use encryption and limited-access protocols to prevent
                    unauthorized use or disclosure.
                  </p>
                </li>
                <li>
                  <h4>Sharing of Information</h4>
                  <p>We do not sell or rent your personal data. We may share limited information only with:</p>
                  <ul>
                    <li>Payment gateways for processing transactions.</li>
                    <li>Event partners or vendors who assist in operations under confidentiality agreements.</li>
                    <li>Law enforcement if required by law.</li>
                  </ul>
                </li>
                <li>
                  <h4>Cookies</h4>
                  <p>
                    We use cookies to enhance website performance and understand user behavior. You can disable cookies through your
                    browser settings, but certain features may not function properly.
                  </p>
                </li>
                <li>
                  <h4>Third-Party Links</h4>
                  <p>
                    Our site may contain links to third-party websites. We are not responsible for their privacy practices or
                    content.
                  </p>
                </li>
                <li>
                  <h4>Your Rights</h4>
                  <p>You have the right to:</p>
                  <ul>
                    <li>Request access, correction, or deletion of your data.</li>
                    <li>Withdraw consent for communications by emailing <a href="mailto:contact@imagicity.in">contact@imagicity.in</a>.</li>
                  </ul>
                </li>
                <li>
                  <h4>Children’s Privacy</h4>
                  <p>
                    We do not knowingly collect information from individuals under 13 years of age. If such data is discovered, it
                    will be deleted promptly.
                  </p>
                </li>
                <li>
                  <h4>Updates to This Policy</h4>
                  <p>
                    We may revise this Privacy Policy from time to time. Updates will be posted on this page with a new “Last
                    Updated” date.
                  </p>
                </li>
                <li>
                  <h4>Contact Us</h4>
                  <p>
                    For any questions or concerns regarding this Privacy Policy, contact us at <a href="mailto:contact@imagicity.in">contact@imagicity.in</a>,
                    IMAGICITY, Hazaribagh, Jharkhand, India.
                  </p>
                </li>
              </ol>
            </div>
          </details>

          <details>
            <summary>Terms and Conditions – Madooza</summary>
            <div className="legal-content">
              <p>
                <strong>Last Updated:</strong> October 2025
              </p>
              <ol>
                <li>
                  <h4>Acceptance of Terms</h4>
                  <p>
                    By visiting the Madooza website, registering, or attending the event, you agree to these Terms and Conditions. If
                    you do not agree, please refrain from participating.
                  </p>
                </li>
                <li>
                  <h4>Event Organizer</h4>
                  <p>Madooza is conceptualized and managed by IMAGICITY, headquartered in Hazaribagh, Jharkhand.</p>
                </li>
                <li>
                  <h4>Ticket Policy</h4>
                  <ul>
                    <li>Tickets once purchased are non-refundable and non-transferable.</li>
                    <li>Entry will be granted only to valid ticket holders.</li>
                    <li>Lost or damaged tickets will not be reissued.</li>
                    <li>Unauthorized resale of tickets is prohibited.</li>
                  </ul>
                </li>
                <li>
                  <h4>Payments</h4>
                  <ul>
                    <li>All ticket prices are in INR (Indian Rupees).</li>
                    <li>Payments are processed securely via third-party gateways.</li>
                    <li>IMAGICITY is not responsible for payment failures or delays due to user error or technical issues.</li>
                  </ul>
                </li>
                <li>
                  <h4>Entry and Security</h4>
                  <ul>
                    <li>Attendees must comply with on-ground security checks.</li>
                    <li>Outside food, alcohol, drugs, sharp objects, or hazardous materials are strictly banned.</li>
                    <li>IMAGICITY reserves the right to deny entry to any person for safety or disciplinary reasons.</li>
                  </ul>
                </li>
                <li>
                  <h4>Event Rules</h4>
                  <ul>
                    <li>Timings, artists, and schedules are subject to change without notice.</li>
                    <li>Any damage to property or venue caused by an attendee will result in liability and compensation.</li>
                    <li>The event may be recorded; by entering, you consent to being photographed or filmed for marketing use.</li>
                  </ul>
                </li>
                <li>
                  <h4>Vendor and Exhibitor Policy</h4>
                  <p>
                    Vendors, performers, or collaborators must adhere to the event’s operational guidelines and safety instructions. Non-
                    compliance may result in removal without refund.
                  </p>
                </li>
                <li>
                  <h4>Cancellation or Postponement</h4>
                  <p>
                    In case of cancellation due to weather, unforeseen circumstances, or government orders, IMAGICITY will not be
                    liable for refunds beyond what is feasible.
                  </p>
                </li>
                <li>
                  <h4>Limitation of Liability</h4>
                  <p>
                    IMAGICITY and its affiliates are not responsible for any injury, loss, or damage occurring at or during the event.
                    Entry and participation are at your own risk.
                  </p>
                </li>
                <li>
                  <h4>Intellectual Property</h4>
                  <p>
                    All event content, designs, and branding are owned by IMAGICITY. Reproduction or misuse is prohibited without
                    written consent.
                  </p>
                </li>
                <li>
                  <h4>Privacy</h4>
                  <p>Personal data collected during ticket purchase or registration is managed under our Privacy Policy.</p>
                </li>
                <li>
                  <h4>Governing Law</h4>
                  <p>All disputes are subject to the jurisdiction of Hazaribagh, Jharkhand, India.</p>
                </li>
                <li>
                  <h4>Contact</h4>
                  <p>
                    Reach us at <a href="mailto:contact@imagicity.in">contact@imagicity.in</a>, IMAGICITY, Hazaribagh, Jharkhand, India.
                  </p>
                </li>
              </ol>
            </div>
          </details>

          <details>
            <summary>Cancellation and Refund Policy – Madooza</summary>
            <div className="legal-content">
              <p>
                <strong>Last Updated:</strong> October 2025
              </p>
              <ol>
                <li>
                  <h4>Overview</h4>
                  <p>
                    This Cancellation and Refund Policy governs all payments made for participation in Madooza, organized by IMAGICITY,
                    Hazaribagh, Jharkhand. It applies to all ticket holders, stall vendors, and cosplay event participants. By making a
                    payment or registering for Madooza, you agree to these terms.
                  </p>
                </li>
                <li>
                  <h4>Ticket Purchases</h4>
                  <p>All general entry tickets purchased online through official Madooza platforms are final, non-refundable, and non-transferable.</p>
                  <ul>
                    <li>Once a ticket is booked, no cancellation or refund will be permitted for any reason, including change of plans, travel delays, or non-attendance.</li>
                    <li>Tickets cannot be transferred, exchanged, or used for any other event.</li>
                    <li>Any ticket obtained through unauthorized sources will be considered invalid.</li>
                    <li>Lost, stolen, or damaged tickets will not be replaced.</li>
                  </ul>
                  <p>
                    <strong>Reason:</strong> All infrastructure, venue arrangements, artist coordination, and event logistics are confirmed based on advance ticket sales. Hence,
                    refunds or cancellations are not feasible once the booking is completed.
                  </p>
                </li>
                <li>
                  <h4>Stall and Vendor Cancellations</h4>
                  <p>
                    Vendors or exhibitors who book stalls but later decide not to participate before the day of the event may be eligible for a partial refund, depending on the timing and reason for withdrawal.
                  </p>
                  <h5>Eligibility for Refund</h5>
                  <ul>
                    <li>A written cancellation request must be sent to <a href="mailto:madooza@imagicity.in">madooza@imagicity.in</a> from the registered email ID used during booking.</li>
                    <li>The email must include stall details, payment proof, and a valid reason for cancellation.</li>
                    <li>Requests made on or after the event day will not be eligible for refunds.</li>
                  </ul>
                  <h5>Refund Structure</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Time of Cancellation</th>
                        <th>Refund Percentage</th>
                        <th>Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>3 or more days before the event</td>
                        <td>70%</td>
                        <td>Subject to deduction of setup and promotion costs.</td>
                      </tr>
                      <tr>
                        <td>2 days before the event</td>
                        <td>50%</td>
                        <td>Partial refund, depending on preparation stage.</td>
                      </tr>
                      <tr>
                        <td>1 day before or on event day</td>
                        <td>0%</td>
                        <td>No refund, as allocations and logistics are finalized.</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>
                    Administrative and processing charges will be deducted from the refund amount. Final approval of any refund remains at the discretion of IMAGICITY management.
                  </p>
                  <h5>Refund Process</h5>
                  <ul>
                    <li>Approved refunds will be processed within 10–15 working days using the same payment method.</li>
                    <li>IMAGICITY will not be responsible for external bank or gateway delays.</li>
                  </ul>
                </li>
                <li>
                  <h4>Cosplay Event Participants</h4>
                  <p>Participants registering for the Cosplay Competition follow the same cancellation and refund terms as stall vendors.</p>
                  <h5>Cancellation and Refund Eligibility</h5>
                  <ul>
                    <li>Cancellation requests must be emailed to <a href="mailto:madooza@imagicity.in">madooza@imagicity.in</a> from the registered email ID.</li>
                    <li>The email should clearly mention the participant’s full name, registration ID, and valid reason for withdrawal.</li>
                    <li>Cancellations will only be accepted before the event day. Once the event day begins, no refund will be applicable.</li>
                  </ul>
                  <h5>Refund Structure</h5>
                  <table>
                    <thead>
                      <tr>
                        <th>Time of Cancellation</th>
                        <th>Refund Percentage</th>
                        <th>Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>3 or more days before event</td>
                        <td>70%</td>
                        <td>Refund possible after deduction of admin and processing costs.</td>
                      </tr>
                      <tr>
                        <td>2 days before event</td>
                        <td>50%</td>
                        <td>Refund may be partially approved based on preparation stage.</td>
                      </tr>
                      <tr>
                        <td>1 day before or on event day</td>
                        <td>0%</td>
                        <td>No refund. Participation fee will be forfeited.</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>
                    Refunds, if approved, will be processed within 10–15 working days. Management reserves full rights to deny refund requests made after deadlines or without valid justification.
                  </p>
                </li>
                <li>
                  <h4>Event Cancellation or Postponement</h4>
                  <p>
                    If Madooza is postponed or cancelled due to unavoidable situations such as government orders, extreme weather, or safety concerns:
                  </p>
                  <ul>
                    <li>All tickets, stall bookings, and cosplay registrations will automatically be carried forward to the rescheduled date.</li>
                    <li>If rescheduling is not possible, partial refunds may be processed after deducting unavoidable setup and marketing costs.</li>
                  </ul>
                  <p>
                    IMAGICITY will not be liable for travel, accommodation, or personal expenses incurred by participants or visitors.
                  </p>
                </li>
                <li>
                  <h4>No-Show Policy</h4>
                  <ul>
                    <li>Ticket holders, stall vendors, or cosplay participants who fail to attend the event on the scheduled day will be considered no-shows.</li>
                    <li>No-shows are not eligible for any refund or transfer of their booking.</li>
                  </ul>
                </li>
                <li>
                  <h4>Force Majeure</h4>
                  <p>
                    If Madooza is disrupted by events beyond IMAGICITY’s control (for example, natural calamities, power failures, lockdowns, or government restrictions), the organizers will not be obligated to issue refunds. Every effort will be made to provide alternative dates or arrangements.
                  </p>
                </li>
                <li>
                  <h4>Misuse and Refund Abuse Prevention</h4>
                  <p>IMAGICITY reserves the right to reject any refund request that appears fraudulent, repetitive, or unreasonable.</p>
                </li>
                <li>
                  <h4>Agreement</h4>
                  <p>
                    By purchasing a ticket, booking a stall, or registering for the cosplay event, you acknowledge that you have read, understood, and agreed to this Cancellation and Refund Policy.
                  </p>
                </li>
                <li>
                  <h4>Contact</h4>
                  <p>
                    For any queries regarding cancellations or refunds, email <a href="mailto:madooza@imagicity.in">madooza@imagicity.in</a> or write to IMAGICITY, Hazaribagh, Jharkhand, India.
                  </p>
                </li>
              </ol>
            </div>
          </details>
        </div>
      </footer>

      {renderModal()}
    </div>
  );
};

export default App;
