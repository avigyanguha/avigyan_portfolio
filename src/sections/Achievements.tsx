import "../styles/sections/Achievements.css";
import AchievementCard from "../components/AchievementCard";
import { achievements } from "../data/Achievements";
import { InView } from "@/ui/in-view";

function Achievements() {
    return (
        <section id="achievements" className="achievements">
            <div className="achievements__blob achievements__blob--green" />
            <div className="achievements__blob achievements__blob--yellow" />
            <div className="achievements__blob achievements__blob--pink" />

            <InView
                once
                variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                viewOptions={{ once: true, amount: 0.3 }}
            >
                <div className="achievements_heading">
                    <h2 className="achievements__title">
                        Achievements
                    </h2>
                    <span className="achievements__underline" />
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
                <div className="achievements__grid">
                    {achievements.map((achievement) => (
                        <AchievementCard
                            key={`${achievement.title}-${achievement.date}`}
                            achievement={achievement}
                        />
                    ))}
                </div>
            </InView>
        </section>
    );
}

export default Achievements;