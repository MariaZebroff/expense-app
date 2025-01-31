import expenseCollection from "../types/ExpenseCollection"; 
 
 const expenseFilter= (filteredArr:expenseCollection[] ,category:string, amount:string, amountTo: string, date:(Date|null), dateRange:(Date|null) ):expenseCollection[] =>{
    if(category !== 'default'){
      filteredArr = filteredArr.filter(exp=> exp.expData.category === category);
  }
   if(amount !== ''){
      filteredArr = filteredArr.filter(exp=> +exp.expData.amount >= +amount);
  }
  if(amountTo !== ''){
      filteredArr = filteredArr.filter(exp=> +exp.expData.amount <= +amountTo);
  }
  if(date !== null){
      filteredArr = filteredArr.filter(exp => {
          const expenseDate = new Date(exp.date).setHours(0, 0, 0, 0);
          const filterDate = new Date(date).setHours(0, 0, 0, 0); 
          return expenseDate >= filterDate;
      });
  }
    if(dateRange !== null){
        filteredArr = filteredArr.filter(exp => {
            const expenseDate = new Date(exp.date).setHours(0, 0, 0, 0);
            const filterDate = new Date(dateRange).setHours(0, 0, 0, 0); 
            return expenseDate <= filterDate;
        });
    }
    return filteredArr
  }

  export default expenseFilter;