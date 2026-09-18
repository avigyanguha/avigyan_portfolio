import "../styles/sections/Volunteering.css";
import OrganizationCard from "../components/OrganizationCard";
import { organizations } from "../data/organizations";
import { InView } from "@/ui/in-view";

function Volunteering() {
  return (
    <section id="volunteering" className="volunteering">
      {/* Background ambient glows */}
      <div className="volunteering__glow volunteering__glow--lime" />
      <div className="volunteering__glow volunteering__glow--yellow" />
      <div className="volunteering__glow volunteering__glow--pink" />

      <div className="volunteering__container">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewOptions={{ once: true, amount: 0.3 }}
        >
          <div className="volunteering__heading">
            <h2>Volunteering</h2>

            <span className="volunteering__heading-line" />
          </div>
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
          <div className="volunteering__cards">
            {organizations.map((organization) => (
              <OrganizationCard
                key={`${organization.name}-${organization.role}`}
                organization={organization}
              />
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}

export default Volunteering;