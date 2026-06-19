import { useState } from "react";
import type { PageConfig } from "./types";
import { DEFAULT_PAGE_CONFIG } from "./features/page-config/defaults";
import { PageConfigPanel } from "./features/page-config/PageConfigPanel";
import { MetadataPanel } from "./features/metadata/MetadataPanel";
import { PaperPreview } from "./preview/PaperPreview";
import { orientationLabel } from "./lib/paper";

export default function App() {
  const [config, setConfig] = useState<PageConfig>(DEFAULT_PAGE_CONFIG);

  const update = (patch: Partial<PageConfig>) =>
    setConfig((prev) => ({ ...prev, ...patch }));

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">TS</span>
          <span className="brand-name">Template Studio</span>
        </div>
        <span className="step-label">Bước 1 · Cấu hình trang</span>
      </header>

      <div className="workspace">
        <aside className="left">
          <PageConfigPanel config={config} onChange={update} />
        </aside>

        <main className="canvas">
          <PaperPreview config={config} />
          <footer className="canvas-foot">
            {config.paper} · {orientationLabel(config.orientation)} · {config.font}{" "}
            {config.fontSize}pt · giãn {config.leading}×
          </footer>
        </main>

        <aside className="right">
          <MetadataPanel config={config} />
        </aside>
      </div>
    </div>
  );
}
