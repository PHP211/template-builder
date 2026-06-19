// Read-only view of the metadata generated from the page config. Mirrors the
// "source of truth → generated output" idea: the config drives this, never the
// other way around.

import { useMemo, useState } from "react";
import type { PageConfig } from "../../types";
import { buildMetadata, metadataToJSON } from "../../lib/metadata";

interface Row {
  key: string;
  value: string;
}

export function MetadataPanel({ config }: { config: PageConfig }) {
  const meta = useMemo(() => buildMetadata(config), [config]);
  const json = useMemo(() => metadataToJSON(meta), [meta]);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard?.writeText(json).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const rows: Row[] = [
    { key: "paper_size", value: `${meta.paper_size} · ${meta.orientation}` },
    { key: "width × height", value: `${meta.width_mm} × ${meta.height_mm} mm` },
    {
      key: "margin",
      value: `${meta.margin_mm.top}/${meta.margin_mm.right}/${meta.margin_mm.bottom}/${meta.margin_mm.left} mm`,
    },
    { key: "padding", value: `${meta.padding_mm} mm` },
    {
      key: "content box",
      value: `${meta.content_width_mm} × ${meta.content_height_mm} mm`,
    },
    { key: "font", value: meta.font },
    { key: "font_size", value: `${meta.font_size_pt} pt` },
    { key: "leading", value: `${meta.leading}× · ${meta.line_height_mm} mm` },
  ];

  return (
    <div className="meta-panel">
      <div className="meta-head">
        <span>Metadata sinh ra</span>
        <span className="badge">generated</span>
      </div>

      <dl className="meta-dl">
        {rows.map((r) => (
          <div key={r.key}>
            <dt>{r.key}</dt>
            <dd>{r.value}</dd>
          </div>
        ))}
      </dl>

      <div className="json-block">
        <div className="json-bar">
          <span className="json-file">page-config.json</span>
          <button type="button" className="copy-btn" onClick={copy}>
            {copied ? "✓ Đã chép" : "Sao chép"}
          </button>
        </div>
        <pre className="json-code">{json}</pre>
      </div>
    </div>
  );
}
