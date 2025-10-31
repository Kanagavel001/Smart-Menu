import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CookPage = () => {

    const { axios, foods, fetchFoods, cooks, fetchOrders, orders } = useAppContext();

    const { id } = useParams();
    const [ cook, setCook ] = useState({});
    const [ isOpen, setIsOpen ] = useState("Orders");

    const handleToggle = async (foodId, inStack) => {
        try {
            const { data } = await axios.post('/api/food/update-stack', {foodId, inStack});
            
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCook = async (id) => {
        try {
            const { data } = await axios.get(`/api/cook/${id}`);
            if(data.success){
                setCook(data.cook);
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleFinish = async (foodId, orderId) => {
        try {
            const { data } = await axios.post('/api/order/update-foodStatus', {foodId, orderId})
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        fetchCook(id);
    },[id])

    useEffect(()=>{
        fetchOrders();
    },[handleFinish])

    useEffect(()=>{
        fetchFoods();
    },[handleToggle]);

  return cook && (
    <div className='min-w-screen h-screen mx-auto overflow-x-hidden xl:px-36 lg:px-25 md:px-18 px-4 py-6 sm:py-8'>
        <div className='flex items-center justify-between'>

            <div className='flex gap-3 items-center'>
                <div className='border-2 border-primary rounded-full w-fit'>
                    <img className='size-15 rounded-full object-contain' src={cook.image} alt="" />
                </div>
                <h1 className='text-xl sm:text-2xl font-bold'>{cook.name}</h1>
            </div>

            <div className='flex items-center gap-4 font-semibold'>
                <button className='cursor-pointer outline-none' onClick={()=>setIsOpen("Orders")}>Orders<div className={`bg-primary ${isOpen === "Orders" && "w-full h-0.5"} `}></div></button>
                <button className='cursor-pointer outline-none' onClick={()=>setIsOpen("Foods")}>Foods<div className={`bg-primary ${isOpen === "Foods" && "w-full h-0.5"} `}></div></button>
            </div>

            <div className=''>
                <p className='bg-primary/20 font-medium sm:text-lg py-1 sm:px-6 px-4 rounded-full border border-primary'>{cook.category}</p>
            </div>

        </div>
        <div className='h-4/5 max-w-4xl overflow-auto no-scrollbar rounded-md mt-6 lg:ml-10 xl:ml-30'>
            {isOpen === "Orders" ?
                <table className='w-full border-collapse rounded-md min-h-30'>
                <thead>
                    <tr className='bg-primary sm:text-lg text-white font-semibold'>
                        <th className='py-2 pl-5 text-left'>Food Name</th>
                        <th className='py-2'>Quantity</th>
                        <th className='py-2'>Action</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-scroll'>
                    {
                        orders.map(order => order.foodDetails.filter(food => food.category === cook.category).map(item => (
                            <tr key={item._id} className='bg-primary/5 border-b border-primary font-medium'>
                                <td className='p-2 pl-5 text-left sm:text-lg'>{item.name}</td>
                                <td className='p-2 text-center'>{item.quantity}</td>
                                <td className='p-2 text-center'><button onClick={()=>handleFinish(item._id, order._id)} className={`border px-4 py-1 rounded-full transition-all duration-300 ${item.status ? "bg-green-600/20 border-green-600 text-green-600" : "border-primary bg-primary/20 hover:bg-primary/30 text-primary"} `} disabled={item.status}>{item.status ? "Completed" : "Complete"}</button></td>
                            </tr>
                        )))
                    }
                </tbody>
            </table> 
            : 
            <table className='w-full border-collapse rounded-md min-h-30'>
                <thead>
                    <tr className='bg-primary sm:text-lg text-white font-semibold'>
                        <th className='py-2 pl-5 text-left'>Food Name</th>
                        <th className='py-2'>Available</th>
                        <th className='py-2'>Action</th>
                    </tr>
                </thead>
                <tbody className='overflow-y-scroll'>
                    {
                        foods.filter(food => food.category === cook.category).map((item) => (
                            <tr key={item._id} className='bg-primary/10 border-b border-primary font-medium'>
                                <td className='p-2 pl-5 text-left sm:text-lg'>{item.name}</td>
                                <td className='p-2 w-15 text-center'><p className={`border rounded-full ${item.stack ? "bg-green-600/30 text-green-600 border-green-600": "bg-red-600/30 border-red-600 text-red-600"}`}>{item.stack ? "Yes" : "No"}</p></td>
                                <td className='p-2 text-center flex items-center justify-center'>
                                    <div className="flex items-center space-x-4">
                                        <button
                                        onClick={()=>{handleToggle(item._id, item.stack)}}
                                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                            item.stack ? "bg-green-500" : "bg-gray-300"
                                        }`}
                                        >
                                        <span
                                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            item.stack ? "translate-x-6" : "translate-x-1"
                                            }`}
                                        />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table> }
        </div>
    </div>
  )
}

export default CookPage