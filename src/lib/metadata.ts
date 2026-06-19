// Derives upload-ready metadata from a PageConfig. This is generated output —
// the PageConfig is the source of truth; metadata is never edited directly.

import type { PageConfig } from "../types";
import { contentBox, pageDimensions, PT_TO_MM, round1 } from "./paper";

export interface PageMetadata {
  paper_size: string;
  orientation: string;
  width_mm: number;
  height_mm: number;
  margin_mm: PageConfig["margin"];
  padding_mm: number;
  content_width_mm: number;
  content_height_mm: number;
  font: string;
  font_size_pt: number;
  leading: number;
  /** Line height in mm = fontSize(pt) → mm × leading. */
  line_height_mm: number;
}

export function buildMetadata(cfg: PageConfig): PageMetadata {
  const { width, height } = pageDimensions(cfg);
  const content = contentBox(cfg);
  return {
    paper_size: cfg.paper,
    orientation: cfg.orientation,
    width_mm: width,
    height_mm: height,
    margin_mm: { ...cfg.margin },
    padding_mm: cfg.padding,
    content_width_mm: content.width,
    content_height_mm: content.height,
    font: cfg.font,
    font_size_pt: cfg.fontSize,
    leading: cfg.leading,
    line_height_mm: round1(cfg.fontSize * PT_TO_MM * cfg.leading),
  };
}

export function metadataToJSON(meta: PageMetadata): string {
  return JSON.stringify(meta, null, 2);
}
