import React from 'react'
import Navbar from '../components/Navbar'
import { CircleX, Minus, Plus } from 'lucide-react'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Cart = () => {

  const { axios, cartItems, addToCart, removeFromCart, selectCart, cartAmount, setCartItems } = useAppContext();

  const confirmOrder = async () => {
    try {
      const orderData = {
        table_no: localStorage.getItem('tableNumber'),
        cartAmount,
        cartItems
      }

      const formData = new FormData();
      formData.append('orderData', JSON.stringify(orderData));

      const { data } = await axios.post('/api/order/create', formData, {
      headers: { 'Content-Type': 'application/json' }
      });

      if(data.success){
        toast.success(data.message);
        localStorage.removeItem('cartItems');
        setCartItems([]);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <div className='bg-bg min-h-screen mx-auto overflow-x-hidden min-w-full overflow-y-hidden no-scrollbar'>
      <Navbar />
      <h1 className='sm:text-2xl text-xl text-text font-bold mt-16 mb-1 md:mt-22 xl:px-36 lg:px-25 md:px-18 px-4 title'>Selected Foods</h1>
      <div className='md:flex justify-between items-center overflow-y-hidden h-full min-w-full overflow-x-hidden mx-auto xl:px-36 lg:px-25 md:px-18 px-4'>

        {<div className='space-y-2 mt-3 sm:mt-6 pt-2 md:w-lg lg:w-xl xl:w-3xl overflow-y-scroll md:h-143 h-130 mb-5 no-scrollbar'>
          {
            cartItems.map((item, i) => (
              <div key={i} className='flex items-center justify-between border rounded-full bg-gradient-to-l from-primary to-secondary sm:px-6 px-3 sm:py-4 py-2 '>
                <div className='flex items-center gap-3 font-bold sm:text-lg'>
                  <img className='size-8 sm:size-10' src={item.image} alt="" />
                  <h1>{item.name} <span className='font-extrabold ml-3 sm:text-xl text-lg'>₹{item.amount}</span></h1>
                </div>
                <div className='flex items-center gap-2'>
                  <div className='flex items-center sm:text-lg text-sm font-semibold sm:gap-4 gap-3'>
                    <p onClick={()=>removeFromCart(item._id)} className='font-bold text-primary bg-secondary rounded-sm border border-primary sm:p-0.5'><Minus className='size-4'/></p>

                    <p className='w-6 text-center'>{item.quantity}</p>

                    <p onClick={()=>addToCart(item._id)} className='font-bold bg-secondary rounded-sm border border-primary sm:p-0.5 text-primary'><Plus className='size-4'/></p>
                    
                  </div>
                  <CircleX onClick={()=>selectCart(item._id)} className='text-red-600'/>
                </div>
              </div>
            ))
          }
        </div>}

        <div className='flex md:flex-col items-center md:justify-around justify-between px-4 py-2 bg-secondary rounded-2xl border-2 border-primary text-bg md:h-50'>
          <div className=''>
            <h1 className='text-xl sm:text-2xl font-bold '>Total Amount</h1>
            <h1 className='text-xl sm:text-2xl font-black text-center'>₹ {cartAmount}</h1>
          </div>
          <div>
            <button onClick={confirmOrder} className='bg-primary/50 hover:bg-primary/70 px-6 py-2 rounded-full font-bold border border-primary transition-all duration-300 active:scale-95'>
              Confirm Order
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cart