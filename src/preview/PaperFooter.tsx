import type { CSSProperties } from "react";
import type { Align, FooterConfig } from "../types";
import type { PreviewUnits } from "../lib/paper";

function today(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function PaperFooter({
  footer,
  pageNo,
  pageCount,
  u,
}: {
  footer: FooterConfig;
  pageNo: number;
  pageCount: number;
  u: PreviewUnits;
}) {
  const style: CSSProperties = {
    gap: u.mm(3),
    paddingTop: u.pt(5),
    marginTop: u.pt(8),
    fontSize: u.pt(8),
    borderTopWidth: footer.rule ? u.pt(0.8) : 0,
  };

  // Each of the three slots can carry several pieces; the page number lands in
  // its chosen slot and is joined with whatever else is already there.
  const pageText = footer.pageNum ? `Trang ${pageNo} / ${pageCount}` : "";
  const slot = (pos: Align, base: string) =>
    [base, footer.pageNumPos === pos ? pageText : ""].filter(Boolean).join(" · ");

  return (
    <div className={"r-footer" + (footer.rule ? " ruled" : "")} style={style}>
      <span className="r-foot-l">{slot("left", footer.showDate ? `In ngày: ${today()}` : "")}</span>
      <span className="r-foot-c">{slot("center", footer.text)}</span>
      <span className="r-foot-r">{slot("right", "")}</span>
    </div>
  );
}
