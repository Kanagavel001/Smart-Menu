import React, { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react';
import AddCook from '../../components/admin/AddCook';
import { useAppContext } from '../../context/AppContext';

const Cooks = () => {

  const { navigate, fetchCooks, cooks } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    fetchCooks();
  },[cooks])

  return (
    <div>

      { isOpen && <AddCook setIsOpen={setIsOpen}/> }

      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold title'>Cooks List</h1>
        <button onClick={()=>setIsOpen(true)} className='font-medium hover:bg-primary/10 transition-all duration-300 active:scale-95 rounded-full py-1 px-4 border border-primary text-primary flex gap-2'>Add Cook<PlusCircle /></button>
      </div>
      
      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center py-6'>
          {
            cooks.map((cook) => (
              <div onClick={()=>navigate(`/cook/${cook._id}`)} key={cook._id} className='flex flex-col items-center bg-secondary/30 border border-primary rounded-2xl p-4 w-40 shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300 '>
                <div className='rounded-full border border-primary w-fit'>
                  <img className='size-25 object-cover rounded-full' src={cook.image} alt="" />
                </div>
                <div className='text-center mt-2 space-y-2'>
                  <h1 className='font-medium'>{cook.name}</h1>
                  <p className='font-semibold text-primary bg-primary/20 border rounded-2xl border-primary px-4'>{cook.category}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Cooks