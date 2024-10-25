import { create } from "zustand";



export type modelType = "USER_MODAL" | "SHEET_SIDEBAR" | "CONVERSATION_SIDEBAR" | 'ADD_GROUP_MODAL' | "UPLOAD_FILE";



interface useModalStore {
    type: modelType,
    open: boolean;
    data?: any;
    onOpen: (open: boolean, type: modelType, data?:any) => void;
    onClose: () => void;
}



export const useModalStore = create<useModalStore>((set) => ({
    type: "USER_MODAL",
    open: false,
    data: null,
    onOpen: (open, type, data) => set(state => ({ ...state, open, type , data })),
    onClose: () => set(state => ({ ...state, open: false }))
}))