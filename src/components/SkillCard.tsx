import type { Skill } from "../data/skills";
import { SpotlightBorder } from "../ui/card_spotlight";

interface SkillCardProps {
  skill: Skill;
}

function SkillCard({ skill }: SkillCardProps) {
  return (
    <article className="skill-card">
      <SpotlightBorder />

      <div className="skill-card__icon-wrapper">
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          className="skill-card__icon"
        />
      </div>

      <span className="skill-card__name">{skill.name}</span>
    </article>
  );
}

export default SkillCard;