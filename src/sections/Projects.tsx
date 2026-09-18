import "../styles/sections/Projects.css";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";
import { InView } from '@/ui/in-view';

function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-inner">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <h1 className="projects-heading">Projects.</h1>
          <div className="projects-title-line" />
        </InView>

        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.2 }}
        >
          <div className="projects-list">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                reverse={index % 2 !== 0}
              />
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}

export default Projects;