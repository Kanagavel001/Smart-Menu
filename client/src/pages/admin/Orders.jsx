import { ChevronDown, ConciergeBell } from 'lucide-react';
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Orders = () => {

  const { fetchOrders, orders, axios } = useAppContext();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleSelect = (id) => {
    setSelectedOrder(orders.find(order => order._id === id));
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete('/api/order/delete')
      if(data.success){
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handlePay = async (orderId) => {
    try {
      const { data } = await axios.post('/api/order/pay-offline', {orderId} )
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
    fetchOrders();
  },[handlePay]);


  return (
    <div className='max-w-screen h-full mx-auto overflow-x-hidden'>
      <div className=''>
        <div className='flex  justify-between'>
              <h1 className='text-2xl font-bold title'>Orders List</h1>
              <button onClick={handleDelete} className='bg-red-600/20 hover:bg-red-600/30 py-1 px-4 border border-red-600 rounded-full text-red-600 transition-all duration-300 font-medium'>Delete Orders</button>
              
          </div>
      </div>
      
      <div className='h-4/5 border border-primary max-w-4xl overflow-auto no-scrollbar rounded-md mt-10 lg:ml-10 xl:ml-30'>
              <table className='w-full border-collapse rounded-md'>
                  <tbody className='overflow-y-scroll'>
                      {
                          orders.map((item) => (
                              <tr key={item._id} className='bg-primary/5 border-b border-primary font-medium '>
                                  <button type="button" onClick={() =>{ handleSelect(item._id); setIsOpen(!isOpen)}} className="group flex items-center justify-between w-full p-2 bg-white hover:bg-gray-50 transition-all duration-300 focus:outline-none">
                                    <div className="flex items-center gap-2 pl-2">
                                      <div className={`border rounded-full p-2 ${item.orderStatus ? "bg-green-600/20  border-green-600 text-green-600" : "bg-primary/20  border-primary text-primary"}`}>
                                        <ConciergeBell size={20}/>
                                      </div>
                                      <h1 className='sm:text-lg'>Table No : {item.table_no}</h1>
                                    </div>
                                    <div className='max-sm:hidden'>
                                      <p className={`px-3 w-25 pb-0.5 text-sm rounded-xl border ${item.orderStatus ?  "bg-green-600/20 border-green-600 text-green-600" : "bg-primary/20 border-primary text-primary"}`}>{item.orderStatus ? "Completed" : "Preparing"}</p>
                                    </div>

                                    <p className='font-bold text-left'>₹ {item.totalAmount}</p>

                                    <div className='flex gap-3 sm:gap-5 items-center'>
                                      
                                      <button disabled={item.paid} onClick={()=>handlePay(item._id)} className={` transition-all w-15 duration-300 cursor-pointer text-sm border py-1 px-4 rounded-full ${item.paid ? "bg-green-600/20 border-green-600 text-green-600" : "bg-primary/20 border-primary text-primary hover:bg-primary/30"}`}>{item.paid ? "Paid" : "Pay"}</button>
                                      <ChevronDown />
                                    </div>
                                </button>

                                    { isOpen && selectedOrder._id === item._id && <ul key={item._id} className={` h-70 overflow-auto no-scrollbar rounded-2xl border border-primary py-1 ${(item._id === selectedOrder._id ? "block" : "hidden")} `}>
                                        {selectedOrder.foodDetails.map((food, i) => (
                                            <li key={i} className={`px-5 py-2 flex items-center gap-4 justify-between border-b border-primary`} >
                                                <div className='flex gap-2 items-center'>
                                                    <img className='size-8 sm:size-10' src={food.image} alt="" />
                                                    <h1>{food.name}</h1>
                                                </div>
                                                <div className='flex items-center gap-10 min-sm:gap-20 min-lg:gap-50'>
                                                  <p className='font-bold'>Qty : {food.quantity}</p>
                                                  <p className='font-bold'>₹ {food.amount * food.quantity}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>}
                              </tr>
                          ))
                      }
                  </tbody>
              </table>
          </div>
    </div>
  )
}

export default Orders