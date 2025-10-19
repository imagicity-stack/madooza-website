import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import CosplayPage from './pages/CosplayPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsConditionsPage from './pages/TermsConditionsPage';
import CancellationRefundPage from './pages/CancellationRefundPage';
import MagicBento from './components/MagicBento';
import StaggeredMenu from './components/StaggeredMenu';
import Ribbons from './components/effects/Ribbons';

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
    id: 'cosplay',
    title: 'Cosplay Arena',
    label: 'Cosplay',
    copy: 'Suit up, embody your alter ego, and storm the MAD Parade runway.',
    color: '#ffe066',
    textColor: '#201500',
  },
  {
    id: 'cafe',
    title: 'MAD Cafe',
    label: 'Cafe',
    copy: 'Sip neon brews, dessert experiments, and collab pop-ups with local chefs.',
    color: '#ffd6a5',
    textColor: '#2a1600',
  },
  {
    id: 'expo',
    title: 'Innovation Expo',
    label: 'Expo',
    copy: 'Hands-on showcases from makers, startups, and interactive tech labs.',
    color: '#bde0fe',
    textColor: '#001b2c',
  },
  {
    id: 'exhibition',
    title: 'Art Exhibition',
    label: 'Exhibition',
    copy: 'Immersive art tunnels, projection rooms, and creator installations.',
    color: '#cdb4db',
    textColor: '#2b1035',
  },
  {
    id: 'dj',
    title: 'DJ Nights',
    label: 'DJ',
    copy: 'Nightfall basslines from guest DJs turning the grounds into a rave.',
    color: '#ffadad',
    textColor: '#3a0a00',
  },
  {
    id: 'dance',
    title: 'Dance Battles',
    label: 'Dance',
    copy: 'Crew battles, cyphers, and open-floor madness till the lights go out.',
    color: '#caffbf',
    textColor: '#053317',
  },
];

const RazorpayButton = ({ paymentButtonId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !paymentButtonId) return;

    container.innerHTML = '';
    const form = document.createElement('form');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.async = true;
    script.dataset.payment_button_id = paymentButtonId;
    form.appendChild(script);
    container.appendChild(form);

    return () => {
      container.innerHTML = '';
    };
  }, [paymentButtonId]);

  return <div className="razorpay-button" ref={containerRef} />;
};

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
      <div className="festival-bento-wrapper">
        <MagicBento
          items={festivalItems}
          glowColor="255, 213, 0"
          enableSpotlight
          enableBorderGlow
          enableTilt
          enableMagnetism
        />
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
    payment: 30,
    paymentScriptId: 'pl_RVIYQFpD1UhxMg',
    fields: [],
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

const legalPaths = ['/privacy-policy', '/terms-and-conditions', '/cancellation-refund-policy'];

const getInitialRoute = () => {
  if (typeof window === 'undefined') {
    return { path: '/', hash: '' };
  }
  const { pathname, hash } = window.location;
  return { path: pathname || '/', hash: hash || '' };
};

const App = () => {
  const [route, setRoute] = useState(getInitialRoute);
  const [activeModal, setActiveModal] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [paymentState, setPaymentState] = useState({});
  const isHomeView = route.path === '/';
  const isCosplayView = route.path === '/cosplay';
  const isLegalPage = legalPaths.includes(route.path);

  const legalComponent = useMemo(() => {
    switch (route.path) {
      case '/privacy-policy':
        return <PrivacyPolicyPage />;
      case '/terms-and-conditions':
        return <TermsConditionsPage />;
      case '/cancellation-refund-policy':
        return <CancellationRefundPage />;
      default:
        return null;
    }
  }, [route.path]);

  const navigateTo = useCallback((path, hash = '') => {
    if (typeof window === 'undefined') return;
    const normalizedHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
    const nextUrl = `${path}${normalizedHash}`;
    window.history.pushState({ path, hash: normalizedHash }, '', nextUrl);
    setRoute({ path, hash: normalizedHash });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const updateView = useCallback(
    (view, hash) => {
      if (view === 'cosplay') {
        navigateTo('/cosplay');
      } else {
        navigateTo('/', hash || '');
      }
    },
    [navigateTo]
  );

  useEffect(() => {
    if (isCosplayView || isLegalPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (isHomeView) {
      if (route.hash) {
        const target = document.querySelector(route.hash);
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 120);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [isCosplayView, isHomeView, isLegalPage, route.hash, route.path]);

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

  const handleLegalNavigate = useCallback(
    (event, path) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      event.preventDefault();
      navigateTo(path);
    },
    [navigateTo]
  );

  const handleMenuOpen = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.add('no-scroll');
  }, []);

  const handleMenuClose = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.body.classList.remove('no-scroll');
  }, []);

  useEffect(
    () => () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('no-scroll');
      }
    },
    [],
  );

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
  }, [route.path]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openModal = useCallback((id) => {
    setActiveModal(id);
    setPaymentState((prev) => ({ ...prev, [id]: 'idle' }));
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
  }, []);

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

  const mobileMenuItems = useMemo(
    () => [
      {
        label: 'Home',
        link: '#hero',
        ariaLabel: 'Go to the hero section',
        onClick: () => updateView('home', '#hero'),
      },
      ...navLinks.map((link) => ({
        label: link.label,
        link: link.href,
        ariaLabel: `Jump to the ${link.label} section`,
        onClick: () => updateView('home', link.href),
      })),
      {
        label: 'Cosplay',
        link: '/cosplay',
        ariaLabel: 'Open the Cosplay page',
        onClick: handleCosplayNavigate,
      },
      {
        label: 'Buy Pass ₹30',
        link: '#tickets',
        ariaLabel: 'Open the ticket booking modal',
        onClick: () => openModal('tickets'),
      },
    ],
    [handleCosplayNavigate, navLinks, openModal, updateView],
  );

  const mobileSocialItems = useMemo(
    () => [
      { label: 'Instagram', link: 'https://instagram.com' },
      { label: 'Facebook', link: 'https://facebook.com' },
      { label: 'Email', link: 'mailto:info@madooza.com' },
    ],
    [],
  );

  const renderModal = () => {
    if (!activeModal) return null;
    const config = modalConfigs[activeModal];
    if (!config) return null;
    const hasPaymentScript = Boolean(config.paymentScriptId);
    const status = hasPaymentScript ? 'idle' : paymentState[activeModal] || 'idle';

    return (
      <div className="modal-backdrop" role="dialog" aria-modal="true">
        <div className="modal-card">
          <button className="modal-close" type="button" onClick={closeModal} aria-label="Close form">
            ×
          </button>
          <h3>{config.heading}</h3>
          <p className="modal-blurb">{config.blurb}</p>
          {hasPaymentScript ? (
            <div className="modal-payment">
              {config.payment ? <p className="modal-price">Festival Pass: ₹{config.payment}</p> : null}
              <RazorpayButton paymentButtonId={config.paymentScriptId} />
              <p className="modal-note">Secure checkout opens in a Razorpay window.</p>
            </div>
          ) : status === 'success' ? (
            <div className="modal-success">
              <h4>We've got your details!</h4>
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
      <Ribbons baseThickness={30} colors={['#FFD400']} speedMultiplier={0.5} maxAge={500} />
      <StaggeredMenu
        className="nav-mobile-menu"
        position="right"
        colors={['#FF4D6D', '#C9184A', '#FFB3C1']}
        items={mobileMenuItems}
        socialItems={mobileSocialItems}
        displaySocials
        displayItemNumbering
        menuButtonColor="#ffffff"
        openMenuButtonColor="#ffd400"
        accentColor="#ffd400"
        changeMenuColorOnOpen
        logoUrl="/madooza-logo.svg"
        showLogo={false}
        isFixed
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
      />
      <nav className="navbar">
        <div className="nav-inner">
          <a className="logo" href="/" onClick={handleLogoClick}>
            <img src="/madooza-logo.svg" alt="Madooza" />
          </a>
          <div className="nav-links nav-links-desktop">
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
            <a
              href="/cosplay"
              className="nav-link"
              onClick={(event) => {
                event.preventDefault();
                handleCosplayNavigate();
              }}
            >
              Cosplay
            </a>
          </div>
        </div>
      </nav>

      {isHomeView && (
        <header id="hero" className="hero-section parallax">
          <div className="hero-content">
            <h1 className="hero-title">MADOOZA – THE SOUND OF PURE MADNESS</h1>
            <p className="hero-subtext">Hazaribagh's first youth cultural carnival.</p>
            <button className="neon-button button-pulse" type="button" onClick={() => openModal('tickets')}>
              Book Your Pass ₹30
            </button>
          </div>
        </header>
      )}

      {isHomeView && (
        <section className="ticker" aria-hidden="true">
          <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
          <div className="item">Food · Art · Dance · Cosplay · Music · Street Culture · Neon Nights</div>
        </section>
      )}

      <main>
        {isCosplayView ? (
          <CosplayPage onBack={() => updateView('home')} onProceed={() => openModal('cosplayRegistration')} />
        ) : legalComponent ? (
          legalComponent
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
          <span className="footer-legals-label">Legals</span>
          <div className="footer-legal-links">
            <a href="/privacy-policy" onClick={(event) => handleLegalNavigate(event, '/privacy-policy')}>
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" onClick={(event) => handleLegalNavigate(event, '/terms-and-conditions')}>
              Terms &amp; Conditions
            </a>
            <a
              href="/cancellation-refund-policy"
              onClick={(event) => handleLegalNavigate(event, '/cancellation-refund-policy')}
            >
              Cancellation &amp; Refund Policy
            </a>
          </div>
        </div>
      </footer>

      {renderModal()}
    </div>
  );
};

export default App;
