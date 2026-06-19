// Paper geometry helpers. Everything physical is expressed in millimetres;
// conversion to screen units happens only in the preview layer.

import type { Orientation, PaperSize, PageConfig } from "../types";

/** ISO A-series dimensions (portrait), in millimetres. */
export const PAPER_MM: Record<PaperSize, { w: number; h: number }> = {
  A1: { w: 594, h: 841 },
  A2: { w: 420, h: 594 },
  A3: { w: 297, h: 420 },
  A4: { w: 210, h: 297 },
};

/** Friendly font name → CSS font-family stack (web-font fallbacks included). */
export const FONT_STACK: Record<string, string> = {
  "Times New Roman": '"Tinos","Times New Roman",serif',
  Arial: '"Arimo",Arial,sans-serif',
  "Be Vietnam Pro": '"Be Vietnam Pro",sans-serif',
  Roboto: '"Roboto",sans-serif',
  Tahoma: "Tahoma,sans-serif",
};

export const FONT_OPTIONS = Object.keys(FONT_STACK);

/** 1 typographic point = 1/72 inch = 0.352777… mm. */
export const PT_TO_MM = 25.4 / 72;

/** Physical page size in mm, accounting for orientation. */
export function pageDimensions(cfg: PageConfig): { width: number; height: number } {
  const dim = PAPER_MM[cfg.paper];
  const landscape = cfg.orientation === "landscape";
  return {
    width: landscape ? dim.h : dim.w,
    height: landscape ? dim.w : dim.h,
  };
}

/** Usable content box (page minus margins minus padding), in mm. */
export function contentBox(cfg: PageConfig): { width: number; height: number } {
  const { width, height } = pageDimensions(cfg);
  const pad = cfg.padding;
  return {
    width: round1(width - cfg.margin.left - cfg.margin.right - pad * 2),
    height: round1(height - cfg.margin.top - cfg.margin.bottom - pad * 2),
  };
}

export function resolveFont(font: string): string {
  return FONT_STACK[font] ?? "serif";
}

export function orientationLabel(o: Orientation): string {
  return o === "portrait" ? "Dọc" : "Ngang";
}

export function round1(n: number): number {
  return Math.round(n * 10) / 10;
}
