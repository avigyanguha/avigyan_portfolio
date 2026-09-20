import "../styles/sections/Footer.css";
import { InfiniteSlider } from "../ui/infinite-slider";

const NAME_REPEATS = 4;

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__gradient-line" />
      <div
        className="footer__circle footer__circle--top-left"
        aria-hidden="true"
      />
      <div
        className="footer__circle footer__circle--bottom-right"
        aria-hidden="true"
      />
      <div className="footer__quote">
        “If I’m gonna tell a real story, I’m gonna start with my name.”
        <span>~Kendrick Lamar</span>
      </div>
      <div className="footer__copyright">
        © 2026&nbsp;&nbsp;•&nbsp;&nbsp;AVIGYAN GUHA
      </div>
      <div className="footer__name-wrapper">
        <InfiniteSlider
          gap={0}
          speed={100}
          direction="horizontal"
          className="footer__name-slider"
        >
          {Array.from({ length: NAME_REPEATS }).map((_, i) => (
            <span key={i} className="footer__name">
              MADE BY AVIGYAN
            </span>
          ))}
        </InfiniteSlider>
      </div>
    </footer>
  );
}

export default Footer;
