import React from 'react'
import Form from '../components/Form'
import Transactions from '../components/transactions/Transactions'

const Home = () => {
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

export default Home