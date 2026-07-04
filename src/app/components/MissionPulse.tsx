const TAGS = [
  "Youth voices",
  "Global policy",
  "Awareness",
  "Engagement",
  "Sustainability",
  "Inclusion",
  "Climate action",
  "Education",
];

const LOOP = [...TAGS, ...TAGS];

export function MissionPulse() {
  return (
    <section className="mission-ribbon" aria-label="GYSC global mission">
      <div className="container mission-ribbon-inner">
        <p className="mission-ribbon-lead">
          <span className="mission-ribbon-mark" aria-hidden />
          Members from countries around the world
        </p>
        <div className="mission-ribbon-track" aria-hidden>
          <div className="mission-ribbon-scroll">
            {LOOP.map((tag, i) => (
              <span key={`${tag}-${i}`} className="mission-ribbon-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
