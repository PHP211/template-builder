// Domain types for the report template. Kept framework-agnostic so the
// metadata generator and preview can share a single source of truth.

export type PaperSize = "A1" | "A2" | "A3" | "A4";
export type Orientation = "portrait" | "landscape";
export type Align = "left" | "center" | "right";

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

export interface HeaderConfig {
  enabled: boolean;
  /** Show a logo box on the left. */
  logo: boolean;
  /** Logo image as a data URL; empty = show a placeholder box. */
  logoSrc: string;
  /** Bold organisation line. */
  line1: string;
  /** Secondary organisation line. */
  line2: string;
  /** Append the report title under the org lines. */
  showTitle: boolean;
  /** Draw a rule under the header. */
  rule: boolean;
  align: Align;
}

export interface FooterConfig {
  enabled: boolean;
  /** Show the page number. */
  pageNum: boolean;
  pageNumPos: Align;
  /** Centre note text. */
  text: string;
  /** Show the print date on the left. */
  showDate: boolean;
  /** Draw a rule above the footer. */
  rule: boolean;
}
