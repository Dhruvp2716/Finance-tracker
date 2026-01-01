import { Line, Pie } from '@ant-design/plots';
import React from 'react';
import './styles.css'

function ChartComponent({ sortedTransaction }) {
    const lineData = sortedTransaction.map((item) => ({
        date: item.date,
        amount: item.amount,
    }));

    const expenseData = sortedTransaction
        .filter((transaction) => transaction.type === 'Expense')
        .map((item) => ({
            amount: item.amount,
            category: item.category , 
        }));

    const lineConfig = {
        data: lineData,
        xField: 'date',
        yField: 'amount',
        height : 300,
          
    };

    const pieConfig = {
        data: expenseData,
        innerRadius: 0.6,
        angleField: 'amount',
        colorField: 'category',
        height : 300,

    };

    return (
        <div className='chart'>
            <div className='lineChart'>
                <h2>Transaction History</h2>
                <Line {...lineConfig} className="lline"/>
            </div>
            <div className='pieChart'>
                <h2>Expense Breakdown</h2>
                <Pie {...pieConfig} />
            </div>
        </div>
    );
}

export default ChartComponent;
