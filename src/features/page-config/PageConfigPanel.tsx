import type { Margins, PageConfig, PaperSize } from "../../types";
import { FONT_OPTIONS, contentBox, pageDimensions } from "../../lib/paper";
import {
  Field,
  Hint,
  NumberStepper,
  Section,
  Segmented,
  Select,
  Slider,
} from "../../components/controls";

interface Props {
  config: PageConfig;
  onChange: (patch: Partial<PageConfig>) => void;
}

const PAPER_OPTIONS: PaperSize[] = ["A1", "A2", "A3", "A4"];

export function PageConfigPanel({ config, onChange }: Props) {
  const setMargin = (side: keyof Margins, value: number) =>
    onChange({ margin: { ...config.margin, [side]: value } });

  const dim = pageDimensions(config);
  const content = contentBox(config);

  return (
    <div className="panel-scroll">
      <Section title="Khổ giấy">
        <Field label="Kích thước">
          <Segmented
            value={config.paper}
            options={PAPER_OPTIONS}
            onChange={(paper) => onChange({ paper })}
          />
        </Field>
        <Field label="Hướng giấy">
          <Segmented
            value={config.orientation}
            options={[
              { value: "portrait", label: "Dọc" },
              { value: "landscape", label: "Ngang" },
            ]}
            onChange={(orientation) => onChange({ orientation })}
          />
        </Field>
        <div className="dim-readout">
          {dim.width} × {dim.height} mm
        </div>
      </Section>

      <Section title="Lề trang" action={<span className="sec-unit">mm</span>}>
        <div className="grid-2">
          <Field label="Trên" inline>
            <NumberStepper
              value={config.margin.top}
              min={5}
              max={50}
              onChange={(v) => setMargin("top", v)}
            />
          </Field>
          <Field label="Dưới" inline>
            <NumberStepper
              value={config.margin.bottom}
              min={5}
              max={50}
              onChange={(v) => setMargin("bottom", v)}
            />
          </Field>
          <Field label="Trái" inline>
            <NumberStepper
              value={config.margin.left}
              min={5}
              max={50}
              onChange={(v) => setMargin("left", v)}
            />
          </Field>
          <Field label="Phải" inline>
            <NumberStepper
              value={config.margin.right}
              min={5}
              max={50}
              onChange={(v) => setMargin("right", v)}
            />
          </Field>
        </div>
        <Field label="Đệm nội dung (padding)">
          <Slider
            value={config.padding}
            min={0}
            max={30}
            step={1}
            unit="mm"
            onChange={(padding) => onChange({ padding })}
          />
        </Field>
      </Section>

      <Section title="Kiểu chữ">
        <Field label="Phông chữ">
          <Select
            value={config.font}
            options={FONT_OPTIONS}
            onChange={(font) => onChange({ font })}
          />
        </Field>
        <Field label="Cỡ chữ thân">
          <Slider
            value={config.fontSize}
            min={9}
            max={14}
            step={0.5}
            unit="pt"
            onChange={(fontSize) => onChange({ fontSize })}
          />
        </Field>
        <Field label="Giãn dòng">
          <Slider
            value={config.leading}
            min={1}
            max={2}
            step={0.1}
            unit="×"
            onChange={(leading) => onChange({ leading })}
          />
        </Field>
      </Section>

      <Hint>
        Khung kẻ cam trên trang là vùng lề; vùng đệm nội dung nằm bên trong. Vùng
        khả dụng hiện tại: <b>{content.width}</b> × <b>{content.height}</b> mm.
      </Hint>
    </div>
  );
}
