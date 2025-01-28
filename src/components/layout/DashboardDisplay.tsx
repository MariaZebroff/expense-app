import { PropsWithChildren } from 'react'


export default function DashboardDisplay({children}:PropsWithChildren) {
  return (
    <div className='flex justify-between m-5'>
      {children}
    </div>
  )
}
