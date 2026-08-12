import { useEffect, useMemo, useState } from 'react';
import {
  TREATMENT_GOALS,
  TREATMENTS,
  getGoalForTreatment,
} from '../start/startFlowData.js';

const TONE_BY_GOAL = {
  'weight-loss': 'wl',
  longevity: 'aa',
  'muscle-recovery': 'mr',
};

/**
 * Yucca home treatments geometry (tonal stage + tablist + product card).
 * Pax colors / copy / imagery. Weight Loss keeps Semaglutide / Tirzepatide picker.
 */
export default function YuccaTreatmentsSection({
  selectedTx,
  setSelectedTx,
  openStart,
  heading = 'Personalized treatments to help achieve your goals',
  subheading = 'Build a custom health plan by starting with a goal below.',
  className = '',
  style,
  showMedPicker = true,
}) {
  const [goalId, setGoalId] = useState(() => getGoalForTreatment(selectedTx).id);

  const goal = useMemo(
    () => TREATMENT_GOALS.find((g) => g.id === goalId) || TREATMENT_GOALS[0],
    [goalId],
  );

  const medOptions = useMemo(
    () => TREATMENTS.filter((t) => goal.treatmentIds.includes(t.id)),
    [goal],
  );

  const selected = useMemo(() => {
    const inGoal = medOptions.find((t) => t.id === selectedTx);
    return inGoal || medOptions[0] || TREATMENTS[0];
  }, [medOptions, selectedTx]);

  useEffect(() => {
    if (!goal.treatmentIds.includes(selectedTx)) {
      setSelectedTx(goal.defaultTreatmentId);
    }
  }, [goal, selectedTx, setSelectedTx]);

  const selectGoal = (nextGoalId) => {
    const next = TREATMENT_GOALS.find((g) => g.id === nextGoalId) || TREATMENT_GOALS[0];
    setGoalId(next.id);
    setSelectedTx(next.defaultTreatmentId);
  };

  const tone = TONE_BY_GOAL[goal.id] || 'wl';
  const enrolled =
    goal.id === 'weight-loss' ? '1,000+ patients enrolled in the last 7 days' : '100+ patients enrolled in the last 7 days';

  return (
    <section
      className={`yxr-rtt ${className}`.trim()}
      id="treatments-home"
      data-tone={tone}
      style={style}
    >
      <div className="yxr-rtt__bg" aria-hidden="true" />

      <div className="yxr-rtt__head">
        <h2>{heading}</h2>
        <p>{subheading}</p>
      </div>

      <div className="yxr-rtt__tabs" role="tablist" aria-label="Treatment goals">
        {TREATMENT_GOALS.map((g) => {
          const active = g.id === goal.id;
          const tabTone = TONE_BY_GOAL[g.id];
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={active}
              data-tone={tabTone}
              className={`yxr-rtt__tab ${active ? 'is-active' : ''}`}
              onClick={() => selectGoal(g.id)}
            >
              <span className="yxr-rtt__tab-label">{g.label}</span>
              <img className="yxr-rtt__tab-img" src={g.image} alt="" aria-hidden="true" />
            </button>
          );
        })}
      </div>

      <div className="yxr-rtt__panes">
        <div className="yxr-rtt__pane is-active" data-tone={tone}>
          <div className="yxr-rtt__photos" aria-hidden="true">
            {/* Intentionally empty on small viewports; desktop uses soft stage only — no misplaced framed photos */}
          </div>

          <article className="yxr-rtt__card">
            <div className="yxr-rtt__tags">
              <div className="yxr-rtt__tag-group">
                <span className={`yxr-rtt__chip yxr-rtt__chip--tone`}>{goal.label}</span>
                <span className="yxr-rtt__chip yxr-rtt__chip--seller">Best Seller</span>
              </div>
            </div>

            <div className="yxr-rtt__product">
              <div className="yxr-rtt__reviews">
                <p className="yxr-rtt__enrolled">{enrolled}</p>
                <div className="yxr-rtt__stars" aria-label="4.7 out of 5 stars">
                  <span aria-hidden="true">★★★★★</span>
                  <strong>4.7</strong>
                </div>
                <p className="yxr-rtt__reviews-count">(1,000+ reviews)</p>
              </div>

              <div className="yxr-rtt__vials">
                <img src={goal.image} alt="" loading="lazy" />
              </div>
            </div>

            <div className="yxr-rtt__copy">
              <p className="yxr-rtt__eyebrow">{goal.eyebrow}</p>
              <h3>{goal.title}</h3>
              <p className="yxr-rtt__blurb">{goal.blurb}</p>

              {showMedPicker && goal.hasMedPicker && (
                <div className="yxr-rtt__meds" role="radiogroup" aria-label="Choose medication">
                  {medOptions.map((t) => {
                    const active = selected.id === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        className={`yxr-rtt__med ${active ? 'is-active' : ''}`}
                        onClick={() => setSelectedTx(t.id)}
                      >
                        <strong>{t.pathway}</strong>
                        <span>{t.tagline}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="yxr-rtt__cta">
              <button
                type="button"
                className="yxr-rtt__btn yxr-rtt__btn--primary"
                onClick={() => openStart(selected.id)}
              >
                See if I qualify
              </button>
              <a href="#/treatments/weight-loss" className="yxr-rtt__btn yxr-rtt__btn--secondary">
                Learn more
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
