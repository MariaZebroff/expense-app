
import { useState } from 'react';
import Button from './Button';
import Input from './Input';
import CategorySelector from './CategorySelector';
import DisplayNewExpenceCard from './DisplayNewExpenceCard';
import {v4 as getId} from "uuid";

import ExpList from '../types/ExpList'

import './ExpenseForm.css'

interface ExpenseForm {
    onFormClose: ()=>void;
    handleSubmitForm: (date:Date, list:ExpList[])=>void;
    isOpened: boolean;
}

const ExpenseForm = ({handleSubmitForm, isOpened, onFormClose}:ExpenseForm)=>{

    const defaultDate: Date = new Date();


    const [title, setTitle] = useState<string>('');
    const [ammount, setAmmount] = useState<string>('');
    const [category, setCategory] = useState<string>('rent');
    const [date, setDate] = useState<Date>(defaultDate);
    const [expList, setExpList] = useState<ExpList[]>([]);
    const [message, setMessage]=useState<string | null>(null);

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

    const handleSubmit =(e: React.FormEvent)=>{
        e.preventDefault();

        if(title !=='' && ammount !== ''){
            setMessage("Please add expence to the list");
        }else {
            handleSubmitForm(date, expList);
            message && setMessage(null);
            setTitle('');
            setAmmount('');
            setCategory('rent');
            setExpList([]);
            setDate(defaultDate);
        }
    }

    const expenceAdd = ()=>{
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

    const expenceRemoved = (id:string)=>{
        const newList = expList.filter(exp=>exp.id !== id);
        setExpList(newList);
    }
    const cancelForm = ()=>{
        onFormClose();
        setTitle('');
        setAmmount('');
        setCategory('rent');
        setDate(defaultDate);
    }
  

    return (<>
    {isOpened && <div className="p-12 expence-form">
        <div className="flex">

        <form onSubmit ={handleSubmit}>
            <h2 className="header">New Expence</h2>
            {message && <p className="message text-[10px]">{message}</p>}
            <Input labelText="Title" inputType="text" inputName= "title" value={title} handleChange={onSetTitle}/>
            <Input labelText="Ammount" min={1} inputType="number" inputName= "ammount" value={ammount} handleChange={onSetAmmount}/>
            <CategorySelector category={category} onCategorySet={onCategorySet}/>
            <Button size="sm" text="+" btntype="button" mode="dark" handleClick={expenceAdd}/>

            <Input labelText="Date"  inputType="date" inputName= "date" value={date.toLocaleDateString('en-CA')} handleChange={onSetDate}/>
            
             <div className="btn-wrapper py-3">
                <Button size="md" text="Save" btntype="submit" mode="dark" />
                <Button size="md"  text="Cancel" btntype="button" mode="light" handleClick={cancelForm}/>
            </div>
        </form>
        <DisplayNewExpenceCard dateCurrent={date.toLocaleDateString('en-CA')} data={expList} onExpenceDelete={expenceRemoved}/>
        </div>
    </div>}
    </>)
}

export default ExpenseForm;