import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {Item} from "../models/Item.ts";

const initialState : Item[] = [];

const api = axios.create({
    baseURL: "http://localhost:3002/item"
});

export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item: Item) => {
        try {
            const response = await api.post('/post',item);
            return response.data;
        } catch (e) {
            return console.log('failed to save item', e);
        }
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (item: Item) => {
        try {
            const response = await api.put('/update',item);
            return response.data;
        } catch (e) {
            return console.log('failed to update item');
        }
    }
)

const itemSlice = createSlice({
    name:'item',
    initialState:initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled,(state,action) => {
                state.push(action.payload);
            })
            .addCase(saveItem.pending,() => {
                console.log("pending to save item!");
            })
            .addCase(saveItem.rejected,() => {
                console.log("rejected to save item!");
            })
            .addCase(updateItem.fulfilled, (state,action) => {
                const index = state.findIndex(i => i.itemId === action.payload.itemId);
                if (index !== -1) {
                    state[index] = action.payload;
                }
            })
            .addCase(updateItem.pending,() => {
                console.log("pending to update customer!");
            })
            .addCase(updateItem.rejected,() => {
                console.log("rejected to delete customer!");
            })
    }
});

export default itemSlice.reducer;