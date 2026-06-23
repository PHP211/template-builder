// Step navigation bar. Presentational — the current step and the change handler
// are owned by the parent.

export interface StepDef {
  label: string;
  sub: string;
}

export function Stepper({
  steps,
  current,
  onSelect,
}: {
  steps: StepDef[];
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <nav className="stepper">
      {steps.map((s, i) => {
        const state = i === current ? "active" : i < current ? "done" : "";
        return (
          <button
            key={i}
            type="button"
            className={"step " + state}
            onClick={() => onSelect(i)}
          >
            <span className="step-num">{i < current ? "✓" : i + 1}</span>
            <span className="step-text">
              <span className="step-name">{s.label}</span>
              <span className="step-sub">{s.sub}</span>
            </span>
            {i < steps.length - 1 && <span className="step-arrow">›</span>}
          </button>
        );
      })}
    </nav>
  );
}
