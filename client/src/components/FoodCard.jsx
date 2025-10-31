import React, { useEffect, useState } from 'react'
import { Minus, Plus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const FoodCard = ({item, aos}) => {

  const { addToCart, removeFromCart, cartItems, selectCart } = useAppContext();

  const [food, setFood] = useState({});
  
  const fetchFood = async () => {
    setFood(cartItems.find(food => food._id === item._id));
  }

  useEffect(()=>{
    fetchFood();
  },[cartItems])


  return (
    <div className='sm:w-50 sm:h-50  w-40 h-45 rounded-2xl relative bg-gradient-to-br from-primary to-secondary group shadow-lg shadow-primary/50'>
        <div className='absolute flex flex-col items-center sm:-top-14 sm:right-3 -top-14 right-2.5'>
          <img className='sm:size-28 size-25' src={item.image} alt="" />
          <h1 className='sm:text-lg text-sm font-bold text-center mt-2'>{item.name}</h1>
          <h1 className='sm:text-2xl text-lg font-extrabold text-center'>₹ {item.amount}</h1>
          <p className='font-medium text-sm text-center mt-2'>Available : <span className={` border px-4 rounded-full ${item.stack ? "bg-green-600/10 text-green-500 border-green-500" : "bg-red-500/10 border-red-500 text-red-500"}`}>{item.stack ? "Yes" : "No"}</span></p>

          <div className='flex justify-between sm:mt-2 mt-4 gap-1 sm:gap-3'>
            <div className='flex items-center sm:text-lg text-sm font-semibold sm:gap-2 gap-1'>
              <p onClick={()=>removeFromCart(item._id)} className='font-bold text-primary active:scale-90 transition-all duration-300 bg-secondary rounded-sm border border-primary sm:p-0.5'><Minus className='size-4'/></p>
              <p className='w-6 text-center'>{food ? food.quantity : "Qty"}</p>
              <p onClick={()=>addToCart(item._id)} className='font-bold bg-secondary active:scale-90 transition-all duration-300 rounded-sm border border-primary sm:p-0.5 text-primary'><Plus className='size-4'/></p>
            </div>
            <button onClick={()=>selectCart(item._id)} className={`max-sm:pt-1 cursor-pointer border sm:w-20 w-16 font-bold rounded-full text-center active:scale-95 transition-all duration-300 max-sm:text-xs ${food ? "text-primary border-primary bg-primary/10" : "bg-secondary border-primary text-primary"}`}>{food ? "Unselect" : "Select"}</button>
          </div>
      </div>
    </div>
  )
}

export default FoodCard