import type { CSSProperties } from "react";
import type { HeaderConfig } from "../types";
import type { PreviewUnits } from "../lib/paper";

export function PaperHeader({
  header,
  title,
  u,
}: {
  header: HeaderConfig;
  title: string;
  u: PreviewUnits;
}) {
  const style: CSSProperties = {
    gap: u.mm(4),
    paddingBottom: u.pt(6),
    marginBottom: u.pt(8),
    borderBottomWidth: header.rule ? u.pt(1) : 0,
  };
  const logoStyle: CSSProperties = {
    width: u.mm(16),
    height: u.mm(16),
    fontSize: u.pt(5),
  };
  return (
    <div className={"r-header" + (header.rule ? " ruled" : "")} style={style}>
      {header.logo &&
        (header.logoSrc ? (
          <img className="r-logo-img" src={header.logoSrc} alt="Logo" style={logoStyle} />
        ) : (
          <div className="r-logo" style={logoStyle}>
            LOGO
          </div>
        ))}
      <div className="r-org" style={{ textAlign: header.align }}>
        <div className="r-org1" style={{ fontSize: u.pt(11.5) }}>
          {header.line1}
        </div>
        <div className="r-org2" style={{ fontSize: u.pt(9) }}>
          {header.line2}
        </div>
        {header.showTitle && (
          <div className="r-org3" style={{ fontSize: u.pt(8) }}>
            {title}
          </div>
        )}
      </div>
    </div>
  );
}
