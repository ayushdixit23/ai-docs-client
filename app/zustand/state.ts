import { create } from 'zustand'

interface AppState {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
}

const useAppStates = create<AppState>((set) => ({
    isSidebarOpen: true,
    setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
}));

export default useAppStates;
