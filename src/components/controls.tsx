// Reusable form controls for the studio panels. Presentational only — they
// receive a value and an onChange and never own state.

import type { ReactNode } from "react";

export function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="sec">
      <div className="sec-head">
        <span>{title}</span>
        {action}
      </div>
      <div className="sec-body">{children}</div>
    </section>
  );
}

export function Field({
  label,
  inline,
  children,
}: {
  label: string;
  inline?: boolean;
  children: ReactNode;
}) {
  return (
    <label className={"field" + (inline ? " field-inline" : "")}>
      <span className="field-label">{label}</span>
      <span className="field-control">{children}</span>
    </label>
  );
}

export type Option<T extends string> = T | { value: T; label: string };

function optValue<T extends string>(o: Option<T>): T {
  return typeof o === "object" ? o.value : o;
}
function optLabel<T extends string>(o: Option<T>): string {
  return typeof o === "object" ? o.label : o;
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
  size,
}: {
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
  size?: "sm";
}) {
  return (
    <div className={"seg" + (size === "sm" ? " seg-sm" : "")}>
      {options.map((o) => {
        const v = optValue(o);
        return (
          <button
            key={v}
            type="button"
            className={"seg-btn" + (v === value ? " on" : "")}
            onClick={() => onChange(v)}
          >
            {optLabel(o)}
          </button>
        );
      })}
    </div>
  );
}

export function Slider({
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
      <span className="slider-val">
        {value}
        {unit}
      </span>
    </div>
  );
}

export function NumberStepper({
  value,
  min = -Infinity,
  max = Infinity,
  step = 1,
  unit = "",
  onChange,
}: {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => Math.max(min, Math.min(max, v));
  return (
    <div className="num-stepper">
      <button type="button" onClick={() => onChange(clamp(value - step))}>
        −
      </button>
      <span>
        {value}
        {unit}
      </span>
      <button type="button" onClick={() => onChange(clamp(value + step))}>
        +
      </button>
    </div>
  );
}

export function Select<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
}) {
  return (
    <select
      className="select"
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {options.map((o) => (
        <option key={optValue(o)} value={optValue(o)}>
          {optLabel(o)}
        </option>
      ))}
    </select>
  );
}

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      className={"toggle" + (value ? " on" : "")}
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
    >
      <span className="toggle-knob" />
    </button>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="text-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      className="text-area"
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="hint">{children}</p>;
}
