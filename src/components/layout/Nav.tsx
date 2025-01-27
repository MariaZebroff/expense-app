
import Button from '../Button'
import './Nav.css'


interface NavProps  {
    openFormHandle: ()=>void
    openFilterFormHandle: ()=> void
}
const Nav =({openFormHandle, openFilterFormHandle}:NavProps)=>{
   
  
    return (<div className='flex justify-between py-4 items-center nav-wrapper'>
        <div className="ml-4 title">
            Dashboard
        </div>
        <div className="">
            <Button  handleClick={openFilterFormHandle} text="Filter Expenses" size="md" mode="light-nav" btntype="button"/>
            <Button  handleClick={openFormHandle} text="Add New Expense" size="md" mode="light-nav" btntype="button"/>
        </div>
    </div>)
}

export default Nav;