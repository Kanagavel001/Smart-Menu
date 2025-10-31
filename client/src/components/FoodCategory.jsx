import React from 'react'
import { useAppContext } from '../context/AppContext'

const FoodCategory = ({icon, title}) => {

  const { setSelectedCategory } = useAppContext();

  return (
    <div onClick={()=>setSelectedCategory(title)} className='flex flex-col gap-2 bg-gradient-to-tr from-primary to-secondary rounded-xl px-4 py-2 active:scale-95 transition-all duration-300'>
        <div className='flex items-center justify-center size-16'>
            <img src={icon} alt="" />
        </div>
        
        <h1 className='font-bold text-sm text-center'>{title}</h1>
    </div>
  )
}

export default FoodCategory