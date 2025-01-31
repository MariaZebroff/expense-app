import { PropsWithChildren } from 'react'
import './DashboardDisplay.css' 


export default function DashboardDisplay({children}:PropsWithChildren) {
  return (
    <div className='p-6 flex lg:justify-between items-center lg:flex-row flex-col my-5 mx-auto dashboarddisplay'>
      {children}
    </div>
  )
}
