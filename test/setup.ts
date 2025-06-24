import { vi } from 'vitest';
import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';

global.defineStore = defineStore;
global.ref = ref;
global.reactive = reactive;

global.useToast = vi.fn(() => ({
  add: vi.fn(),
}));

vi.mock('#app', () => ({
  useToast: () => ({
    add: vi.fn(),
  }),
}));