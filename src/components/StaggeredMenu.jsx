import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './StaggeredMenu.css';

const MAX_PRELAYERS = 4;

const buildClassName = (...parts) => parts.filter(Boolean).join(' ');

export const StaggeredMenu = ({
  position = 'right',
  colors = ['#B19EEF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logoUrl = '/src/assets/logos/reactbits-gh-white.svg',
  menuButtonColor = '#fff',
  openMenuButtonColor = '#fff',
  accentColor = '#5227FF',
  changeMenuColorOnOpen = true,
  isFixed = false,
  onMenuOpen,
  onMenuClose,
  showLogo = true,
  onItemSelect,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);

  const prelayerColors = useMemo(() => {
    if (!colors || !colors.length) return ['#1e1e22', '#35353c'];
    const trimmed = colors.slice(0, MAX_PRELAYERS);
    if (trimmed.length >= 3) {
      const midpoint = Math.floor(trimmed.length / 2);
      trimmed.splice(midpoint, 1);
    }
    return trimmed;
  }, [colors]);

  const openMenu = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);
    onMenuOpen?.();
  }, [onMenuOpen]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    onMenuClose?.();
  }, [onMenuClose]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [closeMenu, openMenu]);

  useEffect(() => {
    if (!open) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeMenu, open]);

  const handleItemClick = useCallback(
    (event, item) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }

      const shouldPrevent = Boolean(item?.onClick || onItemSelect);
      if (shouldPrevent) {
        event.preventDefault();
      }

      if (item?.onClick) {
        item.onClick(item, event);
      }

      if (onItemSelect) {
        onItemSelect(item, event);
      }

      closeMenu();
    },
    [closeMenu, onItemSelect],
  );

  const buttonColor = changeMenuColorOnOpen && open ? openMenuButtonColor : menuButtonColor;
  const buttonLabel = open ? 'Close' : 'Menu';

  return (
    <div
      className={buildClassName(className, 'staggered-menu-wrapper', isFixed ? 'fixed-wrapper' : null)}
      style={accentColor ? { ['--sm-accent']: accentColor } : undefined}
      data-position={position}
      data-open={open || undefined}
    >
      <div className="sm-prelayers" aria-hidden="true">
        {prelayerColors.map((color, index) => (
          <div key={color + index} className="sm-prelayer" style={{ background: color }} />
        ))}
      </div>
      <header className={buildClassName('staggered-menu-header', showLogo ? null : 'no-logo')} aria-label="Main navigation header">
        {showLogo ? (
          <div className="sm-logo" aria-label="Logo">
            <img
              src={logoUrl || '/src/assets/logos/reactbits-gh-white.svg'}
              alt="Logo"
              className="sm-logo-img"
              draggable={false}
              width={110}
              height={24}
            />
          </div>
        ) : null}
        <button
          className="sm-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="staggered-menu-panel"
          onClick={toggleMenu}
          type="button"
          style={{ color: buttonColor }}
        >
          <span className="sm-toggle-text">{buttonLabel}</span>
          <span className="sm-icon" aria-hidden="true">
            <span className="sm-icon-bar" />
            <span className="sm-icon-bar" />
            <span className="sm-icon-bar" />
          </span>
        </button>
      </header>

      <aside id="staggered-menu-panel" className="staggered-menu-panel" aria-hidden={!open}>
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items && items.length ? (
              items.map((item, index) => (
                <li className="sm-panel-itemWrap" key={item.label + index}>
                  <a
                    className="sm-panel-item"
                    href={item.link || '#'}
                    aria-label={item.ariaLabel || item.label}
                    data-index={index + 1}
                    onClick={(event) => handleItemClick(event, item)}
                  >
                    <span className="sm-panel-itemLabel">{item.label}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="sm-panel-itemWrap" aria-hidden="true">
                <span className="sm-panel-item">
                  <span className="sm-panel-itemLabel">No items</span>
                </span>
              </li>
            )}
          </ul>
          {displaySocials && socialItems && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((social, index) => (
                  <li key={social.label + index} className="sm-socials-item">
                    <a href={social.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
