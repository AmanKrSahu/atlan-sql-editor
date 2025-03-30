import { create } from "zustand";

interface Tab {
  id: string;
  title: string;
  language: string;
  value: string;
}

interface EditorStore {
  activeTabId: string | null;
  tabs: Tab[];
  setActiveTabId: (id: string | null) => void;
  setTabs: (tabs: Tab[]) => void;
  updateTabValue: (id: string, value: string) => void;
  createNewTab: () => void;
  createNewTabWithContent: (content: string) => void;
}

export const useEditorStore = create<EditorStore>(set => ({
  activeTabId: null,
  tabs: [],
  setActiveTabId: id => set({ activeTabId: id }),
  setTabs: tabs => set({ tabs }),
  updateTabValue: (id, value) =>
    set(state => ({
      tabs: state.tabs.map(tab => (tab.id === id ? { ...tab, value } : tab)),
    })),
  createNewTab: () =>
    set(state => {
      const newTab: Tab = {
        id: `tab-${Date.now()}`,
        title: `Query ${state.tabs.length + 1}`,
        language: "sql",
        value: "-- Write your SQL query here\nSELECT * FROM categories;",
      };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),
  createNewTabWithContent: content =>
    set(state => {
      const newTab: Tab = {
        id: `tab-${Date.now()}`,
        title: `Query ${state.tabs.length + 1}`,
        language: "sql",
        value: content,
      };
      return {
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
      };
    }),
}));
