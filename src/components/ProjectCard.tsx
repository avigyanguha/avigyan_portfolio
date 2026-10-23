import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.58 2 12.23c0 4.51 2.87 8.34 6.84 9.69.5.1.68-.22.68-.49v-1.91c-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .08 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.94a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.89v2.79c0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="M27.5 28.5 20 21c3.4-7.9 10.1-12 19-12-.1 8.9-4.2 15.6-11.5 19.5Z" />
      <path d="m20 21-7.5.5-4 4L19 29m8.5-.5L27 36l-4 4-3.5-10.5" />
      <circle cx="30.5" cy="17.5" r="3" />
      <path d="M14.5 32.5c-3.1.8-5.2 2.9-6 6 3.1-.8 5.2-2.9 6-6Z" />
    </svg>
  );
}

function ProjectCard({
  project,
  reverse = false,
}: ProjectCardProps) {
  return (
    <article
      className={`project-card ${
        reverse ? "project-card--reverse" : ""
      }`}
    >
      <div className="project-image-wrapper">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="project-image"
        />
      </div>

      <div className="project-content">
        <div className="project-text">
          <h2 className="project-title">{project.title}</h2>

          <p className="project-description">
            {project.description}
          </p>
        </div>

        <div className="project-actions">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-button project-action-button--github"
            aria-label={`Open ${project.title} GitHub repository`}
          >
            <GitHubIcon />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-button project-action-button--demo"
            aria-label={`Open ${project.title} live demo`}
          >
            <RocketIcon />
          </a>
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;