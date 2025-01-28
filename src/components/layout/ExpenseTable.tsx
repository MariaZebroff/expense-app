
// import { useState } from 'react'
import ExpenseRow from './ExpenseRow'
import expenseCollection from '../../types/ExpenseCollection'
import './ExpenseTable.css'



interface ExpenseTableProps {
    data: expenseCollection[],
    totalSpending: number,
    onExpenseDelete: (id: string) => void;
    onExpenseEdit: (id: string) => void;
}
const ExpenseTable = ({ data, onExpenseDelete, onExpenseEdit, totalSpending }: ExpenseTableProps) => {

    const dataArrangedByDate = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());


    return (<div className='w-full px-4'>

        <table className='w-full mt-2'>
            <thead >
                <tr>
                    <th className='p-4'>Date</th>
                    <th className='p-4'>Category</th>
                    <th className='p-4'>Title</th>
                    <th className='p-4'>Amount</th>
                    <th className='p-4 edit-row'><div></div></th>
                    <th className='p-4 delete-row'><div></div></th>
                </tr>
            </thead>
            <tbody>
                {dataArrangedByDate.map(exp => <ExpenseRow
                    key={exp.expData.id}
                    id={exp.expData.id}
                    date={exp.date}
                    title={exp.expData.title}
                    category={exp.expData.category}
                    amount={exp.expData.amount}
                    onExpenseDelete={onExpenseDelete}
                    onExpenseEdit={onExpenseEdit}
                />)}
            </tbody>
            <tfoot >
                <tr >
                    <th className="p-2" scope="row" colSpan={3} >Total:</th>
                    <td scope="row" colSpan={3} className="pl-5">${totalSpending}</td>
                </tr>
            </tfoot>
        </table>
    </div>)
}

export default ExpenseTable;