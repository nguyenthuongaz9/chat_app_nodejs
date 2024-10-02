import { create } from "zustand";



export type modelType = "USER_MODAL" | "SHEET_SIDEBAR" | "CONVERSATION_SIDEBAR";



interface useModalStore{
    type:modelType ,
    open: boolean;
    onOpen:(open: boolean, type:modelType) => void;
    onClose:() => void;
}



export const useModalStore = create<useModalStore>((set)=> ({
    type: "USER_MODAL",
    open: false,
    onOpen: (open, type) => set(state => ({...state,  open, type })),
    onClose: () => set(state => ({...state, open: false }))
}))