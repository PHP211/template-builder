// Auto-scaling paper preview with zoom controls.
//
// The paper's "fit" size is computed purely in CSS container units (1cqw = 1% of
// the stage), so it always fits the stage in both dimensions at zoom = 1. User
// zoom is just a multiplier (`--zoom`) applied on top of that fit size — no JS
// measuring needed. Ctrl + wheel adjusts the same multiplier.

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { FooterConfig, HeaderConfig, PageConfig } from "../types";
import { makeUnits, pageDimensions, resolveFont } from "../lib/paper";
import { PaperHeader } from "./PaperHeader";
import { PaperFooter } from "./PaperFooter";

const MIN_ZOOM = 0.25;
const MAX_ZOOM = 4;
const STEP = 0.1;

const SAMPLE_PARAGRAPHS = [
  "BÁO CÁO CHI TIẾT DƯ NỢ",
  "Báo cáo tổng hợp tình hình dư nợ của các khách hàng trong kỳ, phục vụ công tác kiểm soát và phân loại nhóm nợ. Nội dung mẫu này chỉ để xem trước cách phông chữ, cỡ chữ và giãn dòng hiển thị trên khổ giấy đã chọn.",
  "Vùng lề được vẽ bằng khung kẻ đứt màu cam. Phần đệm nội dung (padding) nằm bên trong khung lề. Khi bạn đổi khổ giấy, hướng giấy hay các thông số chữ, trang xem trước sẽ tự cập nhật theo tỉ lệ thật.",
];

type FitMode = "width" | "page";

const clampZoom = (z: number) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
const round2 = (z: number) => Math.round(z * 100) / 100;

interface Props {
  config: PageConfig;
  header: HeaderConfig;
  footer: FooterConfig;
  title: string;
}

export function PaperPreview({ config, header, footer, title }: Props) {
  const { width, height } = pageDimensions(config);
  const u = makeUnits(width);
  const stageRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [fitMode, setFitMode] = useState<FitMode>("width");

  const zoomBy = useCallback((delta: number) => {
    setZoom((z) => round2(clampZoom(z + delta)));
  }, []);
  const fitTo = useCallback((mode: FitMode) => {
    setFitMode(mode);
    setZoom(1);
  }, []);

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

  const paperStyle = {
    "--pw": width,
    "--ph": height,
  } as CSSProperties;

  const marginFrameStyle: CSSProperties = {
    top: u.mm(config.margin.top),
    right: u.mm(config.margin.right),
    bottom: u.mm(config.margin.bottom),
    left: u.mm(config.margin.left),
  };

  const contentStyle: CSSProperties = {
    top: u.mm(config.margin.top + config.padding),
    right: u.mm(config.margin.right + config.padding),
    bottom: u.mm(config.margin.bottom + config.padding),
    left: u.mm(config.margin.left + config.padding),
    fontFamily: resolveFont(config.font),
    fontSize: u.pt(config.fontSize),
    lineHeight: config.leading,
  };

  return (
    <div className="preview">
      <div className="preview-bar">
        <div className="fit-group">
          <button
            type="button"
            className={fitMode === "width" ? "on" : ""}
            onClick={() => fitTo("width")}
          >
            Fit rộng
          </button>
          <button
            type="button"
            className={fitMode === "page" ? "on" : ""}
            onClick={() => fitTo("page")}
          >
            Fit trang
          </button>
        </div>
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

      <div
        className={"preview-stage fit-" + fitMode}
        ref={stageRef}
        style={{ "--zoom": zoom } as CSSProperties}
      >
        <div className="paper" style={paperStyle}>
          <div className="paper-margin" style={marginFrameStyle} />
          <div className="paper-content" style={contentStyle}>
            {header.enabled && <PaperHeader header={header} title={title} u={u} />}
            <div className="paper-body">
              <h1 className="sample-h1" style={{ fontSize: u.pt(config.fontSize * 1.6) }}>
                {SAMPLE_PARAGRAPHS[0]}
              </h1>
              {SAMPLE_PARAGRAPHS.slice(1).map((p, i) => (
                <p key={i} className="sample-p" style={{ marginBottom: u.pt(config.fontSize) }}>
                  {p}
                </p>
              ))}
            </div>
            {footer.enabled && (
              <PaperFooter footer={footer} pageNo={1} pageCount={1} u={u} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
