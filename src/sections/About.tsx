import '../styles/sections/About.css';

interface AboutProps {
  resumeUrl?: string;
  onDownloadResume?: () => void;
}

const About: React.FC<AboutProps> = ({
  resumeUrl = '/Avigyan_Guha_Resume.pdf',
  onDownloadResume,
}) => {
  return (
    <section id="about" className="about-section">
      <div className="about-background" />

      <div className="about-container">
        <header className="about-heading-wrapper">
          <h2 className="about-title">Curious by default.</h2>
          <div className="about-title-line" />
        </header>

        <p className="about-description">
          I am a 3rd Year Computer Science Engineering undergraduate at
          Siliguri Institute of Technology. I am currently focused on frontend
          development and building practical projects using modern web
          technologies. Alongside developing my technical skills, I am learning
          modern development workflows and gradually expanding my knowledge
          toward full-stack development.
        </p>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onDownloadResume}
          className="resume-button"
          aria-label="View resume"
        >
          <span>Resume</span>
          <svg
            className="resume-download-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 35 35"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M30.625 21.875V27.7083C30.625 28.4819 30.3177 29.2237 29.7707 29.7707C29.2237 30.3177 28.4819 30.625 27.7083 30.625H7.29167C6.51812 30.625 5.77625 30.3177 5.22927 29.7707C4.68229 29.2237 4.375 28.4819 4.375 27.7083V21.875M24.7917 14.5833L17.5 21.875L10.2083 14.5833M17.5 21.875V4.375"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default About;