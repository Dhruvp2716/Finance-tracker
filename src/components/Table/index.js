import { Radio, Select, Table } from 'antd';
import React, { useState } from 'react';
import './styles.css';
import searchImg from '../../assets/search.svg';

const { Option } = Select;

function TransactionsTable({ transactions }) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  let filtered = transactions.filter((item) => {
    const matchesSearch = item.description?.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "" || item.type === typeFilter; // Type filter applies here
    return matchesSearch && matchesType;
  });

  let sorted = filtered.sort((x, y) => {
    if (sortKey === "dateA") {
      return new Date(x.date) - new Date(y.date);
    } else if (sortKey === "dateD") {
      return new Date(y.date) - new Date(x.date);
    } else if (sortKey === 'amountD') {
      return y.amount - x.amount;
    } else if (sortKey === 'amountA') {
      return x.amount - y.amount;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className='search-container'>
        <img src={searchImg} width="20" onSelect={false} />
        <input 
          className='search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Description"
        />
        <Select
          className="select"
          onChange={(value) => setSortKey(value)}
          value={sortKey || undefined} 
          placeholder="Sort By"
          allowClear
        > 
          <Option value="dateA"> Date (Ascending)</Option>
          <Option value="dateD"> Date (Descending)</Option>
          <Option value="amountA"> Amount (Ascending)</Option>
          <Option value="amountD"> Amount (Descending)</Option>   
        </Select>

      </div>
      <div className='table'>
        <div className='table-header-container'>
          <div className='table-header'>
            <p>My Transactions</p>
          </div>
          <div className='radio-container'>
            <Radio.Group
              className='radio'
              onChange={(e) => setTypeFilter(e.target.value)}
              value={typeFilter}
            >
              <Radio.Button value="">All</Radio.Button>
              <Radio.Button value="Income">Income</Radio.Button>
              <Radio.Button value="Expense">Expense</Radio.Button>
            </Radio.Group>
          </div>
        </div>

        <Table 
          dataSource={sorted} 
          columns={columns} 
          rowKey={(record) => record.id || record.key} 
        />
      </div>
    </>
  );
}

export default TransactionsTable;
