import { create } from "zustand";

// Boolean value
type BooleanState = {
    boolean: boolean;
    toggle: () => void;
}

export const useBooleanValue = create<BooleanState>((set) => ({
    boolean: true,
    toggle: () => {
        set((state: BooleanState) => ({ boolean: !state.boolean }))
    }
}))

// User data
type UserData = {
    username: string;
    email: string;
    name_en: string;
    id: string;
    picture: string;
}

type UserDataState = {
    userData: UserData;
    setUserData: (data: Partial<UserData>) => void;
    clearUserData: () => void;
}

export const useUserDataStore = create<UserDataState>((set) => ({

    userData: {
        username: '',
        email: '',
        name_en: '',
        id: '',
        picture: ''
    },

    setUserData: (data) => {
        set((state) => ({
            userData: {
                ...state.userData,
                ...data
            }
        }))
    },

    clearUserData: () => {
        set(() => ({
            userData: {
                username: '',
                email: '',
                name_en: '',
                id: '',
                picture: '',
            }
        }))
    }
}))

//