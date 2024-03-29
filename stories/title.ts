import { mountStoreDevtool } from "simple-zustand-devtools";
import { create } from "zustand";

interface DashboardTitleStore {
  title: string;
  changeTitle: (newTitle: string) => void;
}

export const useDashboardTitle = create<DashboardTitleStore>()((set) => ({
  title: "",
  changeTitle: (newTitle: string) =>
    set((state) => ({
      title: newTitle,
    })),
}));

if (process.env.NODE_ENV === "development") {
  mountStoreDevtool("DashboardTitleStore", useDashboardTitle);
}
