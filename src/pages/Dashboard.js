import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Cards from '../components/Cards';
import AddExpense from '../components/Modals/addExpense';
import AddIncome from '../components/Modals/addIncome';
import { toast } from 'react-toastify';
import { addDoc, collection, query, getDocs } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import moment from 'moment';
import TransactionsTable from '../components/Table';
import ChartComponent from '../components/Charts';
import NoTransactions from '../components/noTransactions';



function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);

  const showExpenseModal = () => setIsExpenseModalVisible(true);
  const showIncomeModal = () => setIsIncomeModalVisible(true);
  const handleIncomeCancel = () => setIsIncomeModalVisible(false);
  const handleExpenseCancel = () => setIsExpenseModalVisible(false);
 
  const onFinish = (values, type) => {
    console.log("Raw Date Object:", values.date);
  
    const formattedDate = moment(values.date).format("YYYY-MM-DD");
  
    const newTransaction = {
      type: type,
      date: formattedDate, 
      amount: parseFloat(values.amount),
      ...(values.description && { description: values.description }),
      ...(values.tag && { tag: values.tag }),
      category: values.category,
    };
  
    addTransaction(newTransaction);
  };
  
  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBal();
  }, [transactions]);

  async function fetchTransactions() {
    setLoading(true);
    try {
      if (user) {
        const qu = query(collection(db, `user/${user.uid}/transactions`));
        const querySnap = await getDocs(qu);

        let transactionsArray = querySnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTransactions(transactionsArray);
        console.log("Transactions Array:", transactionsArray);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions!");
    } finally {
      setLoading(false);
    }
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `user/${user.uid}/transactions`),
        transaction
      );
      console.log("Doc ID:", docRef.id);
  
      setTransactions((prevTransactions) => [
        ...prevTransactions,
        { id: docRef.id, ...transaction },
      ]);
  
      toast.success("Transaction added!");
    } catch (e) {
      toast.error("Something went wrong!");
      console.error("Error:", e);
    }
  }
  

  function calculateBal() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        incomeTotal += transaction.amount;
      } else if (transaction.type === "Expense") {
        expenseTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    console.log(incomeTotal);
    setExpense(expenseTotal); 
    setCurrentBalance(incomeTotal - expenseTotal);
  }

  let sortedTransaction = transactions.sort((x,y) => {
    return new Date(x.date) - new Date(y.date);
  }
)

  return (
    <div>
      <Header />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expense={expense}
            currentBalance={currentBalance}
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
          />
          <AddExpense
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />
          <AddIncome
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
          {transactions.length !== 0 ? <ChartComponent sortedTransaction={sortedTransaction}/>
             : 
            <NoTransactions />
          }
          <TransactionsTable transactions={transactions}/>
        </>
      )}
    </div>
  );
} 

export default Dashboard;