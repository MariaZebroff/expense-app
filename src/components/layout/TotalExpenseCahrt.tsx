import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CategoryAmount from '../../types/CategoryAmount'
import {COLORS} from '../../constant/constant'

import './TotalExpenseCahrt.css'

interface TotalExpenseCahrtProps {
    amountRange: CategoryAmount[];
}




export default function TotalExpenseCahrt({amountRange}:TotalExpenseCahrtProps) {
    
  return (
    <div className = "main-chart-wrapper">
      <h1>Personal Expenses</h1>

      <PieChart width={430} height={370}>
      <Pie
        data={amountRange}
        dataKey="amount"
        nameKey="categoryName"
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label={({ percent }) => +(percent * 100).toFixed(0) > 5 ? `${ (percent * 100).toFixed(0)}%` : ''} 
        labelLine={false}
      >
        {amountRange.map((_entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke=''/>
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>

    </div>  
  )
}
