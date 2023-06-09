import React from 'react';
import { useDispatch } from 'react-redux';
import { editActive, removeTransactions } from '../../redux/features/transactionSlice';

const Transaction = ({ transaction }) => {
    const { id, name, type, amount } = transaction || {};
    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(editActive({
            id,
            name,
            type,
            amount
        }))
    }

    const handleDelete = () => {
        dispatch(removeTransactions(id))
    }

    return (
        <ul>
            <li className={`transaction ${type}`}>
                <p>{name}</p>
                <div className="right">
                    <p>৳ {amount}</p>
                    <button className="link" onClick={handleEdit}>
                        <img
                            className="icon"
                            src="./images/edit.svg"
                        />
                    </button>
                    <button className="link" onClick={handleDelete}>
                        <img
                            className="icon"
                            src="./images/delete.svg"
                        />
                    </button>
                </div>
            </li>
        </ul>
    )
}

export default Transaction