import React, { useEffect, useState } from 'react'

const AdminFoodCard = ({item, updateAmount}) => {

  const [openInput, setOpenInput] = useState(false);
  const [foodAmount, setFoodAmount] = useState('');

  return (
    <div className='bg-white sm:w-50 sm:h-50 w-40 h-45 rounded-2xl relative bg-gradient-to-bl from-secondary to-secondary group border border-primary shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300 '>
        <div className='absolute flex flex-col items-center sm:-top-14 sm:right-8.5 -top-14 right-4'>

          <img className='sm:size-28 size-25' src={item.image} alt="" />

            <h1 className='sm:text-lg text-sm font-bold text-center mt-2'>{item.name}</h1>

            {openInput ? <input className='w-15 pl-2 border border-primary rounded-full outline-none mt-1' type="number" onChange={(e)=>setFoodAmount(e.target.value)} value={foodAmount} /> : <h1 className='sm:text-2xl text-lg font-extrabold text-center'>₹ {item.amount}</h1>}

            <p className='font-medium text-sm text-center mt-1'>Available : <span className={` border px-4 rounded-full ${item.stack ? "bg-green-500/10 text-green-500 border-green-500" : "bg-red-500/10 border-red-500 text-red-500"}`}>{item.stack ? "Yes" : "No"}</span></p>

            <button onClick={!openInput ? ()=>setOpenInput(true) : () =>{updateAmount(item._id, foodAmount); setOpenInput(false)}} className='border border-primary font-medium bg-primary/20  text-primary sm:text-sm text-xs py-1 rounded-full mt-3 px-3 cursor-pointer'>{openInput ? "Fix Amount" : "Change Amount"}</button>
      </div>
    </div>
  )
}

export default AdminFoodCard