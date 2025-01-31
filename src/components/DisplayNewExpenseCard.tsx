import './DisplayNewExpenseCard.css'
import Button from './Button';
import ExpList from '../types/ExpList'
import Bar from './Bar'

import total from '../utils/total'

import  {EXPENSE_AMOUNT_ALLOWED} from '../constant/constant'


interface DisplayNewExpenseCardProps {
    dateCurrent: string;
    data: ExpList[];
    onExpenseDelete: (arg: string) => void
}
const DisplayNewExpenseCard = ({ dateCurrent, data, onExpenseDelete }: DisplayNewExpenseCardProps) => {

    const arrAm = data.map(el=> el.amount);
    const totalAm = total(arrAm);
    const bgPercent = (data.length/EXPENSE_AMOUNT_ALLOWED)*100;


    return (
        <div className="pt-7 md:pl-7 w-full md:w-100">


            <div className="display-card-wrapper flex flex-col">
            <p className="px-4 pt-2 text-xs"><span>Date: </span>{dateCurrent}</p>
                <ul className="grow p-4">
                    {data.map(exp => <li className="flex justify-between items-center py-1 mt-1" key={exp.id}><p><span className="mr-2">{exp.category}</span><span className="mr-2"> - </span>$ {exp.amount}</p> <Button size="sm" handleClick={() => { onExpenseDelete(exp.id) }} text="-" btntype="button" mode="light" /></li>)}
                </ul>
            
                <Bar bgPercent = {bgPercent}/>
                <p className="mx-4 py-2 justify-self-end text-[#457899] "><span>Total: </span>$ {totalAm }</p>
            </div>
        </div>
    )
}

export default DisplayNewExpenseCard;