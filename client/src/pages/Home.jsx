import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const Home = () => {

  const { navigate, setTableNumber, tableNumber } = useAppContext();

  

  return (
    <div className='bg-bg min-h-screen min-w-screen mx-auto overflow-hidden xl:px-36 lg:px-25 md:px-18 px-4 py-2 md:py-4 text-text'>

      <div className='flex items-center gap-2'>
          <img className='w-10' src='/smart_menu.png' alt="" />
          <h1 className='text-2xl font-bold title'>SMART MENU</h1>
      </div>

      <div className='relative flex justify-between sm:pt-15 pt-35 items-center'>
        <div className='sm:w-80 md:w-100 w-55 sm:pl-4 md:pl-10'>
          <h1 className='font-bold text-2xl sm:text-3xl md:text-4xl title'>It's not just Food, it's an Experience.</h1>
        </div>
        <div className='bg-gradient-to-tr to-primary from-secondary p-6 rounded-full absolute sm:static top-15 -right-30 shadow-lg shadow-primary/50'>
          <img className='w-50 max-[450px]:w-40 min-sm:w-60 md:w-70' src={assets.burger} alt="" />
        </div>
      </div>

      <div className='relative flex justify-between sm:pt-15 pt-35 items-center'>
        <div className='bg-gradient-to-bl to-primary from-secondary p-6 rounded-full absolute sm:static top-40 -left-30 shadow-lg shadow-primary/50'>
          <img className='w-50 max-[450px]:w-40 sm:w-60 md:w-70' src={assets.chicken_biryani} alt="" />
        </div>
        <form onSubmit={(e)=>{e.preventDefault(); navigate('/order'); localStorage.setItem('tableNumber', tableNumber)}} className='sm:pt-0 pt-25 sm:pl-0 pl-50 max-[450px]:pl-28'>
          <label className='flex items-center text-black'>
            <input className='bg-white md:w-55 w-45 md:p-3 p-2 pl-4 placeholder:text-black rounded-l-full outline-none' type="number" placeholder='Enter Table Number' value={tableNumber} onChange={(e)=>setTableNumber(e.target.value)} required/>
            <button type='submit' className='bg-primary rounded-r-full md:p-3 p-2 px-3 text-text group'>
              <ArrowRight strokeWidth={3} className='group-hover:translate-x-1 transition-all duration-300'/>
            </button>
          </label>
        </form>
      </div>
    </div>
  )
}

export default Home