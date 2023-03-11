import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Form from '../components/Form'
import Transactions from '../components/transactions/Transactions'
import { fetchTransactions } from '../redux/features/transactionSlice'

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTransactions())
    }, [dispatch])

    return (
        <div className="main">
            <div className="container">
                <div className="top_card">
                    <p>Your Current Balance</p>
                    <h3>
                        <span>৳</span>
                        <span>10500</span>
                    </h3>
                </div>

                <Form />
                <Transactions />
            </div>
        </div>


    )
}

export default Home;