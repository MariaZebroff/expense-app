import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'

import ExpenseForm from './components/ExpenseForm'
import FilterForm from './components/FilterForm'
import ExpList from './types/ExpList'
import expenseCollection from './types/ExpenseCollection'
import Nav from './components/layout/Nav'
import ExpenseTable from './components/layout/ExpenseTable'


import './App.css'


function App() {
  const [expenseCollection, setExpenseCollection] = useState<expenseCollection[]>([]);
  const [editedExpense, setEditedExpense] = useState<expenseCollection>();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isFilterOpened, setIsFilterOpened] = useState<boolean>(false);

  useEffect(()=>{
    const data = localStorage.getItem("allExpenses") || '[]';
    const allSavedExpenses= JSON.parse(data);
    setExpenseCollection(allSavedExpenses);
  },[]);

 

  const handleExpSubmit = (date:string, list:ExpList[])=>{
    const adjustedArray = list.map(el=> ({date: date,  expData: el}))
    setExpenseCollection([...expenseCollection,...adjustedArray]);
    localStorage.setItem("allExpenses", JSON.stringify([...expenseCollection,...adjustedArray]));

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
    localStorage.setItem("allExpenses", JSON.stringify([...newList]));
  }

  const handleExpEditSubmit = (data: expenseCollection) =>{
    console.log('data', data);
    const updatedArray = expenseCollection.map(el => 
      el.expData.id === data.expData.id ? data : el
    );
    setExpenseCollection(updatedArray);
  }

  const handleExpenseEdit=(id:string)=>{

    setIsOpened(true);
    const element = expenseCollection.filter(el=> el.expData.id === id);
    setEditedExpense(element[0]);
  }


  return (
    <>
        <Nav openFormHandle={onFormOpen} openFilterFormHandle ={onFilterOpen}/>
        <FilterForm />
        <ExpenseForm editedExpense = {editedExpense} handleEditExpense={handleExpEditSubmit} handleSubmitForm = {handleExpSubmit} isOpened={isOpened} onFormClose={onFormClose}/>
        <ExpenseTable data={expenseCollection} onExpenseDelete={handleExpenseDelete} onExpenseEdit={handleExpenseEdit}/>
    </>
  )
}

export default App
