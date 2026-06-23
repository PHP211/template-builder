import type { FooterConfig, HeaderConfig } from "../../types";

export const DEFAULT_HEADER: HeaderConfig = {
  enabled: true,
  logo: true,
  logoSrc: "",
  line1: "NGÂN HÀNG TMCP VIỆT TÍN",
  line2: "Chi nhánh Hoàn Kiếm — Hà Nội",
  showTitle: false,
  rule: true,
  align: "left",
};

export const DEFAULT_FOOTER: FooterConfig = {
  enabled: true,
  pageNum: true,
  pageNumPos: "right",
  text: "Tài liệu nội bộ — không phổ biến ra ngoài",
  showDate: true,
  rule: true,
};
