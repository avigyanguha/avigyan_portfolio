import "../styles/sections/Hero.css";
import { TextEffect } from "@/ui/text-effect";
import { motion } from "motion/react";

const ArrowUpRightIcon = () => (
  <svg
    className="hero__contact-arrow"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M7 17L17 7M9 7H17V15"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="hero__social-icon"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.94 8.5A1.94 1.94 0 1 0 6.94 4.62 1.94 1.94 0 0 0 6.94 8.5ZM5.3 9.9h3.28V20H5.3V9.9Zm5.34 0h3.14v1.38h.04c.44-.83 1.51-1.7 3.11-1.7 3.33 0 3.95 2.19 3.95 5.04V20h-3.28v-4.77c0-1.14-.02-2.6-1.58-2.6-1.59 0-1.83 1.24-1.83 2.52V20h-3.28V9.9Z" />
  </svg>
);

const GitHubIcon = () => (
  <svg
    className="hero__social-icon"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.36 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.35 1.12 2.92.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.05 1.03-2.78-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.3 9.3 0 0 1 12 6.05c.85 0 1.71.12 2.51.35 1.91-1.34 2.75-1.06 2.75-1.06.55 1.43.2 2.49.1 2.75.64.73 1.03 1.65 1.03 2.78 0 3.97-2.35 4.85-4.58 5.1.36.32.68.93.68 1.88 0 1.36-.01 2.45-.01 2.79 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
  </svg>
);

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__background" aria-hidden="true" />

      <div className="hero__content">
        <div className="hero__text-group">

          {/* HERO TITLE */}
          <TextEffect
            as="h1"
            className="hero__title"
            preset="slide"
            per="char"
            speedReveal={1}
            speedSegment={1}
          >
            HI, I AM AVIGYAN GUHA.
          </TextEffect>

          {/* DESCRIPTION */}
          <TextEffect
            as="p"
            className="hero__description"
            preset="fade-in-blur"
            per="word"
            delay={0.45}
          >
            I build focused frontend experiences and am growing toward full-stack
            development through practical, deliberate work.
          </TextEffect>

        </div>

        {/* BUTTONS */}
        <motion.div
          className="hero__actions"
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: 1.2,
            ease: "easeOut",
          }}
        >
          <a
            href="#contact"
            className="hero__contact-button"
          >
            <span className="hero__contact-text">
              Contact Me
            </span>

            <span className="hero__contact-icon">
              <ArrowUpRightIcon />
            </span>
          </a>

          <a
            href="https://www.linkedin.com/in/avigyan-guha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-button"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>

          <a
            href="https://github.com/avigyanguha"
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-button"
            aria-label="GitHub"
          >
            <GitHubIcon />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;