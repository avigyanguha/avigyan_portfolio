import "../styles/sections/Skills.css";
import SkillCard from "../components/SkillCard";
import { skills } from "../data/skills";
import { InView } from "@/ui/in-view";

function Skills() {
  return (
    <section id="skills" className="skills">
      {/* Decorative background shapes */}
      <div className="skills__shape skills__shape--green" />
      <div className="skills__shape skills__shape--yellow" />
      <div className="skills__shape skills__shape--pink" />

      <div className="skills__container">
        {/* Section heading */}
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <div className="skills__heading">
            <h2 className="skills__title">Technical Skills.</h2>
            <span className="skills__underline" />
          </div>
        </InView>

        {/* Skills grid */}
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.2 }}
        >
          <div className="skills__grid">
            {skills.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}

export default Skills;