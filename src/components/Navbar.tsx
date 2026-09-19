import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import "../styles/components/Navbar.css";

const links = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Volunteering", id: "volunteering" },
  { name: "Achievements", id: "achievements" },
  { name: "Contact", id: "contact" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoverPill, setHoverPill] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    visible: false,
  });

  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (const link of links) {
        const section = document.getElementById(link.id);

        if (
          section &&
          scrollPosition >= section.offsetTop &&
          scrollPosition < section.offsetTop + section.offsetHeight
        ) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavigation = (id: string) => {
    setIsMenuOpen(false);

    const section = document.getElementById(id);

    if (section) {
      const navbarOffset = 100;

      const sectionPosition =
        section.getBoundingClientRect().top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      });
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const moveHoverPill = (link: HTMLButtonElement) => {
    const container = linksRef.current;

    if (!container) {
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    setHoverPill({
      left: linkRect.left - containerRect.left,
      top: linkRect.top - containerRect.top,
      width: linkRect.width,
      height: linkRect.height,
      visible: true,
    });
  };

  const handleLinkMouseEnter = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    moveHoverPill(event.currentTarget);
  };

  const handleLinksMouseLeave = () => {
    setHoverPill((current) => ({
      ...current,
      visible: false,
    }));
  };

  return (
    <>
      <header
        className={`navbar-wrapper ${isScrolled ? "navbar-wrapper--scrolled" : ""
          }`}
      >
        <nav className="navbar">
          <button
            type="button"
            className="navbar-logo"
            onClick={handleLogoClick}
            aria-label="Go to top of page"
          >
            AG<span>.</span>
          </button>

          <div
            className="navbar-links"
            ref={linksRef}
            onMouseLeave={handleLinksMouseLeave}
          >
            <span
              className={`navbar-hover-pill${hoverPill.visible ? " navbar-hover-pill--visible" : ""
                }`}
              style={{
                transform: `translate(${hoverPill.left}px, ${hoverPill.top}px)`,
                width: hoverPill.width,
                height: hoverPill.height,
              }}
              aria-hidden="true"
            />

            {links.map((link) => (
              <button
                type="button"
                key={link.id}
                className={`navbar-link ${activeSection === link.id ? "navbar-link--active" : ""
                  }`}
                onClick={() => handleNavigation(link.id)}
                onMouseEnter={handleLinkMouseEnter}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="navbar-menu-button"
            onClick={() => setIsMenuOpen((previous) => !previous)}
            aria-label={
              isMenuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      <div
        className={`mobile-navbar ${isMenuOpen ? "mobile-navbar--open" : ""
          }`}
      >
        <div className="mobile-navbar-links">
          {links.map((link, index) => (
            <button
              type="button"
              key={link.id}
              className={`mobile-navbar-link ${activeSection === link.id
                  ? "mobile-navbar-link--active"
                  : ""
                }`}
              style={{
                transitionDelay: isMenuOpen
                  ? `${index * 60}ms`
                  : "0ms",
              }}
              onClick={() => handleNavigation(link.id)}
            >
              <span>0{index + 1}</span>
              {link.name}
            </button>
          ))}
        </div>

        <div className="mobile-navbar-footer">
          <p>AVIGYAN GUHA</p>
          <span>PORTFOLIO © 2026</span>
        </div>
      </div>
    </>
  );
}

export default Navbar;