import "../styles/sections/Skills.css";
import SkillCard from "../components/SkillCard";
import { skills } from "../data/skills";

function Skills() {
  return (
    <section id="skills" className="skills">
      {/* Decorative background shapes */}
      <div className="skills__shape skills__shape--green" />
      <div className="skills__shape skills__shape--yellow" />
      <div className="skills__shape skills__shape--pink" />

      <div className="skills__container">
        {/* Section heading */}
        <div className="skills__heading">
          <h2 className="skills__title">Technical Skills.</h2>
          <span className="skills__underline" />
        </div>
        {/* Skills grid */}
        <div className="skills__grid">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;