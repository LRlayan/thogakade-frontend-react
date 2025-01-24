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
            const response = await api.put(`/update/${item.itemId}`,item);
            return response.data;
        } catch (e) {
            return console.log('failed to update item');
        }
    }
)

export const deleteItem = createAsyncThunk(
    'item/deleteCustomer',
    async (itemId: string) => {
        try {
            const response = await api.delete(`/delete/${itemId}`);
            return response.data;
        } catch (e) {
            return console.log('failed to delete item');
        }
    }
)

export const getALlItem = createAsyncThunk(
    'item/getAllItem',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (e) {
            return console.log("failed to get items",e);
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
            .addCase(deleteItem.fulfilled,(state,action) => {
                return state.filter(i => i.itemId !== action.meta.arg);
            })
            .addCase(deleteItem.pending,() => {
                console.log("pending to delete customer!");
            })
            .addCase(deleteItem.rejected,() => {
                console.log("rejected to delete customer!");
            })
            .addCase(getALlItem.fulfilled,(state,action) => {
                return action.payload || [];
            })
            .addCase(getALlItem.pending,() => {
                console.log("Pending getAll items");
            })
            .addCase(getALlItem.rejected,() => {
                console.log("rejected getAll item");
            })
    }
});

export default itemSlice.reducer;