import { useState } from 'react';
import { AreaChart, BarRow, DualLineChart, ProgressRing, Sparkline } from './charts.jsx';
import { MOCK } from './mockData.js';

function fmt(iso) {
  try {
    return new Date(iso).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function fmtDay(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return iso;
  }
}

function Section({ title, lede, actions, children }) {
  return (
    <section className="pc-section">
      <header className="pc-section__head">
        <div>
          {title && <h1 className="pc-title">{title}</h1>}
          {lede && <p className="pc-lede">{lede}</p>}
        </div>
        {actions}
      </header>
      {children}
    </section>
  );
}

function Panel({ title, children, action }) {
  return (
    <article className="pc-panel">
      {(title || action) && (
        <div className="pc-panel__head">
          {title && <h2>{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </article>
  );
}

function Stat({ label, value, hint, chart }) {
  return (
    <div className="pc-stat">
      <p className="pc-stat__label">{label}</p>
      <p className="pc-stat__value">{value}</p>
      {hint && <p className="pc-stat__hint">{hint}</p>}
      {chart}
    </div>
  );
}

function EmptyHint({ children }) {
  return <p className="pc-empty-hint">{children}</p>;
}

export function DashboardScreen({ patient, onNavigate }) {
  const nextAppt = MOCK.appointments.upcoming[0];
  const openTasks = MOCK.treatment.tasks.filter((t) => !t.done);
  const unread = MOCK.messages.filter((m) => !m.read && m.from === 'care');

  return (
    <Section
      title={`Welcome back, ${patient.firstName}.`}
      lede="Your Pax care snapshot — appointments, treatment, and what needs attention."
      actions={
        <div className="pc-actions">
          <button type="button" className="pc-btn pc-btn--primary" onClick={() => onNavigate('appointments', 'join')}>
            Join visit
          </button>
          <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('messages')}>
            Message care team
          </button>
        </div>
      }
    >
      <div className="pc-stat-grid">
        <Stat label="Health score" value={MOCK.healthScore} hint="Composite from vitals + adherence" chart={<ProgressRing value={MOCK.healthScore} />} />
        <Stat label="Weight trend" value={`${MOCK.monitoring.weight.at(-1).v} lb`} hint="−3.8 lb this month" chart={<Sparkline data={MOCK.monitoring.weight} width={140} height={40} />} />
        <Stat label="Adherence" value={`${MOCK.medSchedule.adherence}%`} hint="Medication tracker" chart={<Sparkline data={MOCK.monitoring.hr} stroke="var(--forest)" width={140} height={40} />} />
        <Stat label="Balance due" value={MOCK.billing.balance === 0 ? '$0' : `$${MOCK.billing.balance}`} hint={MOCK.membership.plan} />
      </div>

      <div className="pc-grid-2">
        <Panel title="Upcoming appointment" action={<button type="button" className="pc-link" onClick={() => onNavigate('appointments', 'upcoming')}>View all</button>}>
          <div className="pc-appt">
            <div>
              <strong>{nextAppt.title}</strong>
              <p>{nextAppt.provider} · {nextAppt.mode}</p>
              <p className="pc-muted">{fmt(nextAppt.when)}</p>
            </div>
            {nextAppt.canJoin && (
              <button type="button" className="pc-btn pc-btn--primary" onClick={() => onNavigate('appointments', 'join')}>
                Join
              </button>
            )}
          </div>
        </Panel>

        <Panel title="Current treatment">
          <p className="pc-pill-row">
            <span className="pc-pill pc-pill--ok">{MOCK.treatment.status}</span>
            <span>{MOCK.treatment.name}</span>
          </p>
          <p className="pc-muted">{MOCK.treatment.plan}</p>
          <p><strong>{MOCK.treatment.dose}</strong></p>
          <button type="button" className="pc-link" onClick={() => onNavigate('health', 'plans')}>Open treatment plan</button>
        </Panel>
      </div>

      <div className="pc-grid-2">
        <Panel title="Outstanding tasks">
          <ul className="pc-list">
            {openTasks.map((t) => (
              <li key={t.id}><button type="button" className="pc-check" />{t.label}</li>
            ))}
            {!openTasks.length && <EmptyHint>You’re caught up.</EmptyHint>}
          </ul>
        </Panel>
        <Panel title="Messages from providers" action={<button type="button" className="pc-link" onClick={() => onNavigate('messages')}>Inbox</button>}>
          <ul className="pc-list pc-list--stack">
            {unread.map((m) => (
              <li key={m.id}>
                <strong>{m.name}</strong>
                <p>{m.body}</p>
              </li>
            ))}
            {!unread.length && <EmptyHint>No unread messages.</EmptyHint>}
          </ul>
        </Panel>
      </div>

      <Panel title="Recent lab results" action={<button type="button" className="pc-link" onClick={() => onNavigate('health', 'labs')}>All labs</button>}>
        <div className="pc-table">
          {MOCK.labs.slice(0, 2).map((lab) => (
            <div key={lab.id} className="pc-table__row">
              <div>
                <strong>{lab.name}</strong>
                <p className="pc-muted">{fmtDay(lab.date)}</p>
              </div>
              <span className={`pc-pill ${lab.abnormal ? 'pc-pill--warn' : 'pc-pill--ok'}`}>
                {lab.abnormal ? 'Review' : 'Normal'}
              </span>
            </div>
          ))}
        </div>
      </Panel>

      <div className="pc-quick">
        <p className="pc-quick__label">Quick actions</p>
        <div className="pc-actions">
          <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('medications', 'refills')}>Request refill</button>
          <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('monitoring', 'weight')}>Log weight</button>
          <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('documents')}>Upload document</button>
          <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('ai')}>Ask AI assistant</button>
        </div>
      </div>
    </Section>
  );
}

export function AppointmentsScreen({ panel, onNavigate }) {
  if (panel === 'history') {
    return (
      <Section title="Appointment history" lede="Past visits and summaries.">
        <div className="pc-stack">
          {MOCK.appointments.history.map((a) => (
            <Panel key={a.id}>
              <div className="pc-table__row">
                <div>
                  <strong>{a.title}</strong>
                  <p className="pc-muted">{a.provider} · {a.mode}</p>
                  <p className="pc-muted">{fmt(a.when)}</p>
                  <p>{a.summary}</p>
                </div>
                <span className="pc-pill">{a.status}</span>
              </div>
            </Panel>
          ))}
        </div>
      </Section>
    );
  }

  if (panel === 'join') {
    return (
      <Section title="Join visit" lede="Device check and virtual waiting room — simulated for this demo.">
        <Panel title="Metabolic follow-up · Dr. Elena Vance">
          <p className="pc-muted">{fmt(MOCK.appointments.upcoming[0].when)}</p>
          <div className="pc-video">
            <div className="pc-video__stage">
              <p>Virtual waiting room</p>
              <strong>Network: Excellent</strong>
              <span className="pc-pill pc-pill--ok">Camera ready · Mic ready</span>
            </div>
            <div className="pc-actions">
              <button type="button" className="pc-btn pc-btn--primary">Enter visit</button>
              <button type="button" className="pc-btn pc-btn--ghost" onClick={() => onNavigate('appointments', 'upcoming')}>Back</button>
            </div>
            <ul className="pc-list">
              <li>In-visit chat available</li>
              <li>Upload images / share reports from Documents</li>
              <li>Provider notes appear in Medical Records after the visit</li>
            </ul>
          </div>
        </Panel>
      </Section>
    );
  }

  return (
    <Section
      title="Upcoming appointments"
      lede="Book, reschedule, or join when it’s time."
      actions={<button type="button" className="pc-btn pc-btn--primary">Book appointment</button>}
    >
      <div className="pc-stack">
        {MOCK.appointments.upcoming.map((a) => (
          <Panel key={a.id}>
            <div className="pc-appt">
              <div>
                <strong>{a.title}</strong>
                <p>{a.provider} · {a.mode}</p>
                <p className="pc-muted">{fmt(a.when)}</p>
                <span className="pc-pill pc-pill--ok">{a.status}</span>
              </div>
              <div className="pc-actions pc-actions--col">
                {a.canJoin && (
                  <button type="button" className="pc-btn pc-btn--primary" onClick={() => onNavigate('appointments', 'join')}>
                    Join visit
                  </button>
                )}
                <button type="button" className="pc-btn pc-btn--ghost">Reschedule</button>
                <button type="button" className="pc-btn pc-btn--ghost">Cancel</button>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

export function MessagesScreen() {
  const [draft, setDraft] = useState('');
  const [items, setItems] = useState(MOCK.messages);

  const send = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;
    setItems((prev) => [
      ...prev,
      {
        id: `local_${Date.now()}`,
        from: 'patient',
        name: 'You',
        body: draft.trim(),
        at: new Date().toISOString(),
        read: true,
      },
    ]);
    setDraft('');
  };

  return (
    <Section title="Messages" lede="Secure thread with your Pax care team.">
      <Panel>
        <div className="pc-thread">
          {items.map((m) => (
            <div key={m.id} className={`pc-bubble ${m.from === 'patient' ? 'pc-bubble--me' : ''}`}>
              <div className="pc-bubble__meta">
                <strong>{m.name}</strong>
                <span>{fmt(m.at)}</span>
              </div>
              <p>{m.body}</p>
            </div>
          ))}
        </div>
        <form className="pc-composer" onSubmit={send}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Write a message… attach photos or documents from the paperclip in production"
          />
          <button type="submit" className="pc-btn pc-btn--primary">Send</button>
        </form>
      </Panel>
    </Section>
  );
}

export function HealthScreen({ panel }) {
  if (panel === 'labs') {
    return (
      <Section title="Lab results" lede="Blood work, imaging, and pathology with trend-ready markers.">
        <div className="pc-stack">
          {MOCK.labs.map((lab) => (
            <Panel key={lab.id} title={lab.name} action={<span className="pc-muted">{fmtDay(lab.date)}</span>}>
              <div className="pc-table">
                {lab.items.map((item) => (
                  <div key={item.marker} className="pc-table__row">
                    <div>
                      <strong>{item.marker}</strong>
                      <p className="pc-muted">Ref {item.range} {item.unit}</p>
                    </div>
                    <span className={`pc-pill ${item.flag === 'ok' ? 'pc-pill--ok' : 'pc-pill--warn'}`}>
                      {item.value} {item.unit}
                    </span>
                  </div>
                ))}
              </div>
              {lab.comment && <p className="pc-note">{lab.comment}</p>}
              <button type="button" className="pc-link">Download report</button>
            </Panel>
          ))}
        </div>
      </Section>
    );
  }

  if (panel === 'vitals') {
    return (
      <Section title="Vitals" lede="Latest readings synced from monitoring.">
        <div className="pc-stat-grid">
          <Stat label="Blood pressure" value={`${MOCK.monitoring.bp.at(-1).v}/${MOCK.monitoring.bp.at(-1).diastolic}`} hint="mmHg" chart={<Sparkline data={MOCK.monitoring.bp} />} />
          <Stat label="Heart rate" value={`${MOCK.monitoring.hr.at(-1).v} bpm`} chart={<Sparkline data={MOCK.monitoring.hr} stroke="var(--forest)" />} />
          <Stat label="Weight" value={`${MOCK.monitoring.weight.at(-1).v} lb`} chart={<Sparkline data={MOCK.monitoring.weight} />} />
          <Stat label="SpO₂" value={`${MOCK.monitoring.spo2.at(-1).v}%`} chart={<Sparkline data={MOCK.monitoring.spo2} />} />
        </div>
      </Section>
    );
  }

  if (panel === 'wellness') {
    const w = MOCK.wellness;
    return (
      <Section title="Wellness" lede="Daily habits that support your clinical plan.">
        <div className="pc-grid-2">
          <Panel title="Today">
            <BarRow label={`Water ${w.waterOz}/${w.waterGoal} oz`} value={w.waterOz} max={w.waterGoal} />
            <BarRow label={`Exercise ${w.exerciseMin}/${w.exerciseGoal} min`} value={w.exerciseMin} max={w.exerciseGoal} tone="terra" />
            <BarRow label="Mood" value={w.mood * 20} />
            <BarRow label="Sleep quality" value={w.sleepQuality * 20} tone="terra" />
          </Panel>
          <Panel title="Goals">
            {w.goals.map((g) => (
              <BarRow key={g.label} label={g.label} value={g.progress} />
            ))}
          </Panel>
        </div>
      </Section>
    );
  }

  if (panel === 'plans') {
    const t = MOCK.treatment;
    return (
      <Section title="Treatment plans" lede="Care instructions, daily tasks, and provider recommendations.">
        <Panel title={t.name} action={<span className="pc-pill pc-pill--ok">{t.status}</span>}>
          <p>{t.plan}</p>
          <p><strong>{t.dose}</strong></p>
          <h3 className="pc-subtitle">Instructions</h3>
          <ul className="pc-list">{t.instructions.map((i) => <li key={i}>{i}</li>)}</ul>
          <h3 className="pc-subtitle">Daily tasks</h3>
          <ul className="pc-list">
            {t.tasks.map((task) => (
              <li key={task.id} className={task.done ? 'is-done' : ''}>{task.label}</li>
            ))}
          </ul>
          <h3 className="pc-subtitle">Lifestyle</h3>
          <ul className="pc-list">{t.lifestyle.map((i) => <li key={i}>{i}</li>)}</ul>
        </Panel>
      </Section>
    );
  }

  return (
    <Section title="Medical records" lede="Visit summaries, diagnoses, vaccinations — download or share.">
      <Panel>
        <div className="pc-table">
          {MOCK.records.map((r) => (
            <div key={r.id} className="pc-table__row">
              <div>
                <strong>{r.title}</strong>
                <p className="pc-muted">{r.type} · {r.date}</p>
              </div>
              <button type="button" className="pc-link">PDF</button>
            </div>
          ))}
        </div>
        <div className="pc-actions" style={{ marginTop: '1rem' }}>
          <button type="button" className="pc-btn pc-btn--ghost">Download all records</button>
          <button type="button" className="pc-btn pc-btn--ghost">Share with provider</button>
        </div>
      </Panel>
      <Panel title="Forms & questionnaires">
        <div className="pc-table">
          {MOCK.forms.map((f) => (
            <div key={f.id} className="pc-table__row">
              <strong>{f.name}</strong>
              <span className={`pc-pill ${f.status === 'Due' ? 'pc-pill--warn' : 'pc-pill--ok'}`}>{f.status}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Section>
  );
}

export function MedicationsScreen({ panel }) {
  if (panel === 'refills') {
    return (
      <Section title="Refills" lede="Request pharmacy release after provider review.">
        <div className="pc-stack">
          {MOCK.prescriptions.map((rx) => (
            <Panel key={rx.id} title={rx.name}>
              <p>{rx.dose}</p>
              <p className="pc-muted">{rx.refillsLeft} refills left · last filled {rx.lastFilled}</p>
              <button type="button" className="pc-btn pc-btn--primary">Request refill</button>
            </Panel>
          ))}
        </div>
      </Section>
    );
  }

  if (panel === 'reminders') {
    const s = MOCK.medSchedule;
    return (
      <Section title="Medication reminders" lede={`Adherence ${s.adherence}% this month.`}>
        <div className="pc-grid-2">
          <Panel title="Morning">
            <ul className="pc-list">
              {s.morning.map((m) => (
                <li key={m.id} className={m.taken ? 'is-done' : ''}>{m.name} · {m.time}</li>
              ))}
            </ul>
          </Panel>
          <Panel title="Evening">
            <ul className="pc-list">
              {s.evening.map((m) => (
                <li key={m.id} className={m.taken ? 'is-done' : ''}>{m.name} · {m.time}</li>
              ))}
            </ul>
          </Panel>
        </div>
        <Panel title="Weekly">
          <ul className="pc-list">
            {s.weekly.map((m) => (
              <li key={m.id} className={m.taken ? 'is-done' : ''}>{m.name} · {m.day}</li>
            ))}
          </ul>
        </Panel>
      </Section>
    );
  }

  return (
    <Section title="Prescriptions" lede="Active medications, history, and pharmacy.">
      <div className="pc-stack">
        {MOCK.prescriptions.map((rx) => (
          <Panel key={rx.id}>
            <div className="pc-table__row">
              <div>
                <strong>{rx.name}</strong>
                <p>{rx.dose}</p>
                <p className="pc-muted">{rx.pharmacy}</p>
              </div>
              <span className="pc-pill pc-pill--ok">{rx.status}</span>
            </div>
            <div className="pc-actions">
              <button type="button" className="pc-btn pc-btn--ghost">Download</button>
              <button type="button" className="pc-btn pc-btn--ghost">Change pharmacy</button>
            </div>
          </Panel>
        ))}
      </div>
    </Section>
  );
}

export function MonitoringScreen({ panel }) {
  const [weightLog, setWeightLog] = useState('');
  const weightSeries = MOCK.monitoring.weight;

  if (panel === 'bp') {
    return (
      <Section title="Blood pressure" lede="14-day trend from Withings BPM Connect.">
        <Panel>
          <DualLineChart data={MOCK.monitoring.bp} />
          <p className="pc-muted">Latest {MOCK.monitoring.bp.at(-1).v}/{MOCK.monitoring.bp.at(-1).diastolic} mmHg</p>
        </Panel>
      </Section>
    );
  }
  if (panel === 'hr') {
    return (
      <Section title="Heart rate" lede="Resting trend from Apple Watch.">
        <Panel>
          <AreaChart data={MOCK.monitoring.hr} stroke="var(--forest)" fill="rgba(45, 90, 61, 0.14)" formatY={(v) => `${v}`} />
        </Panel>
      </Section>
    );
  }
  if (panel === 'glucose') {
    return (
      <Section title="Glucose" lede="Fasting / spot checks — pair CGM when ready.">
        <Panel>
          <AreaChart data={MOCK.monitoring.glucose} formatY={(v) => `${v}`} />
        </Panel>
      </Section>
    );
  }
  if (panel === 'devices') {
    return (
      <Section title="Connected devices" lede="Wearables and home monitors feeding your RPM dashboard.">
        <div className="pc-stack">
          {MOCK.monitoring.devices.map((d) => (
            <Panel key={d.id}>
              <div className="pc-table__row">
                <div>
                  <strong>{d.name}</strong>
                  <p className="pc-muted">Last sync {d.lastSync}</p>
                </div>
                <span className={`pc-pill ${d.status === 'Connected' ? 'pc-pill--ok' : ''}`}>{d.status}</span>
              </div>
            </Panel>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section title="Weight" lede="RPM weight curve with manual log.">
      <Panel>
        <AreaChart data={weightSeries} formatY={(v) => `${v}`} />
        <form
          className="pc-composer"
          onSubmit={(e) => {
            e.preventDefault();
            setWeightLog('');
          }}
        >
          <input value={weightLog} onChange={(e) => setWeightLog(e.target.value)} placeholder="Log weight (lb)" inputMode="decimal" />
          <button type="submit" className="pc-btn pc-btn--primary">Save</button>
        </form>
      </Panel>
    </Section>
  );
}

export function InsuranceScreen() {
  const ins = MOCK.insurance;
  return (
    <Section title="Insurance" lede="Coverage, claims, and card on file.">
      <div className="pc-grid-2">
        <Panel title={ins.payer}>
          <p>Member ID <strong>{ins.memberId}</strong></p>
          <p>Group <strong>{ins.group}</strong></p>
          <p>Subscriber <strong>{ins.subscriber}</strong></p>
          <p className="pc-muted">Card {ins.cardUploaded ? 'uploaded' : 'missing'}</p>
        </Panel>
        <Panel title="Deductible & OOP">
          <BarRow label={`Deductible $${ins.deductible.used} / $${ins.deductible.total}`} value={ins.deductible.used} max={ins.deductible.total} />
          <BarRow label={`Out-of-pocket $${ins.oop.used} / $${ins.oop.total}`} value={ins.oop.used} max={ins.oop.total} tone="terra" />
          <p className="pc-muted">Copays — primary {ins.copay.primary} · specialist {ins.copay.specialist}</p>
        </Panel>
      </div>
      <Panel title="Claims">
        <div className="pc-table">
          {ins.claims.map((c) => (
            <div key={c.id} className="pc-table__row">
              <div>
                <strong>{c.title}</strong>
                <p className="pc-muted">{c.date}</p>
              </div>
              <span>{c.amount} · {c.status}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Section>
  );
}

export function BillingScreen() {
  const b = MOCK.billing;
  return (
    <Section title="Billing & membership" lede="Invoices, cards, and your Continuum plan.">
      <div className="pc-stat-grid">
        <Stat label="Outstanding balance" value={b.balance === 0 ? '$0.00' : `$${b.balance}`} />
        <Stat label="Plan" value={MOCK.membership.plan} hint={`Next bill ${MOCK.membership.nextBilling}`} />
        <Stat label="Payment method" value={b.card} />
      </div>
      <Panel title="Invoices">
        <div className="pc-table">
          {b.invoices.map((inv) => (
            <div key={inv.id} className="pc-table__row">
              <div>
                <strong>{inv.title}</strong>
                <p className="pc-muted">{inv.date}</p>
              </div>
              <span>{inv.amount} · {inv.status}</span>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Membership benefits">
        <ul className="pc-list">
          {MOCK.membership.benefits.map((x) => <li key={x}>{x}</li>)}
        </ul>
        <div className="pc-actions">
          <button type="button" className="pc-btn pc-btn--ghost">Upgrade plan</button>
          <button type="button" className="pc-btn pc-btn--ghost">Manage subscription</button>
        </div>
      </Panel>
    </Section>
  );
}

export function DocumentsScreen() {
  return (
    <Section title="Document center" lede="ID, insurance, referrals, imaging, and lab PDFs.">
      <Panel>
        <div className="pc-table">
          {MOCK.documents.map((d) => (
            <div key={d.id} className="pc-table__row">
              <div>
                <strong>{d.name}</strong>
                <p className="pc-muted">{d.type} · {d.date}</p>
              </div>
              <button type="button" className="pc-link">Open</button>
            </div>
          ))}
        </div>
        <button type="button" className="pc-btn pc-btn--primary" style={{ marginTop: '1rem' }}>Upload document</button>
      </Panel>
    </Section>
  );
}

export function FamilyScreen() {
  return (
    <Section title="Family access" lede="Proxy permissions for children, partners, and elder care.">
      <div className="pc-stack">
        {MOCK.family.map((f) => (
          <Panel key={f.id}>
            <div className="pc-table__row">
              <div>
                <strong>{f.name}</strong>
                <p className="pc-muted">{f.relation}</p>
                <p>{f.access}</p>
              </div>
              <span className="pc-pill pc-pill--ok">{f.status}</span>
            </div>
          </Panel>
        ))}
      </div>
      <button type="button" className="pc-btn pc-btn--ghost">Invite caregiver</button>
    </Section>
  );
}

export function AiScreen() {
  const [q, setQ] = useState('');
  const [log, setLog] = useState([
    { role: 'ai', text: 'Hi Alex — I can help with symptoms, medications, appointments, and navigating your Patient Center. I am not a doctor; I’ll hand off to your care team when needed.' },
  ]);

  const ask = (e) => {
    e.preventDefault();
    if (!q.trim()) return;
    const question = q.trim();
    setLog((prev) => [
      ...prev,
      { role: 'user', text: question },
      {
        role: 'ai',
        text: 'Simulated guidance: based on your active Semaglutide plan, mild nausea in week 1–3 is common. If pain is above 4/10 or vomiting persists, message Dr. Vance. Want me to draft a care-team message?',
      },
    ]);
    setQ('');
  };

  return (
    <Section title="AI health assistant" lede="Symptom checker, medication questions, and care navigation — with provider handoff.">
      <Panel>
        <div className="pc-thread">
          {log.map((m, i) => (
            <div key={i} className={`pc-bubble ${m.role === 'user' ? 'pc-bubble--me' : ''}`}>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
        <form className="pc-composer" onSubmit={ask}>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Ask about symptoms, refills, visits…" />
          <button type="submit" className="pc-btn pc-btn--primary">Ask</button>
        </form>
      </Panel>
    </Section>
  );
}

export function NotificationsScreen() {
  return (
    <Section title="Notifications" lede="Appointments, labs, prescriptions, and billing alerts.">
      <Panel>
        <div className="pc-stack">
          {MOCK.notifications.map((n) => (
            <div key={n.id} className={`pc-note-row ${n.unread ? 'is-unread' : ''}`}>
              <div>
                <strong>{n.title}</strong>
                <p>{n.body}</p>
                <p className="pc-muted">{fmt(n.at)}</p>
              </div>
              <span className="pc-pill">{n.type}</span>
            </div>
          ))}
        </div>
      </Panel>
    </Section>
  );
}

export function SettingsScreen({ patient, onLogout, authMeta, auditLog = [] }) {
  const p = { ...MOCK.profile, ...patient };
  return (
    <Section title="Settings" lede="Profile, security, privacy, and the live auth dictionary.">
      <div className="pc-grid-2">
        <Panel title="Patient profile">
          <dl className="pc-dl">
            <div><dt>Name</dt><dd>{p.firstName} {p.lastName}</dd></div>
            <div><dt>Email</dt><dd>{p.email}</dd></div>
            <div><dt>Phone</dt><dd>{p.phone}</dd></div>
            <div><dt>DOB</dt><dd>{p.dob}</dd></div>
            <div><dt>Blood type</dt><dd>{p.bloodType}</dd></div>
            <div><dt>Pharmacy</dt><dd>{p.pharmacy}</dd></div>
            <div><dt>Preferred doctor</dt><dd>{p.preferredDoctor}</dd></div>
            <div><dt>Emergency</dt><dd>{p.emergency.name} · {p.emergency.phone}</dd></div>
            <div><dt>Allergies</dt><dd>{p.allergies.join(', ')}</dd></div>
            <div><dt>Language</dt><dd>{p.language}</dd></div>
          </dl>
        </Panel>
        <Panel title="Authentication & security">
          <p>2FA <strong>{MOCK.security.mfa ? 'On' : 'Off'}</strong></p>
          <h3 className="pc-subtitle">Dictionary database</h3>
          <p className="pc-muted">
            {authMeta?.userCount ?? 0} users · {authMeta?.sessionCount ?? 0} sessions · token{' '}
            <code style={{ fontSize: '0.75rem' }}>{authMeta?.activeToken ? `${authMeta.activeToken.slice(0, 18)}…` : 'none'}</code>
          </p>
          <h3 className="pc-subtitle">Auth audit</h3>
          <ul className="pc-list">
            {auditLog.map((a) => (
              <li key={a.id}>{a.type} · {a.email} · {new Date(a.at).toLocaleString()}</li>
            ))}
            {!auditLog.length && <li>No events yet</li>}
          </ul>
          <div className="pc-actions">
            <button type="button" className="pc-btn pc-btn--ghost">Change password</button>
            <button type="button" className="pc-btn pc-btn--ghost">Privacy & HIPAA</button>
            <button type="button" className="pc-btn pc-btn--primary" onClick={onLogout}>Sign out</button>
          </div>
        </Panel>
      </div>
    </Section>
  );
}

export function SupportScreen() {
  return (
    <Section title="Help center" lede="FAQs, contact, and tutorials.">
      <Panel title="FAQs">
        {MOCK.supportFaqs.map((f) => (
          <details key={f.q} className="pc-faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </Panel>
      <div className="pc-actions">
        <button type="button" className="pc-btn pc-btn--primary">Contact support</button>
        <button type="button" className="pc-btn pc-btn--ghost">Report a problem</button>
        <button type="button" className="pc-btn pc-btn--ghost">Live chat</button>
      </div>
    </Section>
  );
}

export function renderPortalScreen({ section, panel, patient, onNavigate, onLogout, authMeta, auditLog }) {
  switch (section) {
    case 'dashboard':
      return <DashboardScreen patient={patient} onNavigate={onNavigate} />;
    case 'appointments':
      return <AppointmentsScreen panel={panel} onNavigate={onNavigate} />;
    case 'messages':
      return <MessagesScreen />;
    case 'health':
      return <HealthScreen panel={panel} />;
    case 'medications':
      return <MedicationsScreen panel={panel} />;
    case 'monitoring':
      return <MonitoringScreen panel={panel} />;
    case 'insurance':
      return <InsuranceScreen />;
    case 'billing':
      return <BillingScreen />;
    case 'documents':
      return <DocumentsScreen />;
    case 'family':
      return <FamilyScreen />;
    case 'ai':
      return <AiScreen />;
    case 'notifications':
      return <NotificationsScreen />;
    case 'settings':
      return <SettingsScreen patient={patient} onLogout={onLogout} authMeta={authMeta} auditLog={auditLog} />;
    case 'support':
      return <SupportScreen />;
    default:
      return <DashboardScreen patient={patient} onNavigate={onNavigate} />;
  }
}
