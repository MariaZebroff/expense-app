import React from 'react'

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import CategoryAmount from '../../types/CategoryAmount'

import './TotalExpenseCahrt.css'

interface TotalExpenseCahrtProps {
    amountRange: CategoryAmount[];
}




export default function TotalExpenseCahrt({amountRange}:TotalExpenseCahrtProps) {
    const COLORS = [
        '#607F90', '#6A8A9A', '#7595A4', '#7FA0AE', '#8AABB8', '#94B6C2', '#9FC1CC', '#95b1c9', '#5582A9', '#7C8B93',
        '#446887', '#223444', '#93C2D8', '#7EAFCB', '#699CBD', '#5489AF', '#3F76A1', '#2A6393', '#155085', '#004D80',
        '#00457A', '#003D74', '#00356E', '#002D68', '#002562', '#001D5C', '#001556', '#001450', '#00124A', '#001044',
        '#000E3E', '#000C38', '#000A32', '#00082C'
      ];
  return (
    <div className = "main-chart-wrapper">
      <h1>Personal Expenses</h1>

      <PieChart width={430} height={350}>
      <Pie
        data={amountRange}
        dataKey="amount"
        nameKey="categoryName"
        cx="50%"
        cy="50%"
        outerRadius={80}
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
