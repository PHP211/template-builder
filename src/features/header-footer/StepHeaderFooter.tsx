import { useRef, useState } from "react";
import type { Align, FooterConfig, HeaderConfig } from "../../types";
import {
  Field,
  Hint,
  Section,
  Segmented,
  TextArea,
  TextInput,
  Toggle,
} from "../../components/controls";

interface Props {
  header: HeaderConfig;
  footer: FooterConfig;
  onHeaderChange: (patch: Partial<HeaderConfig>) => void;
  onFooterChange: (patch: Partial<FooterConfig>) => void;
}

type Zone = "header" | "footer";

const ALIGN_OPTIONS: { value: Align; label: string }[] = [
  { value: "left", label: "Trái" },
  { value: "center", label: "Giữa" },
  { value: "right", label: "Phải" },
];

export function StepHeaderFooter({
  header,
  footer,
  onHeaderChange,
  onFooterChange,
}: Props) {
  const [zone, setZone] = useState<Zone>("header");

  return (
    <div className="panel-scroll">
      <div className="zone-switch">
        <button
          type="button"
          className={zone === "header" ? "on" : ""}
          onClick={() => setZone("header")}
        >
          Đầu trang
        </button>
        <button
          type="button"
          className={zone === "footer" ? "on" : ""}
          onClick={() => setZone("footer")}
        >
          Chân trang
        </button>
      </div>

      {zone === "header" ? (
        <>
          <Section
            title="Đầu trang"
            action={
              <Toggle value={header.enabled} onChange={(v) => onHeaderChange({ enabled: v })} />
            }
          >
            <div className={header.enabled ? "" : "disabled"}>
              <Field label="Hiển thị logo" inline>
                <Toggle value={header.logo} onChange={(v) => onHeaderChange({ logo: v })} />
              </Field>
              {header.logo && (
                <Field label="Ảnh logo">
                  <LogoInput
                    value={header.logoSrc}
                    onChange={(logoSrc) => onHeaderChange({ logoSrc })}
                  />
                </Field>
              )}
              <Field label="Dòng 1 (đậm)">
                <TextInput value={header.line1} onChange={(v) => onHeaderChange({ line1: v })} />
              </Field>
              <Field label="Dòng 2">
                <TextInput value={header.line2} onChange={(v) => onHeaderChange({ line2: v })} />
              </Field>
              <Field label="Kèm tên báo cáo" inline>
                <Toggle
                  value={header.showTitle}
                  onChange={(v) => onHeaderChange({ showTitle: v })}
                />
              </Field>
              <Field label="Căn chữ">
                <Segmented
                  size="sm"
                  value={header.align}
                  options={ALIGN_OPTIONS}
                  onChange={(align) => onHeaderChange({ align })}
                />
              </Field>
              <Field label="Đường kẻ dưới" inline>
                <Toggle value={header.rule} onChange={(v) => onHeaderChange({ rule: v })} />
              </Field>
            </div>
          </Section>
          <Hint>Ô LOGO trong khung lề là chỗ đặt logo chi nhánh khi xuất bản.</Hint>
        </>
      ) : (
        <Section
          title="Chân trang"
          action={
            <Toggle value={footer.enabled} onChange={(v) => onFooterChange({ enabled: v })} />
          }
        >
          <div className={footer.enabled ? "" : "disabled"}>
            <Field label="Số trang" inline>
              <Toggle value={footer.pageNum} onChange={(v) => onFooterChange({ pageNum: v })} />
            </Field>
            <Field label="Vị trí số trang">
              <Segmented
                size="sm"
                value={footer.pageNumPos}
                options={ALIGN_OPTIONS}
                onChange={(pageNumPos) => onFooterChange({ pageNumPos })}
              />
            </Field>
            <Field label="Ngày in" inline>
              <Toggle value={footer.showDate} onChange={(v) => onFooterChange({ showDate: v })} />
            </Field>
            <Field label="Ghi chú chân trang">
              <TextArea value={footer.text} rows={2} onChange={(v) => onFooterChange({ text: v })} />
            </Field>
            <Field label="Đường kẻ trên" inline>
              <Toggle value={footer.rule} onChange={(v) => onFooterChange({ rule: v })} />
            </Field>
          </div>
        </Section>
      )}
    </div>
  );
}

function LogoInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onChange(String(reader.result));
      reader.readAsDataURL(file);
    }
    // Reset so picking the same file again still fires onChange.
    e.target.value = "";
  };

  return (
    <div className="logo-input">
      {value ? (
        <img className="logo-thumb" src={value} alt="Logo" />
      ) : (
        <div className="logo-thumb empty">—</div>
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
      <button type="button" className="mini-btn" onClick={() => inputRef.current?.click()}>
        {value ? "Đổi ảnh" : "Tải ảnh"}
      </button>
      {value && (
        <button type="button" className="mini-btn ghost" onClick={() => onChange("")}>
          Xóa
        </button>
      )}
    </div>
  );
}
