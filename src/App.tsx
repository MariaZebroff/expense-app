import { useState, useEffect, useCallback } from 'react'
//import reactLogo from './assets/react.svg'

import ExpenseForm from './components/ExpenseForm'
import FilterForm from './components/FilterForm'
import ExpList from './types/ExpList'
import expenseCollection from './types/ExpenseCollection'
import Nav from './components/layout/Nav'
import DashboardDisplay from './components/layout/DashboardDisplay'
import TotalExpenseCahrt from './components/layout/TotalExpenseCahrt'
import ExpenseTable from './components/layout/ExpenseTable'
import SummaryCard from './components/layout/SummaryCard'
import CategoryAmount from './types/CategoryAmount'


import getTheTotal from './utils/total'
import sumAmountsByCategory from './utils/categorySum'


import './App.css'




function App() {
  const [expenseCollection, setExpenseCollection] = useState<expenseCollection[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<expenseCollection[]>([]);
  const [editedExpense, setEditedExpense] = useState<expenseCollection>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);

  const [spendingCat, setSpendingCat] = useState<CategoryAmount[]>([]);
  const [filterTotalSpending, setFilterTotalSpending] = useState<number>(0);
  const [totalSpending, setTotalSpending] = useState<number>(0);

  useEffect(() => {
    // Fetch data from localStorage
    const data = localStorage.getItem("allExpenses");
  
    const allSavedExpenses = data ? JSON.parse(data) : [];
    
    if (allSavedExpenses.length > 0) {
      setExpenseCollection(allSavedExpenses);
    }
  }, []);


  useEffect(()=>{
    const amountArr = expenseCollection.map(el => el.expData.amount);
    const total = getTheTotal(amountArr);
    setTotalSpending(total);

    setSpendingCat(sumAmountsByCategory(expenseCollection));

    localStorage.setItem("allExpenses", JSON.stringify(expenseCollection));
  }, [expenseCollection]);

 

  const handleExpSubmit = (date:string, list:ExpList[])=>{
    const adjustedArray = list.map(el=> ({date: date,  expData: el}))
    setExpenseCollection(prev=>[...prev,...adjustedArray]);
  }

  const onFormClose = ()=>{
    setIsOpened(false);
    setEditedExpense(undefined);
  }

  const onFormOpen = ()=>{
    setIsOpened(true)
  }

  const onFilterOpen = ()=>{
    setIsFilterOpened(true)
  }
  const onFilterClose = ()=>{
    setIsFilterOpened(false)
  }

  const handleExpenseDelete = (id:string)=>{
    const newList = expenseCollection.filter(exp=>exp.expData.id !== id);
    setExpenseCollection([...newList]);
  }

  const handleExpEditSubmit = (data: expenseCollection) =>{
    console.log('data', data);
    const updatedArray = expenseCollection.map(el => 
      el.expData.id === data.expData.id ? data : el
    );
    setExpenseCollection(updatedArray);
  }

  const handleExpenseFilter = (filteredExpenses:expenseCollection[]) =>{
    setFilteredExpenses(filteredExpenses);
  }

  const handleExpenseEdit=(id:string)=>{

    setIsOpened(true);
    const element = expenseCollection.filter(el=> el.expData.id === id);
    setEditedExpense(element[0]);
  }


useEffect(()=>{
  const amountArr = filteredExpenses.map(el => el.expData.amount);
  const total = getTheTotal(amountArr);
  setFilterTotalSpending(total);
},[filteredExpenses])
 


  return (
    <>
        <Nav openFormHandle={onFormOpen} openFilterFormHandle ={onFilterOpen}/>
        <DashboardDisplay>
        <TotalExpenseCahrt amountRange={spendingCat}/>
        <SummaryCard spendingCat={spendingCat} totalSpending={totalSpending}/>
        </DashboardDisplay>
        <ExpenseForm editedExpense = {editedExpense} handleEditExpense={handleExpEditSubmit} handleSubmitForm = {handleExpSubmit} isOpened={isOpened} onFormClose={onFormClose}/>

        <FilterForm handleClose={onFilterClose} isFilterOpened={isFilterOpened} allExpenses={expenseCollection} onExpenseFilter = {handleExpenseFilter}/>
        <ExpenseTable totalSpending = {filterTotalSpending} data={filteredExpenses} onExpenseDelete={handleExpenseDelete} onExpenseEdit={handleExpenseEdit}/>
    </>
  )
}

export default App
