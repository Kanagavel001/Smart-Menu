import React from 'react'
import Navbar from '../components/Navbar'
import FoodCategory from '../components/FoodCategory'
import FoodCard from '../components/FoodCard'
import { useAppContext } from '../context/AppContext'

const Order = () => {

  const { selectedCategory, foodCategory, foods } = useAppContext();


  return (
    <div className='bg-bg lg:max-h-screen mx-auto overflow-x-hidden min-w-full overflow-y-hidden no-scrollbar'>
      <Navbar />
      <div className='lg:flex lg:justify-around min-h-screen min-w-full mx-auto overflow-x-hidden'>

        {/* Food Category */}
        <div className='flex p-2 lg:flex-col z-50 bg-bg backdrop-blur-lg gap-4 items-center overflow-x-scroll xl:px-16 lg:px-16 md:px-8 px-4 mt-16 mb-1 md:mt-22 max-h-screen no-scrollbar md:overflow-x-clip'>
            {
                foodCategory.map((item, i) => (
                    <FoodCategory on key={i} icon={item.icon} title={item.title}/>
                ))
            }
        </div>

        <div className='flex justify-center lg:pt-40 pt-20  mx-auto overflow-x-hidden min-w-full no-scrollbar overflow-y-scroll max-h-screen mb-5 sm:h-full h-130' >
          <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-20 gap-x-5'>
            {foods.filter(food => food.category === selectedCategory).map((item) => (
              <FoodCard key={item._id} item={item} quantity={1}/>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Order