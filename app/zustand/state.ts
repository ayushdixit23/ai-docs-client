import { create } from 'zustand'

interface AppState {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (value: boolean) => void;
    setIsMessageLoading: (value: boolean) => void;
    isMessageLoading:boolean
}

const useAppStates = create<AppState>((set) => ({
    isSidebarOpen: true,
    isMessageLoading:false,
    setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
    setIsMessageLoading: (value: boolean) => set({ isMessageLoading: value }),
}));

export default useAppStates;
