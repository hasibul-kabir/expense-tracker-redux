import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { editInActive, setTransactions, updateTransactions } from '../redux/features/transactionSlice';

const Form = () => {
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch();
    const { dataToEdit, isLoading } = useSelector((state) => state.transaction)

    //reset input field
    const reset = () => {
        setName('')
        setType('')
        setAmount('')
    }

    //fill with data to edit
    useEffect(() => {
        const { id, name, type, amount } = dataToEdit || {};
        if (id) {
            setEditMode(true)
            setName(name)
            setType(type)
            setAmount(amount)
        } else {
            setEditMode(false);
            reset()
        }
    }, [dataToEdit])



    const handleSubmit = () => {
        dispatch(setTransactions({
            name,
            type,
            amount: Number(amount)
        }))
        reset();
    }

    const handleUpdate = () => {
        dispatch(updateTransactions({
            id: dataToEdit?.id,
            data: {
                name,
                type,
                amount: Number(amount)
            }
        }));

        setEditMode(false);
        reset();
    }

    const handleCancel = () => {
        setEditMode(false);
        reset();
        dispatch(editInActive());
    }

    return (
        <div className="form">
            <h3>{editMode ? 'Edit' : 'Add new'} transaction</h3>

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



            <button className="btn" disabled={isLoading} onClick={editMode ? handleUpdate : handleSubmit}>{editMode ? 'Update Transaction' : 'Add Transaction'}</button>
            {
                editMode && <button className="btn cancel_edit" onClick={handleCancel}>Cancel Edit</button>
            }

        </div>
    )
}

export default Form