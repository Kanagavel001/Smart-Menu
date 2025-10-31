import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ChevronDown, ConciergeBell } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const ServerPage = () => {

    const { fetchServers, servers, fetchOrders, orders, axios } = useAppContext();
    const { id } = useParams();
    const [ server, setServer ] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});

    const handleSelect = (id) => {
        setSelectedOrder(orders.find(order => order._id === id));
    };

    const handleComplete = async (orderId) => {
        try {
            const { data } = await axios.post('/api/order/update-orderStatus', {orderId})
            if(data.success){
                toast.success(data.message)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.messaga)
        }
    }

    const fetchServer = async (id) => {
        setServer(servers.find(server => server._id === id))
    }

    useEffect(()=>{
        fetchServer(id);
        fetchServers();
    },[id, servers]);

    useEffect(()=>{
        fetchOrders();
    },[handleComplete])

    return server && (
        <div className='min-w-screen h-screen mx-auto overflow-x-hidden xl:px-36 lg:px-25 md:px-18 px-4 py-6 sm:py-7'>
            <div className='flex items-center justify-between'>
                <div className='flex gap-3 items-center'>
                    <div className='border-2 border-primary rounded-full w-fit'>
                        <img className='size-15 rounded-full object-contain' src={server.image} alt="" />
                    </div>
                    <h1 className='text-xl sm:text-2xl font-bold'>{server.name}</h1>
                </div>
                <div className=''>
                    <p className='bg-primary/20 font-medium sm:text-lg py-1 sm:px-6 px-4 rounded-full border border-primary text-primary'>Table No : {server.tableNumber}</p>
                </div>
            </div>
            <div className='h-4/5 border border-primary max-w-4xl overflow-auto no-scrollbar rounded-md mt-6 lg:ml-10 xl:ml-30'>
                <table className='w-full border-collapse rounded-md'>
                    <tbody className='overflow-y-scroll '>
                        {
                            orders.filter(order => order.table_no === server.tableNumber).map(item => (
                                <tr key={item._id} className='bg-primary/10 border-b border-primary font-medium'>
                                    <button type="button" onClick={() =>{ handleSelect(item._id); setIsOpen(!isOpen)}} className="group flex items-center justify-between w-full min-sm:p-3 p-2 px-4 bg-white hover:bg-gray-100 transition-all duration-300 focus:outline-none">
                                        <div className="flex items-center gap-2">
                                        <div className={`border rounded-full p-2 ${item.orderStatus ? "bg-green-600/20  border-green-600 text-green-600" : "bg-primary/20  border-primary text-primary"}`}>
                                            <ConciergeBell size={20}/>
                                        </div>
                                        <h1 className='sm:text-lg'>Order</h1>
                                        </div>
                                        <div>
                                        <p className={`px-3 pb-0.5 text-sm rounded-xl border ${item.foodStatus ? "bg-green-600/20 border-green-600 text-green-600" : "bg-primary/20 border-primary text-primary"}`}>{item.foodStatus ? "Completed" : "Preparing"}</p>
                                        </div>
                                        <div className='flex gap-3 sm:gap-5 items-center'>
                                        <button onClick={()=>handleComplete(item._id)} disabled={item.orderStatus} className={` transition-all duration-300 cursor-pointer text-sm border py-1 px-4 rounded-full ${item.orderStatus ? "bg-green-600/20 border-green-600 text-green-600" : "bg-primary/20 border-primary text-primary hover:bg-primary/30"}`}>{item.orderStatus ? "Completed" : "Complete"}</button>
                                        <ChevronDown />
                                        </div>
                                    </button>

                                        { isOpen && selectedOrder._id === item._id && <ul key={item._id} className={` h-70 overflow-auto no-scrollbar rounded-2xl border border-primary py-1 ${(item._id === selectedOrder._id ? "block" : "hidden")} `}>
                                            {item.foodDetails.map((food, i) => (
                                                <li key={i} className={`px-5 py-2 flex items-center gap-4 cursor-pointer justify-between border-b-2 border-white`} >
                                                    <div className='flex gap-2 items-center'>
                                                        <img className='size-8 sm:size-10' src={food.image} alt="" />
                                                        <h1>{food.name}</h1>
                                                    </div>
                                                    <div className='flex items-center gap-10 min-sm:gap-20 min-lg:gap-50'>
                                                        <p className='font-bold'>Qty : {food.quantity}</p>
                                                        <p className={` px-3 pb-0.5 rounded-xl border text-sm ${food.status ? "bg-green-600/20 text-green-600 border-green-600" : "bg-primary/20 border-primary text-primary"}`}>{food.status ? "Ready" : "Preparing"}</p>
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

export default ServerPage