import "../../src/components/color-swatches/color-swatches.js";
import "../../src/components/color-swatch/color-swatch.js";
import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import type { UUIColorSwatchesElement } from "../../src/components/color-swatches/color-swatches.element.js";

// Demo-only story for the fork: sets `value` on an already rendered
// <uui-color-swatches> from outside, the way an app would.

const swatches = [
  { label: "Black", value: "#060606" },
  { label: "Sunglow", value: "#fad634" },
  { label: "Malibu", value: "#3879ff" },
  { label: "Maroon Flush", value: "#d42054" },
  { label: "Jungle Green", value: "#2bc37c" },
];

const meta: Meta = {
  id: "demo-color-swatches-value",
  title: "Demo/Color Swatches Programmatic Value",
};

export default meta;

const setValue = (event: Event, value: string) => {
  const root = (event.target as HTMLElement).closest(".demo")!;
  const element =
    root.querySelector<UUIColorSwatchesElement>("uui-color-swatches")!;
  element.value = value;
  root.querySelector("#current-value")!.textContent = value || "(empty)";
};

const onChange = (event: Event) => {
  const element = event.target as UUIColorSwatchesElement;
  element.closest(".demo")!.querySelector("#current-value")!.textContent =
    element.value || "(empty)";
};

export const SetValueFromOutside: StoryObj = {
  render: () => html`
    <div class="demo" style="display:flex;flex-direction:column;gap:16px;">
      <uui-color-swatches
        label="My color palette"
        value="#060606"
        @change=${onChange}
      >
        ${swatches.map(
          (swatch) =>
            html`<uui-color-swatch
              label=${swatch.label}
              .value=${swatch.value}
              show-label
            ></uui-color-swatch>`,
        )}
      </uui-color-swatches>
      <div style="display:flex;gap:8px;">
        <button
          id="set-sunglow"
          type="button"
          @click=${(e: Event) => setValue(e, "#fad634")}
        >
          Set value to Sunglow (#fad634)
        </button>
        <button
          id="set-malibu"
          type="button"
          @click=${(e: Event) => setValue(e, "#3879ff")}
        >
          Set value to Malibu (#3879ff)
        </button>
        <button
          id="clear"
          type="button"
          @click=${(e: Event) => setValue(e, "")}
        >
          Clear value
        </button>
      </div>
      <p>value: <strong id="current-value">#060606</strong></p>
    </div>
  `,
};
