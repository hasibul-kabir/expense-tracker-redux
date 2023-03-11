import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, getTransaction } from "./transactionApi"


const initialState = {
    transaction: [],
    isLoading: false,
    isError: false,
    error: ''
}

//create async thunk
const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async () => {
    const transactions = await getTransaction();

    return transactions;
})

const setTransactions = createAsyncThunk("transaction/fetchTransactions", async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
})

const updateTransactions = createAsyncThunk("transaction/updateTransactions", async ({ id, data }) => {
    const transaction = await addTransaction({ id, data });
    return transaction;
})

const removeTransactions = createAsyncThunk("transaction/removeTransactions", async (id) => {
    const transaction = await addTransaction(id);
    return transaction;
})

//reducer

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transaction = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.transaction = []
                state.isError = true,
                    state.error = action.error?.message
            })
            //add
            .addCase(setTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(setTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.transaction.push(action.payload)
            })
            .addCase(setTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
            //edit
            .addCase(updateTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(updateTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                const indexToUpdate = state.transaction.findIndex((element) => {
                    element.id === action.payload.id
                })
                state.transaction[indexToUpdate] = action.payload
            })
            .addCase(updateTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error.message
            })
            //delete
            .addCase(removeTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(removeTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transaction = state.transaction.filter((element) => element.id !== action.meta.arg)
            })
            .addCase(removeTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
    }
})

export default transactionSlice.reducer;