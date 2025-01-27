
import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import CategorySelector from './CategorySelector';
import DisplayNewExpenseCard from './DisplayNewExpenseCard';
import {v4 as getId} from "uuid";

import ExpList from '../types/ExpList'
import expenseCollection from '../types/ExpenseCollection'

import './ExpenseForm.css'

interface ExpenseForm {
    onFormClose: ()=>void;
    handleSubmitForm: (date:string, list:ExpList[])=>void;
    handleEditExpense: (exp: expenseCollection)=>void;
    isOpened: boolean;
    editedExpense?: expenseCollection
}

const ExpenseForm = ({handleSubmitForm, isOpened, onFormClose, editedExpense, handleEditExpense}:ExpenseForm)=>{

    const defaultDate: Date = new Date();

useEffect(()=>{
    console.log('editedExpense', editedExpense);
    if(editedExpense){
        console.log('Hello!')
        console.log('Hello', editedExpense)
        const date = new Date(editedExpense.date);
        setTitle(editedExpense.expData.title);
        setAmmount(editedExpense.expData.ammount);
        setCategory(editedExpense.expData.category);
        setDate(date);
    }
},[ editedExpense]);


    const [title, setTitle] = useState<string>('');
    const [ammount, setAmmount] = useState<string>('');
    const [category, setCategory] = useState<string>('rent');
    const [date, setDate] = useState<Date>(defaultDate);
    const [expList, setExpList] = useState<ExpList[]>([]);
    const [message, setMessage]=useState<string | null>(null);

    // const [newDataForEditedExpense, setNewDataForEditedExpense] = useState<expenseCollection>();

    const onSetTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value);
        console.log(title);
    }

    const onSetAmmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAmmount(event.target.value);
    }
    const onCategorySet = (event: React.ChangeEvent<HTMLSelectElement>): void => {

        setCategory(event.target.value);
    }

    const onSetDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setExpList([]);
        setDate(new Date(event.target.value))
    }

    const handleEdit= (e: React.FormEvent)=>{
        e.preventDefault();
        console.log('click2');
        console.log('title', title);
        console.log('ammount', ammount);
        if(title ==='' && ammount === ''){
            setMessage("Ammount or title can't be empty");
        }else {
            editedExpense && handleEditExpense({date: date.toLocaleDateString('en-CA'), expData: {id: editedExpense?.expData.id, title, ammount, category  }} )
            message && setMessage(null);
            setTitle('');
            setAmmount('');
            setCategory('rent');
            setDate(defaultDate);
            onFormClose();
        }
    }

    const handleSubmit =(e: React.FormEvent)=>{
        e.preventDefault();
        console.log('click');

        if(title !=='' && ammount !== ''){
            setMessage("Please add new expense to the list");
        }else if((title ==='' || ammount === '')&& expList.length===0){
            setMessage("Please add new expense to the list");
        }
        else {
            handleSubmitForm(date.toLocaleDateString('en-CA'), expList);
            message && setMessage(null);
            setTitle('');
            setAmmount('');
            setCategory('rent');
            setExpList([]);
            setDate(defaultDate);
            onFormClose();
        }
    }

    const expenseAdd = ()=>{
        if(title==='' || ammount === ''){
            setMessage("Title or Ammount can't be empty");
        }else {
            message && setMessage(null);
            setExpList([...expList, {id: getId(), title, ammount, category}])
            setTitle('');
            setAmmount('');
            setCategory('rent');
        }
    }

    const expenseRemoved = (id:string)=>{
        const newList = expList.filter(exp=>exp.id !== id);
        setExpList(newList);
    }
    const cancelForm = ()=>{
        onFormClose();
        setTitle('');
        setAmmount('');
        setCategory('rent');
        setMessage(null);
        setDate(defaultDate);
    }
  

    return (<>
    {isOpened && <div className="p-12 expense-form">
        <div className="flex">

        <form onSubmit ={editedExpense? handleEdit :handleSubmit}>
            <h2 className="header">{editedExpense?'Edit Expense': 'New Expense'}</h2>
            {message && <p className="message text-[10px]">{message}</p>}
            <Input labelText="Title" inputType="text" inputName= "title" value={title} handleChange={onSetTitle}/>
            <Input labelText="Ammount" min={1} inputType="number" inputName= "ammount" value={ammount} handleChange={onSetAmmount}/>
            <CategorySelector category={category} onCategorySet={onCategorySet}/>
            {!editedExpense && <Button size="sm" text="+" btntype="button" mode="dark" handleClick={expenseAdd}/>}

            <Input labelText="Date"  inputType="date" inputName= "date" value={date.toLocaleDateString('en-CA')} handleChange={onSetDate}/>
            
             <div className="btn-wrapper py-3">
                <Button size="md" text={editedExpense? "Save Edits": "Save"} btntype="submit" mode="dark" />
                <Button size="md"  text="Cancel" btntype="button" mode="light" handleClick={cancelForm}/>
            </div>
        </form>
        {!editedExpense && <DisplayNewExpenseCard dateCurrent={date.toLocaleDateString('en-CA')} data={expList} onExpenseDelete={expenseRemoved}/>}
        </div>
    </div>}
    </>)
}

export default ExpenseForm;