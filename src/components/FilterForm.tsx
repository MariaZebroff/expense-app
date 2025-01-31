import { useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import CategorySelector from './CategorySelector';
import expenseCollection from '../types/ExpenseCollection';
import FormBackground from './layout/FormBackground'
import expenseFilter from '../utils/expenseFilter';
import {MESSAGES} from '../constant/constant'
import './FilterForm.css';

interface FilterFormProps {
  isFilterOpened: boolean;
  allExpenses: expenseCollection[];
  onExpenseFilter: (arg: expenseCollection[]) => void;
  handleClose: () => void;
  handleReset: ()=> void;
}

const FilterForm = ({handleReset, allExpenses, onExpenseFilter, isFilterOpened, handleClose }: FilterFormProps) => {

  const defaultDate: Date = new Date();

  const [filteredCollection, setFilteredCollection] = useState<expenseCollection[]>([]);
  const [category, setCategory] = useState<string>('default');
  const [date, setDate] = useState<Date | null>(null);
  const [dateRange, setdateRange] = useState<Date | null>(null);
  const [amount, setAmount] = useState<string>('');
  const [amountTo, setAmountTo] = useState<string>('');
  const [message, setMessage] = useState<string | null>(null);


  useEffect(() => {
const adjAr = expenseFilter(allExpenses, category, amount, amountTo, date, dateRange);
      setFilteredCollection([...adjAr]);

  }, [allExpenses]);


  useEffect(() => {
    onExpenseFilter(filteredCollection);
  }, [filteredCollection]);

  const handleFilterReset = ()=>{

    setCategory('default');
    setDate(null);
    setdateRange(null);
    setAmount('');
    setAmountTo('');
    setFilteredCollection([...allExpenses]);
        handleReset();
  }


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

    if(amountTo !== '' && amount !== '' && +amount > +amountTo){
      setMessage(MESSAGES.formValid.priceRange);
    }else {
    const adjAr = expenseFilter(filteredArr, category, amount, amountTo, date, dateRange);
    message && setMessage(null);
    onExpenseFilter([...adjAr]);
    handleClose();
    
  }
  }

  return (
      <FormBackground isOpened={isFilterOpened}>
        <div className='w-full sm:w-120 p-4 sm:p-10 filter-wrapper ' >
            <div className="flex justify-end">
            <Button size="md" text="-" btntype="button" mode="light" handleClick={handleClose} />
            </div>
            {message && <p className="message text-[10px]">{message}</p>}
            <h2 className="filter-title">Filter By:</h2>
            <CategorySelector category={category} onCategorySet={onCategorySet} />
              <div className="flex justify-between sm:flex-row flex-col">
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
              <div className="flex justify-between sm:flex-row flex-col">

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
            <Button size="md" text="Filter Reset" btntype="button" mode="light" handleClick={handleFilterReset} />

          </div>

    </FormBackground>
  );
};

export default FilterForm;
