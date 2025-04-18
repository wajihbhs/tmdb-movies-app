import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BaseButton from "@/components/core/BaseButton.vue";

describe("BaseButton.vue", () => {
  it("renders the label of the button", () => {
    const wrapper = mount(BaseButton, {
      props: { label: "Click Me" }
    });

    expect(wrapper.text()).toContain("Click Me");
  });

  it("renders slot content when it s not empty", () => {
    const wrapper = mount(BaseButton, {
      props: { label: "clickOnMe" },
      slots: {
        default: "<span>Slot content</span>"
      }
    });

    expect(wrapper.text()).toContain("Slot content");
    expect(wrapper.text()).not.toContain("clickOnMe");
  });

  it("applies props correctly to the button", () => {
    const wrapper = mount(BaseButton, {
      props: {
        block: true,
        color: "primary",
        variant: "outlined"
      }
    });

    expect(wrapper.props("block")).toBe(true);
    expect(wrapper.props("color")).toBe("primary");
    expect(wrapper.props("variant")).toBe("outlined");
  });

  it("emits click event on click", async () => {
    const wrapper = mount(BaseButton, {
      props: { label: "Click Me" }
    });

    await wrapper.trigger("click");
    expect(wrapper.emitted()).toHaveProperty("click");
    expect(wrapper.emitted("click")?.length).toBe(1);
  });
});
