import {configureStore} from "@reduxjs/toolkit";
import customerReducer from "../reducer/CustomerReducer";
import itemReducer from "../reducer/ItemReducer.ts";

export const store = configureStore({
    reducer :{
        customer : customerReducer,
        item : itemReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
