import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducer/CustomerReducer";

export const store = configureStore({
    reducer :{
        customer : customerReducer
    }
})

export type AppDispatch = typeof store.dispatch;
