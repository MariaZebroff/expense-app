import { useState} from 'react';
import Input from './Input';
import CategorySelector from './CategorySelector';



const FilterForm =()=>{
    const defaultDate: Date = new Date();

    const onCategorySet = ()=>{

    }

    const onSetDate =()=>{

    }

     const [category, setCategory] = useState<string>('rent');
    const [date, setDate] = useState<Date>(defaultDate);
return (<div>
    Filter Form
    <CategorySelector category={category} onCategorySet={onCategorySet}/>

    <Input labelText="Date"  inputType="date" inputName= "date" value={date.toLocaleDateString('en-CA')} handleChange={onSetDate}/>
</div>)
}

export default FilterForm;