import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import CategorySelector from './CategorySelector';
import expenseCollection from '../types/ExpenseCollection';
import './FilterForm.css';

interface FilterFormProps {
  isFilterOpened: boolean;
  allExpenses: expenseCollection[];
  onExpenseFilter: (arg: expenseCollection[]) => void;
  handleClose: () => void;
}

const FilterForm = ({ allExpenses, onExpenseFilter, isFilterOpened, handleClose }: FilterFormProps) => {
  const defaultDate: Date = new Date();

  const [filteredCollection, setFilteredCollection] = useState<expenseCollection[]>([]);
  const [category, setCategory] = useState<string>('default');
  const [date, setDate] = useState<Date | null>(null);
  const [dateRange, setdateRange] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [amountTo, setAmountTo] = useState<string>('');

  const handleReset = ()=>{
    setCategory('default');
    setDate(null);
    setdateRange(null);
    setAmount('');
    setAmountTo('');
    setFilteredCollection([...allExpenses]);
  }

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
    const value = +parseFloat(event.target.value).toFixed(2);
   
    console.log('ammount value', value);
    if (value >= 1) {
      setAmount(value + "");
    }else{
        setAmount('');
    }
  };

  const onSetAmountTo = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = +parseFloat(event.target.value).toFixed(2)
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
    <div className='w-100 p-4 filter-wrapper ml-4' style ={{display: !isFilterOpened? 'none' : 'block'}}>
      <div className="flex justify-end">
      <Button size="md" text="-" btntype="button" mode="light" handleClick={handleClose} />
      </div>
      <h2 className="filter-title">Filter By:</h2>
      <CategorySelector category={category} onCategorySet={onCategorySet} />
        <div className="flex justify-between">
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
        </div>
        <div className="flex justify-between">

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
      </div>
   
       <Button size="md" text="Save" btntype="button" mode="dark" handleClick={filterExpenses} />
       <Button size="md" text="Filter Reset" btntype="button" mode="light" handleClick={handleReset} />

    </div>
  );
};

export default FilterForm;
