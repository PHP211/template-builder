import { useState } from "react";
import type { FooterConfig, HeaderConfig, PageConfig } from "./types";
import { DEFAULT_PAGE_CONFIG } from "./features/page-config/defaults";
import { PageConfigPanel } from "./features/page-config/PageConfigPanel";
import { DEFAULT_FOOTER, DEFAULT_HEADER } from "./features/header-footer/defaults";
import { StepHeaderFooter } from "./features/header-footer/StepHeaderFooter";
import { MetadataPanel } from "./features/metadata/MetadataPanel";
import { PaperPreview } from "./preview/PaperPreview";
import { Stepper, type StepDef } from "./components/Stepper";
import { orientationLabel } from "./lib/paper";

const STEPS: StepDef[] = [
  { label: "Cấu hình trang", sub: "Khổ giấy · lề · phông" },
  { label: "Đầu / Chân trang", sub: "Logo · tiêu đề · số trang" },
  { label: "Thiết kế nội dung", sub: "Khối · bảng · chữ ký" },
  { label: "Xem trước & Upload", sub: "Render · metadata · upload" },
];

export default function App() {
  const [config, setConfig] = useState<PageConfig>(DEFAULT_PAGE_CONFIG);
  const [header, setHeader] = useState<HeaderConfig>(DEFAULT_HEADER);
  const [footer, setFooter] = useState<FooterConfig>(DEFAULT_FOOTER);
  const [name, setName] = useState("Mẫu — Báo cáo chi tiết dư nợ");
  const [step, setStep] = useState(0);

  const update = (patch: Partial<PageConfig>) =>
    setConfig((prev) => ({ ...prev, ...patch }));
  const updateHeader = (patch: Partial<HeaderConfig>) =>
    setHeader((prev) => ({ ...prev, ...patch }));
  const updateFooter = (patch: Partial<FooterConfig>) =>
    setFooter((prev) => ({ ...prev, ...patch }));

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">TS</span>
          <span className="brand-name">Template Studio</span>
          <span className="brand-div" />
          <input
            className="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tên báo cáo"
            aria-label="Tên báo cáo"
          />
        </div>
      </header>

      <Stepper steps={STEPS} current={step} onSelect={setStep} />

      <div className="workspace">
        <aside className="left">
          {step === 0 && <PageConfigPanel config={config} onChange={update} />}
          {step === 1 && (
            <StepHeaderFooter
              header={header}
              footer={footer}
              onHeaderChange={updateHeader}
              onFooterChange={updateFooter}
            />
          )}
          {step > 1 && <StepPlaceholder title={STEPS[step].label} />}
        </aside>

        <main className="canvas">
          <PaperPreview config={config} header={header} footer={footer} title={name} />
          <footer className="canvas-foot">
            {config.paper} · {orientationLabel(config.orientation)} · {config.font}{" "}
            {config.fontSize}pt · giãn {config.leading}×
          </footer>
        </main>

        <aside className="right">
          <MetadataPanel config={config} header={header} footer={footer} name={name} />
        </aside>
      </div>

      <footer className="navbar">
        <button
          type="button"
          className="nav-btn"
          disabled={step === 0}
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          ‹ Quay lại
        </button>
        <div className="nav-progress">
          {STEPS.map((_, i) => (
            <span
              key={i}
              className={"pip" + (i === step ? " on" : "") + (i < step ? " done" : "")}
            />
          ))}
        </div>
        <button
          type="button"
          className="nav-btn primary"
          disabled={step === STEPS.length - 1}
          onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
        >
          Tiếp tục ›
        </button>
      </footer>
    </div>
  );
}

function StepPlaceholder({ title }: { title: string }) {
  return (
    <div className="panel-scroll">
      <div className="placeholder">
        <div className="placeholder-ic">🚧</div>
        <p>
          <b>{title}</b>
        </p>
        <p>Bước này sẽ được xây dựng tiếp theo.</p>
      </div>
    </div>
  );
}
