// Domain types for the report template. Kept framework-agnostic so the
// metadata generator and preview can share a single source of truth.

export type PaperSize = "A1" | "A2" | "A3" | "A4";
export type Orientation = "portrait" | "landscape";

export interface Margins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PageConfig {
  paper: PaperSize;
  orientation: Orientation;
  /** Outer page margins, in millimetres. */
  margin: Margins;
  /** Extra inner padding for body content, in millimetres. */
  padding: number;
  /** Friendly font name (see FONT_STACK). */
  font: string;
  /** Body font size, in points. */
  fontSize: number;
  /** Line spacing as a multiplier of the font size (1 = single). */
  leading: number;
}
