// Auto-scaling paper preview with zoom controls.
//
// The paper's "fit" size is computed purely in CSS container units (1cqw = 1% of
// the stage), so it always fits the stage in both dimensions at zoom = 1. User
// zoom is just a multiplier (`--zoom`) applied on top of that fit size — no JS
// measuring needed. Ctrl + wheel adjusts the same multiplier.

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { PageConfig } from "../types";
import { PT_TO_MM, pageDimensions, resolveFont } from "../lib/paper";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const STEP = 0.1;

const SAMPLE_PARAGRAPHS = [
  "BÁO CÁO CHI TIẾT DƯ NỢ",
  "Báo cáo tổng hợp tình hình dư nợ của các khách hàng trong kỳ, phục vụ công tác kiểm soát và phân loại nhóm nợ. Nội dung mẫu này chỉ để xem trước cách phông chữ, cỡ chữ và giãn dòng hiển thị trên khổ giấy đã chọn.",
  "Vùng lề được vẽ bằng khung kẻ đứt màu cam. Phần đệm nội dung (padding) nằm bên trong khung lề. Khi bạn đổi khổ giấy, hướng giấy hay các thông số chữ, trang xem trước sẽ tự cập nhật theo tỉ lệ thật.",
];

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
const round2 = (z: number) => Math.round(z * 100) / 100;

export function PaperPreview({ config }: { config: PageConfig }) {
  const { width, height } = pageDimensions(config);
  const stageRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => round2(clampZoom(z + delta)));
  }, []);
  const fit = useCallback(() => setZoom(1), []);

  // Ctrl + wheel → zoom. Registered natively (non-passive) so we can
  // preventDefault and stop the browser's own page zoom / scroll.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return;
      e.preventDefault();
      setZoom((z) => round2(clampZoom(z - e.deltaY * 0.0015)));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // mm / pt → cqw (relative to the paper's rendered width).
  const mm = (v: number) => `${(v / width) * 100}cqw`;
  const pt = (v: number) => `${((v * PT_TO_MM) / width) * 100}cqw`;

  const paperStyle = {
    "--pw": width,
    "--ph": height,
  } as CSSProperties;

  const marginFrameStyle: CSSProperties = {
    top: mm(config.margin.top),
    right: mm(config.margin.right),
    bottom: mm(config.margin.bottom),
    left: mm(config.margin.left),
  };

  const contentStyle: CSSProperties = {
    top: mm(config.margin.top + config.padding),
    right: mm(config.margin.right + config.padding),
    bottom: mm(config.margin.bottom + config.padding),
    left: mm(config.margin.left + config.padding),
    fontFamily: resolveFont(config.font),
    fontSize: pt(config.fontSize),
    lineHeight: config.leading,
  };

  return (
    <div className="preview">
      <div className="preview-bar">
        <button type="button" className="fit-btn" onClick={fit}>
          Fit trang
        </button>
        <div className="zoom-ctrl">
          <button
            type="button"
            onClick={() => zoomBy(-STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Thu nhỏ"
          >
            −
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            onClick={() => zoomBy(STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Phóng to"
          >
            +
          </button>
        </div>
      </div>

      <div className="preview-stage" ref={stageRef} style={{ "--zoom": zoom } as CSSProperties}>
        <div className="paper" style={paperStyle}>
          <div className="paper-margin" style={marginFrameStyle} />
          <div className="paper-content" style={contentStyle}>
            <h1 className="sample-h1" style={{ fontSize: pt(config.fontSize * 1.6) }}>
              {SAMPLE_PARAGRAPHS[0]}
            </h1>
            {SAMPLE_PARAGRAPHS.slice(1).map((p, i) => (
              <p key={i} className="sample-p" style={{ marginBottom: pt(config.fontSize) }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
