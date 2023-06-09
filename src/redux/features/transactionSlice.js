import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addTransaction, deleteTransaction, editTransaction, getTransaction } from "./transactionApi"


const initialState = {
    transactions: [],
    isLoading: false,
    isError: false,
    error: '',
    dataToEdit: {}
}

//create async thunk
export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async () => {
    const transactions = await getTransaction();

    return transactions;
})

export const setTransactions = createAsyncThunk("transaction/setTransactions", async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
})

export const updateTransactions = createAsyncThunk("transaction/updateTransactions", async ({ id, data }) => {
    const transaction = await editTransaction({ id, data });
    return transaction;
})

export const removeTransactions = createAsyncThunk("transaction/removeTransactions", async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
})

//reducer
const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        editActive: (state, action) => {
            state.dataToEdit = action.payload;
        },
        editInActive: (state) => {
            state.dataToEdit = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions = action.payload
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.transactions = []
                state.isError = true
                state.error = action.error?.message
            })
            //add
            .addCase(setTransactions.pending, (state) => {
                state.isLoading = true
                state.isError = false
            })
            .addCase(setTransactions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.transactions.push(action.payload)
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
                const indexToUpdate = state.transactions.findIndex((element) => element.id === action.payload.id);

                state.transactions[indexToUpdate] = action.payload;
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
                state.transactions = state.transactions.filter((element) => element.id !== action.meta.arg)
            })
            .addCase(removeTransactions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.error = action.error?.message
            })
    }
})

export default transactionSlice.reducer;
export const { editActive, editInActive } = transactionSlice.actions;