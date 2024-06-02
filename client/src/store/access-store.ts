import { create } from "zustand";

type Store = {
    hasAccess: boolean;
    setHasAccess: (value: boolean) => void;
}

const accessStore = create<Store>((set) => ({
    hasAccess: false,
    setHasAccess: (value: boolean) => set({ hasAccess: value }),
}));

export default accessStore;
