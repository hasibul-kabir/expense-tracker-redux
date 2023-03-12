import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setTransactions } from '../redux/features/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();

    //reset input field
    const reset = () => {
        setName('')
        setType('')
        setAmount('')
    }

    const handleSubmit = () => {
        dispatch(setTransactions({
            name,
            type,
            amount: Number(amount)
        }))
        reset();
    }

    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <div className="form-group">
                <label for="transaction_name">Name</label>
                <input
                    required
                    type="text"
                    name="transaction_name"
                    placeholder="My Salary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group radio">
                <label for="transaction_type">Type</label>
                <div className="radio_group">
                    <input

                        type="radio"
                        value="income"
                        name="transaction_type"
                        checked={type === "income"}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <label for="transaction_type">Income</label>
                </div>
                <div className="radio_group">
                    <input

                        type="radio"
                        value="expense"
                        name="transaction_type"
                        placeholder="Expense"
                        checked={type === "expense"}
                        onChange={(e) => setType(e.target.value)}
                    />
                    <label for="transaction_type">Expense</label>
                </div>
            </div>

            <div className="form-group">
                <label for="transaction_amount">Amount</label>
                <input
                    required
                    type="number"
                    placeholder="300"
                    name="transaction_amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>

            <button className="btn" onClick={handleSubmit}>Add Transaction</button>

            <button className="btn cancel_edit">Cancel Edit</button>
        </div>
    )
}

export default Form