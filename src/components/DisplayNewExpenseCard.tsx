import './DisplayNewExpenseCard.css'
import Button from './Button';
import ExpList from '../types/ExpList'


interface DisplayNewExpenseCardProps {
    dateCurrent: string;
    data: ExpList[];
    onExpenseDelete: (arg:string)=>void
}
const DisplayNewExpenseCard = ({dateCurrent, data, onExpenseDelete}:DisplayNewExpenseCardProps)=>{
   
return (
    <div className="py-7 pl-7 w-100">
        <div className="display-card-wrapper flex flex-col">
            <ul className="grow p-4">
                    {data.map(exp=> <li className="flex justify-between items-center py-1 mt-1" key={exp.id}><p><span className="mr-2">{exp.category}</span><span className="mr-2"> - </span>${exp.ammount}</p> <Button size="sm" handleClick={()=>{onExpenseDelete(exp.id)}}  text="-" btntype="button" mode="light"/></li>)}
            </ul>
            <p className="px-4 justify-self-end"><span>Date: </span>{dateCurrent}</p>
        </div>
    </div>
)
}

export default DisplayNewExpenseCard;