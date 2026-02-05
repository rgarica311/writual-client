import { create } from 'zustand';

interface SideNavCollapsedState {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

export const useSideNavCollapsedStore = create<SideNavCollapsedState>()((set) => ({
  collapsed: false,
  setCollapsed: (collapsed) => set({ collapsed }),
  toggle: () => set((s) => ({ collapsed: !s.collapsed })),
}));
