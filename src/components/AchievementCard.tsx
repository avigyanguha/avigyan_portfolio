import type { Achievement } from "../types";

interface AchievementCardProps {
  achievement: Achievement;
}

function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <article className="achievement-card">
      <h3 className="achievement-card__title">
        {achievement.title}
      </h3>

      <div className="achievement-card__details">
        <p className="achievement-card__organization">
          {achievement.organization}
        </p>

        <p className="achievement-card__date">
          {achievement.date}
        </p>
      </div>
    </article>
  );
}

export default AchievementCard;