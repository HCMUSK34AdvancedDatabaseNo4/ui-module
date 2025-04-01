import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AuthSlice} from "../../models/AuthSlice";

interface LoginProps {
    username: string;
    password: string;
}

const initialState: AuthSlice = {
    isLoggedIn:
        localStorage.getItem("username") !== null &&
        localStorage.getItem("username") !== undefined &&
        localStorage.getItem("username") !== "",
    modalOpen: false,
    username: localStorage.getItem("username") ?? "",
    role: localStorage.getItem("role") ?? "",
};

export const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        updateModal: (state, action: PayloadAction<boolean>) => {
            return {...state, modalOpen: action.payload};
        },
        doLogin: (state, action: PayloadAction<LoginProps>) => {
            if (action.payload.username === "customer" && action.payload.password === "customer") {
                localStorage.setItem("username", "customer");
                localStorage.setItem("role", "CUSTOMER");
                return {
                    ...state,
                    username: "customer",
                    role: "CUSTOMER",
                    modalOpen: false,
                    isLoggedIn: true,
                };
            } else if (action.payload.username === "admin" &&
                action.payload.password === "admin") {
                localStorage.setItem("username", "admin");
                localStorage.setItem("role", "ADMIN");
                return {
                    ...state,
                    username: "admin",
                    role: "ADMIN",
                    modalOpen: false,
                    isLoggedIn: true,
                };
            } else {
                return state;
            }
        },
        doLogout: (state) => {
            localStorage.removeItem("username");
            return {...state, username: "", isLoggedIn: false};
        },
    },
});

export const {updateModal, doLogin, doLogout} = authSlice.actions;
export default authSlice.reducer;
