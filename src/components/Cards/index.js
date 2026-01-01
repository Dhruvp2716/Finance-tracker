import React from 'react'
import { Row, Card, } from 'antd';
import './styles.css';
import Button from '../Button';

/*************  ✨ Codeium Command ⭐  *************/
/******  44252628-7231-4142-96ac-89513d62f48e  *******/
function Cards({income,expense,currentBalance,showExpenseModal,showIncomeModal}) {
  return (
    <div className='div'>
        <Row className='row'>
            <Card className="card" title="Current Balance" >
                <p>₹{currentBalance}</p>
                <Button text={"Reset Balance"} alt={true}/>
            </Card>
            <Card className="card" title="Total Income" >
                <p>₹{income}</p>
                <Button text={"Add Income"} alt={true} onClick={showIncomeModal}/>
            </Card>
            <Card className="card" title="Total Expense" >
                <p>₹{expense}</p>
                <Button text={"Add Expense"} alt={true} onClick={showExpenseModal}/>
            </Card>
            
        </Row>
    </div >
  )
}

export default Cards