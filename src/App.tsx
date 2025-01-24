import { useState, useEffect } from 'react'
//import reactLogo from './assets/react.svg'

import ExpenseForm from './components/ExpenseForm'
import ExpList from './types/ExpList'

import './App.css'

interface expenseCollection {
  date: Date,
  expData: ExpList
}

function App() {
  const [expenseCollection, setexpenseCollection] = useState<expenseCollection[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(true);

  useEffect(()=>{
    const data = localStorage.getItem("allExpenses") || '[]';
    const allSavedExpences= JSON.parse(data);
    setexpenseCollection(allSavedExpences);
  },[]);

  useEffect(()=>{
    localStorage.setItem("allExpenses", JSON.stringify(expenseCollection));
  },[expenseCollection]);

  const handleExpSubmit = (date:Date, list:ExpList[])=>{
    const adjustedArray = list.map(el=> ({date: date,  expData: el}))
    setexpenseCollection(adjustedArray);
  }

  const onFormClose = ()=>{
    setIsOpened(false)
  }


  return (
    <>
        <ExpenseForm handleSubmitForm = {handleExpSubmit} isOpened={isOpened} onFormClose={onFormClose}/>
    </>
  )
}

export default App
