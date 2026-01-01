import React from 'react';
import { Modal, DatePicker, Button, Form, Input, Select, Descriptions } from 'antd';


function AddIncome({ isIncomeModalVisible, handleIncomeCancel, onFinish }) {
  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : null, 
      description : values.description ? values.description : "None",
    };
    console.log('Formatted Values:', formattedValues); 
    onFinish(formattedValues, "Income");
    form.resetFields();
  };
  
  

  return (
    <Modal
      visible={isIncomeModalVisible}
      onCancel={handleIncomeCancel}
      title="Add Income"
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFormSubmit} 
      >
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter the amount!' }]}
        >
          <Input type="number" placeholder="Enter amount" />
        </Form.Item>


        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="category"
          label="Expense Category"
          rules={[{ required: true, message: 'Please select a category!' }]}
        >
          <Select placeholder="Select category">
            <Select.Option value="Salary">Salary</Select.Option>
            <Select.Option value="Investment">Investment</Select.Option>
            <Select.Option value="Freelance">Freelance</Select.Option>
            <Select.Option value="other">Other</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item
          name="description"
          label="Description of Income"
        >
          <Input placeholder="Enter income description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddIncome;
