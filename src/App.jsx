import { useEffect, useMemo, useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import FormPage from './components/FormPage.jsx';

const sectionIds = ['hero', 'about', 'involve', 'guests', 'partners', 'contact'];

const forms = {
  '/tickets': {
    heading: 'Buy Ticket',
    description:
      'Grab your pass to the wildest creative showcase in Hazaribagh. Fill in your details and secure your ₹20 ticket.',
    cta: 'Submit Details',
    payment: { amount: 20, successText: 'Ticket Booked' },
    fields: [
      { name: 'name', placeholder: 'Name', type: 'text', required: true },
      { name: 'email', placeholder: 'Email', type: 'email', required: true },
      { name: 'phone', placeholder: 'Phone', type: 'tel', required: true },
    ],
  },
  '/stall': {
    heading: 'Book Your Stall',
    description:
      'Claim a premium stall to showcase your brand, art, or culinary magic. Limited slots to keep the experience elevated.',
    cta: 'Submit Application',
    payment: { amount: 2500, successText: 'Stall Reserved' },
    fields: [
      { name: 'brand', placeholder: 'Brand / Project Name', type: 'text', required: true },
      { name: 'contact', placeholder: 'Primary Contact Name', type: 'text', required: true },
      { name: 'email', placeholder: 'Email', type: 'email', required: true },
      { name: 'phone', placeholder: 'Phone', type: 'tel', required: true },
      { name: 'description', placeholder: 'What will you showcase?', type: 'textarea', required: true },
    ],
  },
  '/sponsor': {
    heading: 'Become a Sponsor',
    description:
      'Let’s collaborate on unforgettable experiences. Tell us about your brand and we’ll curate the right partnership tier.',
    cta: 'Share Interest',
    fields: [
      { name: 'brand', placeholder: 'Brand Name', type: 'text', required: true },
      { name: 'contact', placeholder: 'Contact Person', type: 'text', required: true },
      { name: 'email', placeholder: 'Email', type: 'email', required: true },
      { name: 'phone', placeholder: 'Phone', type: 'tel', required: true },
      { name: 'goals', placeholder: 'Partnership goals', type: 'textarea', required: true },
    ],
  },
  '/volunteer': {
    heading: 'Become a Volunteer',
    description:
      'Step into the core team and help us orchestrate the madness. Tell us how you want to contribute.',
    cta: 'Sign Up',
    fields: [
      { name: 'name', placeholder: 'Full Name', type: 'text', required: true },
      { name: 'email', placeholder: 'Email', type: 'email', required: true },
      { name: 'phone', placeholder: 'Phone', type: 'tel', required: true },
      { name: 'skills', placeholder: 'Skills / Interests', type: 'textarea', required: true },
    ],
  },
};

const App = () => {
  const [currentPath, setCurrentPath] = useState(() => window.location.pathname || '/');
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingScroll, setPendingScroll] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setMenuOpen(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPath !== '/') return undefined;

    const observers = [];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          threshold: 0.4,
        }
      );
      observer.observe(element);
      observers.push({ observer, element });
    });

    return () => {
      observers.forEach(({ observer, element }) => observer.unobserve(element));
    };
  }, [currentPath]);

  useEffect(() => {
    if (pendingScroll && currentPath === '/') {
      const element = document.getElementById(pendingScroll);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setPendingScroll(null);
      }
    }
  }, [pendingScroll, currentPath]);

  useEffect(() => {
    if (currentPath !== '/' && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPath]);

  const navigate = (path) => {
    const safePath = path.startsWith('/') ? path : `/${path}`;
    if (window.location.pathname !== safePath) {
      window.history.pushState({}, '', safePath);
    }
    setCurrentPath(safePath);
    setMenuOpen(false);
  };

  const goToSection = (id) => {
    if (currentPath !== '/') {
      setPendingScroll(id);
      navigate('/');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navItems = useMemo(
    () => [
      { label: 'Home', target: 'hero' },
      { label: 'About', target: 'about' },
      { label: 'Involve', target: 'involve' },
      { label: 'Guests', target: 'guests' },
      { label: 'Partners', target: 'partners' },
      { label: 'Contact', target: 'contact' },
    ],
    []
  );

  const renderPage = () => {
    if (currentPath === '/') {
      return <LandingPage onNavigate={navigate} activeSection={activeSection} />;
    }

    if (forms[currentPath]) {
      const { heading, description, fields, cta, payment } = forms[currentPath];
      return (
        <FormPage
          key={currentPath}
          heading={heading}
          description={description}
          fields={fields}
          cta={cta}
          payment={payment}
          onBack={() => navigate('/')}
        />
      );
    }

    navigate('/');
    return null;
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-inner">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '1.2rem', letterSpacing: '0.24em' }}>MADOOZA</strong>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.4em', color: 'var(--text-muted)' }}>
                The Sound of Pure Madness
              </span>
            </div>
            <div className="nav-links">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  type="button"
                  className={activeSection === item.target ? 'active' : ''}
                  onClick={() => goToSection(item.target)}
                >
                  {item.label}
                </button>
              ))}
              <button type="button" className="btn" onClick={() => navigate('/tickets')}>
                Buy Ticket – ₹20
              </button>
            </div>
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation"
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              ☰
            </button>
          </div>
          {menuOpen && (
            <div className="mobile-menu">
              {navItems.map((item) => (
                <button key={item.target} type="button" onClick={() => goToSection(item.target)}>
                  {item.label}
                </button>
              ))}
              <button type="button" onClick={() => navigate('/tickets')}>
                Buy Ticket – ₹20
              </button>
            </div>
          )}
        </div>
      </nav>
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;
