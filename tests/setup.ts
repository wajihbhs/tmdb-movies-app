import { vi } from "vitest";
import { ref, computed, reactive, watch, onMounted, onUnmounted, defineComponent } from "vue";

globalThis.ref = ref;
globalThis.computed = computed;
globalThis.reactive = reactive;
globalThis.watch = watch;
globalThis.onMounted = onMounted;
globalThis.onUnmounted = onUnmounted;
globalThis.defineComponent = defineComponent;

if (globalThis.crypto?.randomUUID) {
  vi.spyOn(globalThis.crypto, "randomUUID").mockImplementation(() => "test-uuid");
}

globalThis.localStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  clear: vi.fn()
};
