import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../components/Form'
import Transactions from '../components/transactions/Transactions'
import { fetchTransactions } from '../redux/features/transactionSlice'
import numberWithCommas from '../utilityFunctions/NumWithCommas'

const Home = () => {
    const dispatch = useDispatch();
    const { transactions } = useSelector((state) => state.transaction)

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch]);

    let expense = 0;

    transactions.forEach(element => {
        if (element?.type === "income") {
            expense += element?.amount;
        } else if (element?.type === "expense") {
            expense -= element?.amount
        }
    });



    return (
        <div className="main">
            <div className="container">
                <div className="top_card">
                    <p>Your Current Balance</p>
                    <h3>
                        <span>৳ </span>
                        <span>{numberWithCommas(expense)}</span>
                    </h3>
                </div>

                <Form />
                <Transactions />
            </div>
        </div>


    )
}

export default Home;