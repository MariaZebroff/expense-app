
import { useState, useEffect } from 'react';
import Button from './Button';
import Input from './Input';
import CategorySelector from './CategorySelector';
import DisplayNewExpenseCard from './DisplayNewExpenseCard';
import { v4 as getId } from "uuid";
import FormBackground from './layout/FormBackground'

import ExpList from '../types/ExpList'
import expenseCollection from '../types/ExpenseCollection'
import {EXPENSE_AMOUNT_ALLOWED, MESSAGES} from '../constant/constant'

import './ExpenseForm.css'



interface ExpenseForm {
    onFormClose: () => void;
    handleSubmitForm: (date: string, list: ExpList[]) => void;
    handleEditExpense: (exp: expenseCollection) => void;
    isOpened: boolean;
    editedExpense?: expenseCollection
}

const ExpenseForm = ({ handleSubmitForm, isOpened, onFormClose, editedExpense, handleEditExpense }: ExpenseForm) => {

    const defaultDate: Date = new Date();

    console.log('editedExpense', editedExpense);

    useEffect(() => {

        if (editedExpense) {
            console.log('Hello!')
            console.log('Hello', editedExpense)
            const date = new Date(editedExpense.date);
            setTitle(editedExpense.expData.title);
            setAmount(editedExpense.expData.amount);
            setCategory(editedExpense.expData.category);
            setDate(date);
        }
    }, [editedExpense]);


    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [category, setCategory] = useState<string>('default');
    const [date, setDate] = useState<Date>(defaultDate);
    const [expList, setExpList] = useState<ExpList[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    // const [newDataForEditedExpense, setNewDataForEditedExpense] = useState<expenseCollection>();

    const onSetTitle = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setTitle(event.target.value);
        console.log(title);
    }

    const onSetAmount = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const value = +parseFloat(event.target.value).toFixed(2);
        console.log('value', value);
        if (value >= 1) {
            setAmount(value + "");
          }else{
              setAmount('');
          }
    }
    const onCategorySet = (event: React.ChangeEvent<HTMLSelectElement>): void => {

        setCategory(event.target.value);
    }

    const onSetDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setExpList([]);
        setDate(new Date(event.target.value))
    }

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('click2');
        console.log('title', title);
        console.log('amount', amount);
        if (title === '' && amount === '') {
            setMessage(MESSAGES.formValid.titleAmount);
        } else {
            editedExpense && handleEditExpense({ date: date.toLocaleDateString('en-CA'), expData: { id: editedExpense?.expData.id, title, amount, category } })
            message && setMessage(null);
            setTitle('');
            setAmount('');
            setCategory('default');
            setDate(defaultDate);
            onFormClose();
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('click');

        if (title !== '' && amount !== '') {
            setMessage(MESSAGES.formValid. addExpense);
        } else if ((title === '' || amount === '') && expList.length === 0) {
            setMessage(MESSAGES.formValid. addExpense);
        }
        else {
            handleSubmitForm(date.toLocaleDateString('en-CA'), expList);
            message && setMessage(null);
            setTitle('');
            setAmount('');
            setCategory('default');
            setExpList([]);
            setDate(defaultDate);
            onFormClose();
        }
    }

    const expenseAdd = () => {
        if (title === '' || amount === '' || category === 'default') {
            setMessage(MESSAGES.formValid.titleAmountCategory);
        } else {
            if(expList.length < EXPENSE_AMOUNT_ALLOWED){
                message && setMessage(null);
                setExpList([...expList, { id: getId(), title, amount, category }])
                setTitle('');
                setAmount('');
                setCategory('default');
            }else {
                setMessage(MESSAGES.formValid.fullTicket);
                setTitle('');
                setAmount('');
                setCategory('default');
            }
            
        }
    }

    const expenseRemoved = (id: string) => {
        const newList = expList.filter(exp => exp.id !== id);
        setExpList(newList);
        message && setMessage(null);
    }
    const cancelForm = () => {
        onFormClose();
        setTitle('');
        setAmount('');
        setCategory('default');
        setMessage(null);
        setDate(defaultDate);
    }


    return (<FormBackground isOpened = {isOpened }>
    
        <div className="p-4 sm:p-12 expense-form">
            <div className="flex flex-col md:flex-row">

                <form onSubmit={editedExpense ? handleEdit : handleSubmit}>
                    <h2 className="header">{editedExpense ? 'Edit Expense' : 'New Expense'}</h2>
                    {message && <p className="message text-[10px]">{message}</p>}
                    <Input labelText="Title" inputType="text" inputName="title" value={title} handleChange={onSetTitle} />
                    <Input labelText="Amount" min={1} inputType="number" inputName="amount" value={amount} handleChange={onSetAmount} />
                    <CategorySelector category={category} onCategorySet={onCategorySet} />
                    {!editedExpense && <Button size="sm" text="+" btntype="button" mode="dark" handleClick={expenseAdd} />}

                    <Input labelText="Date" inputType="date" inputName="date" value={date.toLocaleDateString('en-CA')} handleChange={onSetDate} />

                    <div className="btn-wrapper py-3">
                        <Button size="md" text={editedExpense ? "Save Edits" : "Save"} btntype="submit" mode="dark" />
                        <Button size="md" text="Cancel" btntype="button" mode="light" handleClick={cancelForm} />
                    </div>
                </form>
                {!editedExpense && <DisplayNewExpenseCard dateCurrent={date.toLocaleDateString('en-CA')} data={expList} onExpenseDelete={expenseRemoved} />}
            </div>
        </div>
    </FormBackground>)
}

export default ExpenseForm;