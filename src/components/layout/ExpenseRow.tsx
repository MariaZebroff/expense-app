
import Button from "../Button"
interface ExpenseRowProps {
    id: string;
    title: string;
    ammount: string;
    category: string;
    date: string;
    onExpenseDelete: (id:string)=>void;
    onExpenseEdit: (id:string)=>void;

}

const ExpenseRow =({id, title, ammount, category, date, onExpenseDelete, onExpenseEdit}:ExpenseRowProps)=>{
    
    const dateOnly = date.split("T")[0];
  
    return (<tr key={id} className="data-row">
        <th  scope="row" className='p-2'>{dateOnly}</th>
        <td className='text-center p-2'>{category}</td>
        <td className='p-2'>{title}</td>
        <td className='text-center p-2'>${ammount}</td>
        <td className='text-center p-2'><Button size="sm" handleClick={()=>{onExpenseEdit(id)}}  text="*" btntype="button" mode="light"/></td>
        <td className='text-center p-2 trash-cell' ><Button size="sm" handleClick={()=>{onExpenseDelete(id)}}  text="-" btntype="button" mode="light"/></td>
    </tr>)
}

export default ExpenseRow;