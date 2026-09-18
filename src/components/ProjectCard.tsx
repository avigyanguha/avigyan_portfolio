import type { Project } from "../types";

interface ProjectCardProps {
  project: Project;
  reverse?: boolean;
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

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="project-github-button"
        >
          GitHub Link →
        </a>
      </div>
    </article>
  );
}

export default ProjectCard;