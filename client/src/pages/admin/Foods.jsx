import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import FoodCategory from '../../components/FoodCategory';
import AdminFoodCard from '../../components/admin/AdminFoodCard';
import AddFood from '../../components/admin/AddFood';
import { PlusCircle } from 'lucide-react';

const Foods = () => {

  const { foodCategory, selectedCategory, foods, fetchFoods, axios } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const updateAmount = async (foodId, amount) => {
    try {
      const { data } = await axios.post('/api/food/update-amount', {foodId, amount});
      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);
      }
    } catch (error) {
        toast.error(error.message);
    }
  }

  useEffect(()=>{
    fetchFoods();
  },[updateAmount]);
  
  return (
    <div className='overflow-y-hidden h-full'>

      {isOpen && <AddFood setIsOpen={setIsOpen}/>}

      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold title'>Foods List</h1>
        <button onClick={()=>setIsOpen(true)} className='font-medium hover:bg-primary/10 transition-all duration-300 active:scale-95 rounded-full py-1 px-4 border border-primary text-primary flex gap-2'>Add Food<PlusCircle /></button>
      </div>
      

      <div className='flex gap-4 overflow-x-scroll no-scrollbar my-4'>
        {
          foodCategory.map((item, i) => (
            <FoodCategory key={i} icon={item.icon} title={item.title}/>
          ))
        }
      </div>
      <div className='sm:h-105 h-115 overflow-y-scroll no-scrollbar flex justify-center py-20'>
        <div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 gap-x-4 gap-y-18'>
          {
            foods.filter(food => food.category === selectedCategory).map((item) => (
              <AdminFoodCard key={item._id} item={item} updateAmount={updateAmount}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Foods