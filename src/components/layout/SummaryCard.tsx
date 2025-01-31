
import {Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend} from 'recharts';
import CategoryAmount from '../../types/CategoryAmount'
import {NUM_CAT_SHOW} from '../../constant/constant'

import './SummaryCard.css'

interface SummaryCardProps {
    spendingCat:CategoryAmount[];
    totalSpending: number;
}



export default function SummaryCard({spendingCat, totalSpending}:SummaryCardProps) {
    const catArr = spendingCat.length < NUM_CAT_SHOW? spendingCat : spendingCat.slice(0, NUM_CAT_SHOW);
console.log(catArr);
  return (
    <div className="total-wrapper p-4 mt-6 lg:mt-0">
        <h2>Total Expenses: ${totalSpending}</h2>
        <div>
        <h3>Top spending category:</h3>
        <ul className="py-4">
         {catArr.map((el,i)=><li key={i} className ='py-1'><span><strong>{el.categoryName}</strong></span> - <span>${el.amount}</span></li>)}
        </ul>
        </div>


        <BarChart margin={{top: 5, right: 5, bottom: 5,left: -30}} width={460} height={250} data={catArr}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="categoryName" tick={{ fontSize: 12 }}/>
        <YAxis dataKey="amount" tick={{ fontSize: 12 }}/>
        <Tooltip />
        <Legend wrapperStyle={{
          fontSize: '12px'
        }}/>
        <Bar dataKey="amount" fill="#607F90" barSize={40}/>
        </BarChart>
      
    </div>
  )
}
