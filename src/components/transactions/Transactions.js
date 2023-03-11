import React from 'react'
import { useSelector } from 'react-redux'
import Transaction from './Transaction'

const Transactions = () => {
    const { transactions, isLoading, isError, error } = useSelector((state) => state.transaction);


    let content;
    if (isLoading) content = <p>Loading...</p>
    if (!isLoading && isError) content = <p>{error}</p>
    if (!isLoading && !isError && transactions?.length > 0) {
        content = transactions.map((transaction) =>
            <Transaction key={transaction.id} transaction={transaction} />
        )
    }
    if (!isLoading && !isError && transactions.length === 0) content = <p>No Transactions Added</p>

    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                {
                    content
                }
            </div>
        </>
    )
}

export default Transactions