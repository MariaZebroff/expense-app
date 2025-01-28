import  expenseCollection from '../types/ExpenseCollection'
import CategoryAmount from '../types/CategoryAmount'
 
 const  sumAmountsByCategory = (arr:expenseCollection[]): CategoryAmount[] =>{
  const categoryMap = arr.reduce((acc, exp)=>{
    const amount = +exp.expData.amount;
    if (!acc[exp.expData.category]) {
      acc[exp.expData.category] = 0;
    }
    acc[exp.expData.category] += amount;
    return acc;
  }, {} as Record<string, number>)

  const ar=  Object.entries(categoryMap).map(([categoryName, amount]) => ({
    categoryName,
    amount,
  }));
  const adjArr = ar.sort((a,b) => b.amount -a.amount)

  return adjArr;
}

export default sumAmountsByCategory;