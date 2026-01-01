import React from 'react'
import noTransactionImage from '../../assets/image.png';
import './styles.css'

function NoTransactions() {
  return (
    <div className='noTrans'>
        <img src={noTransactionImage} alt={noTransactionImage} className='image'/>
        <p >You have no transactions currently.</p>
    </div>

  )
}

export default NoTransactions;