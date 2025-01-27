import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import CategorySelector from './CategorySelector';
import expenseCollection from '../types/ExpenseCollection';

interface FilterFormProps {
  allExpenses: expenseCollection[];
  onExpenseFilter: (arg: expenseCollection[]) => void;
}

const FilterForm = ({ allExpenses, onExpenseFilter }: FilterFormProps) => {
  const defaultDate: Date = new Date();

  const [filteredCollection, setFilteredCollection] = useState<expenseCollection[]>([]);
  const [category, setCategory] = useState<string>('default');
  const [date, setDate] = useState<Date | null>(null);
  const [dateRange, setdateRange] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [amountTo, setAmountTo] = useState<string>('');

  useEffect(() => {
    setFilteredCollection(allExpenses);
  }, [allExpenses]);

  useEffect(() => {
    onExpenseFilter(filteredCollection);
  }, [filteredCollection]);

  const onCategorySet = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setCategory(event.target.value);
  };

  const onSetDate = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      setDate(new Date(event.target.value));
    } else {
      setDate(null);
    }
  };

  const onSetDateRange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value) {
      setdateRange(new Date(event.target.value));
    } else {
      setdateRange(null);
    }
  };

  const onSetAmountFrom = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value, 10);
   
    console.log('ammount value', value);
    if (value >= 1) {
      setAmount(value + "");
    }else{
        setAmount('');
    }
  };

  const onSetAmountTo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value, 10);
    console.log('ammount value EVENT', event.target.value  === "");
    console.log('ammountTo value', value);

    if (value&&(value >= 1)) {
      setAmountTo(value + "");
    }else{
        setAmountTo('');
    }
  };

  const filterExpenses = ()=>{
    let filteredArr = allExpenses;
    console.log('amount', amount);
    console.log('amountTo', amountTo);
    if(category !== 'default'){
        filteredArr = filteredArr.filter(exp=> exp.expData.category === category);
    }
     if(amount !== ''){
        filteredArr = filteredArr.filter(exp=> +exp.expData.amount >= +amount);
    }
    if(amountTo !== ''){
        filteredArr = filteredArr.filter(exp=> +exp.expData.amount <= +amountTo);
    }
    if(date !== null){
        filteredArr = filteredArr.filter(exp => {
            const expenseDate = new Date(exp.date).setHours(0, 0, 0, 0);
            const filterDate = new Date(date).setHours(0, 0, 0, 0); 
            return expenseDate >= filterDate;
        });
    }
    if(dateRange !== null){
        filteredArr = filteredArr.filter(exp => {
            const expenseDate = new Date(exp.date).setHours(0, 0, 0, 0);
            const filterDate = new Date(dateRange).setHours(0, 0, 0, 0); 
            return expenseDate <= filterDate;
        });
    }
    onExpenseFilter([...filteredArr]);
  }

  return (
    <div>
      <h2>Filter Form</h2>
      <CategorySelector category={category} onCategorySet={onCategorySet} />

      <Input
        labelText="Price Range From"
        min={1}
        inputType="number"
        inputName="amount"
        value={amount}
        handleChange={onSetAmountFrom}
      />
      <Input
        labelText="Price Range To"
        min={1}
        inputType="number"
        inputName="amountTo"
        value={amountTo}
        handleChange={onSetAmountTo}
      />

      <Input
        labelText="Date From"
        max={defaultDate.toISOString().split('T')[0]}
        inputType="date"
        inputName="date"
        value={date ? date.toISOString().split('T')[0] : ''}
        handleChange={onSetDate}
      />
      <Input
        labelText="Date To"
        max={defaultDate.toISOString().split('T')[0]}
        min={date ? date.toISOString().split('T')[0] : defaultDate.toISOString().split('T')[0]}
        inputType="date"
        inputName="date"
        value={dateRange ? dateRange.toISOString().split('T')[0] : ''}
        handleChange={onSetDateRange}
      />
       <Button size="md" text="Save" btntype="button" mode="dark" handleClick={filterExpenses} />
    </div>
  );
};

export default FilterForm;
