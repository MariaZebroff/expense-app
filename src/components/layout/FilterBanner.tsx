import Button from '../Button'
interface FilterBannerProps  {
    count: number;
    handleLinkClick: ()=>void
}

export default function FilterBanner({handleLinkClick, count}:FilterBannerProps ) {
  return (
    <div className='p-4 px-6 my-2 bg-[#607F90]/50 text-[#253e4b]'>Filter applyed to the Expenses. <strong>{count}</strong> items found. 
    <Button mode='link' text='Reset Filter' btntype="button" handleClick={handleLinkClick} size='link'/>
     </div>
  )
}
