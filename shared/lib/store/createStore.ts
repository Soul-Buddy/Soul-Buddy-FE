import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

export function createPersistedStore<T>(
  initializer: StateCreator<T>,
  options: PersistOptions<T>
) {
  return create<T>()(persist(initializer, options));
}

export { create } from "zustand";
