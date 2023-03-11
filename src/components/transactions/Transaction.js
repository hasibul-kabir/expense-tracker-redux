import React from 'react';

const Transaction = ({ transaction }) => {
    const { name, type, amount } = transaction || {};
    return (
        <ul>
            <li className={`transaction ${type}`}>
                <p>{name}</p>
                <div className="right">
                    <p>৳ {amount}</p>
                    <button className="link">
                        <img
                            className="icon"
                            src="./images/edit.svg"
                        />
                    </button>
                    <button className="link">
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