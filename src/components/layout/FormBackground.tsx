import { ReactNode } from 'react'
import { useTransition, animated } from 'react-spring';

import {ANIM_DURATION} from '../../constant/constant'

type FormBackgroundProps = {
    isOpened: boolean,
    children: ReactNode;
}

export default function FormBackground({isOpened,children}:FormBackgroundProps) {
  const transition = useTransition(isOpened, {
    from: {opacity: 0},
    enter: {opacity: 1},
    leave: {opacity: 0},
    config: { duration: ANIM_DURATION }
});
  return ( <>
    {transition((style, item)=> item && <animated.div className='p-1 fixed justify-center items-center w-full h-screen bg-for-popups top-0 left-0 z-40 bg-[#404040]/75 flex' style ={style}>
    {children}
  </animated.div >)}
  </>)
}
