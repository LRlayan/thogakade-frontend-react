import {Customer} from "../models/Customer.ts";
import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const initialState : Customer[] = [];

const api = axios.create({
    baseURL : "http://localhost:3002/customer"
});

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: Customer) => {
        try {
            const response = await api.post('/post',customer);
            return response.data;
        } catch (e) {
            return console.log('failed save customer', e);
        }
    }
);

export const getAllCustomer = createAsyncThunk(
    'customer/getAllCustomer',
    async () => {
        try {
            const response = await api.get('/getAll');
            return response.data;
        } catch (e) {
            console.log("failed to get customers!",e);
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer: Customer) => {
        try {
            const response = await api.put(`/update/${customer.customerId}`,customer);
            return response.data;
        } catch (e) {
            return console.log('failed to update customer ', e);
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (customerId : String) => {
        try {
            return await api.delete(`/delete/${customerId}`);
        } catch (e) {
            console.log("Failed to delete customer!",e);
        }
    }
)

const customerSlice = createSlice({
   name:'customer',
   initialState: initialState,
    reducers: {},
   extraReducers: (builder) => {
       builder
           .addCase(saveCustomer.fulfilled, (state,action) => {
               state.push(action.payload);
           })
           .addCase(saveCustomer.pending,() => {
               console.log("pending save customer");
           })
           .addCase(saveCustomer.rejected,() => {
               console.log("rejected save customer");
           })
           .addCase(getAllCustomer.fulfilled,(state,action) => {
               return action.payload || [];
           })
           .addCase(getAllCustomer.pending,() => {
               console.log("pending get all customers");
           })
           .addCase(getAllCustomer.rejected, () => {
               console.log("rejected get all customers");
           })
           .addCase(updateCustomer.fulfilled, (state,action) => {
               const index = state.findIndex(c => c.customerId === action.payload.customerId);
               if (index !== -1) {
                   state[index] = action.payload;
               }
           })
           .addCase(updateCustomer.pending, () => {
               console.log("Pending to update customer");
           })
           .addCase(updateCustomer.rejected, () => {
               console.log("Rejected to update customer");
           })
           .addCase(deleteCustomer.fulfilled, (state,action) => {
               return state.filter(c => c.customerId !== action.meta.arg);
           })
           .addCase(deleteCustomer.pending, () => {
               console.log("Pending to delete Customer !");
           })
           .addCase(deleteCustomer.rejected, () => {
               console.log("Rejected to delete customer");
           })
   }
});

export default customerSlice.reducer;

