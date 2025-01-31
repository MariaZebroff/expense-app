import { useState, useEffect} from 'react'


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
import FilterBanner from './components/layout/FilterBanner'


import getTheTotal from './utils/total'
import sumAmountsByCategory from './utils/categorySum'

import {ANIM_DURATION, MESSAGES} from './constant/constant'


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
  const [filterMessage, setFilterMessage] = useState<string| null>(null);

  useEffect(() => {
    // Fetch data from localStorage
    const data = localStorage.getItem("allExpenses");
  
    const allSavedExpenses = data ? JSON.parse(data) : [];
    
    if (allSavedExpenses.length > 0) {
      setExpenseCollection(allSavedExpenses);
    } 
  }, []);




  useEffect(()=>{
    expenseCollection.length === 0? setFilterMessage(MESSAGES.startAdd) : setFilterMessage(null);
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
    setTimeout(()=>{
      setEditedExpense(undefined);
    },ANIM_DURATION + 50)
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

    if (filteredExpenses.length !== 0){
      const newFiltList = filteredExpenses.filter(exp=>exp.expData.id !== id);
      setFilteredExpenses([...newFiltList]);
    }
  }

  const handleExpEditSubmit = (data: expenseCollection) =>{
    console.log('data', data);
    const updatedArray = expenseCollection.map(el => 
      el.expData.id === data.expData.id ? data : el
    );
    setExpenseCollection(updatedArray);
    setFilterMessage(null);
    setFilteredExpenses([]);
  }

  const handleExpenseFilter = (filteredExpenses:expenseCollection[]) =>{
    setFilteredExpenses(filteredExpenses);
  }

  const onFilterReset = ()=>{
    setFilterMessage(null);

  }

  const handleExpenseEdit=(id:string)=>{

    setIsOpened(true);
    const element = expenseCollection.filter(el=> el.expData.id === id);
    setEditedExpense(element[0]);
  }


useEffect(()=>{
  filteredExpenses.length === 0? setFilterMessage(MESSAGES.filterMessage) : setFilterMessage(null);
  const amountArr = filteredExpenses.map(el => el.expData.amount);
  const total = getTheTotal(amountArr);
  setFilterTotalSpending(total);
},[filteredExpenses])

  return (
    <>
        <Nav openFormHandle={onFormOpen} openFilterFormHandle ={onFilterOpen}/>
        {expenseCollection.length !== 0 && (<DashboardDisplay>
        <TotalExpenseCahrt amountRange={spendingCat}/>
        <SummaryCard spendingCat={spendingCat} totalSpending={totalSpending}/>
        </DashboardDisplay>)}
        <ExpenseForm editedExpense = {editedExpense} handleEditExpense={handleExpEditSubmit} handleSubmitForm = {handleExpSubmit} isOpened={isOpened} onFormClose={onFormClose}/>
 
        <FilterForm  handleReset = {onFilterReset} handleClose={onFilterClose} isFilterOpened={isFilterOpened} allExpenses={ expenseCollection } onExpenseFilter = {handleExpenseFilter}/>

        {filteredExpenses.length !== expenseCollection.length && <FilterBanner handleLinkClick={()=>setIsFilterOpened(true)}/>}
        <ExpenseTable filterMessage={filterMessage} totalSpending = {filterTotalSpending} data={filteredExpenses} onExpenseDelete={handleExpenseDelete} onExpenseEdit={handleExpenseEdit}/>
    </>
  )
}

export default App
