// Derives upload-ready metadata from a PageConfig. This is generated output —
// the PageConfig is the source of truth; metadata is never edited directly.

import type { FooterConfig, HeaderConfig, PageConfig } from "../types";
import { contentBox, pageDimensions, PT_TO_MM, round1 } from "./paper";

export interface TemplateMetadata {
  template_name: string;
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
  header_enabled: boolean;
  logo: string;
  footer_enabled: boolean;
  page_number: string;
}

export function buildMetadata(
  cfg: PageConfig,
  header: HeaderConfig,
  footer: FooterConfig,
  name: string,
): TemplateMetadata {
  const { width, height } = pageDimensions(cfg);
  const content = contentBox(cfg);
  return {
    template_name: name,
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
    header_enabled: header.enabled,
    logo:
      header.enabled && header.logo
        ? header.logoSrc
          ? "image"
          : "placeholder"
        : "off",
    footer_enabled: footer.enabled,
    page_number: footer.enabled && footer.pageNum ? footer.pageNumPos : "off",
  };
}

export function metadataToJSON(meta: TemplateMetadata): string {
  return JSON.stringify(meta, null, 2);
}
