import type { Organization } from "../types";
import { Spotlight } from "../ui/card_spotlight";

interface OrganizationCardProps {
  organization: Organization;
}
function OrganizationCard({ organization }: OrganizationCardProps) {
  return (
    <article className="organization-card" data-spotlight-container>
      <div className="organization-card__spotlight-border">
        <Spotlight
          className="from-blue-600 via-blue-500 to-blue-400 blur-3xl dark:from-blue-200 dark:via-blue-300 dark:to-blue-400"
          size={124}
          parentSelector="[data-spotlight-container]"
        />
        <div className="organization-card__spotlight-surface" />
      </div>

      <a
        className="organization-card__logo-link"
        href="https://www.linkedin.com/company/computer-engineers-society-sit"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Computer Engineers' Society on LinkedIn"
      >
        <img
          className="organization-card__logo"
          src={organization.logo}
          alt={`${organization.name} logo`}
        />
      </a>

      <div className="organization-card__content">
        {/* LEFT COLUMN */}
        <div className="organization-card__left">
          <h3 className="organization-card__name">
            {organization.name}
          </h3>

          <p className="organization-card__period">
            {organization.period}
          </p>
        </div>

        {/* DIVIDER */}
        <div className="organization-card__divider" />

        {/* RIGHT COLUMN */}
        <div className="organization-card__right">
          <h4 className="organization-card__role">
            {organization.role}
          </h4>

          <p className="organization-card__description">
            {organization.description}
          </p>

          <div className="organization-card__tags">
            {organization.tags.map((tag) => (
              <span key={tag} className="organization-card__tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default OrganizationCard;