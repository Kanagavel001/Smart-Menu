import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';

const Dashboard = () => {

  const { axios } = useAppContext();
  const [cooksCount, setCooksCount] = useState('');
  const [serversCount, setServersCount] = useState('');
  const [ordersCount, setOrdersCount] = useState('');
  const [foodsCount, setFoodsCount] = useState('');
  const [totalRevenue, setTotalRevenue] = useState('');

  const dashboardData = [
    {img: '/order.png', title: 'Today Orders', count: ordersCount},
    {img: '/revanue.png', title: 'Today Revenue', count: `₹ ${totalRevenue}`},
    {img: '/foods.png', title: 'Total Foods', count: foodsCount},
    {img: '/cooks.png', title: 'Total Cooks', count: cooksCount},
    {img: '/servers.png', title: 'Total Servers', count: serversCount},
  ]

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/order/dashboard-data');
      if(data.success){
        setCooksCount(data.cooksCount)
        setServersCount(data.serversCount)
        setFoodsCount(data.foodsCount)
        setOrdersCount(data.ordersCount)
        setTotalRevenue(data.totalRevenue)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    fetchDashboardData();
  },[]);

  return (
    <div className='mx-auto overflow-x-hidden w-full'>
      <h1 className='text-2xl font-bold title'>Hotel Dashboard</h1>

    <div className='flex justify-center items-center h-full min-lg:mt-10 py-10'>
      <div className='grid grid-cols-2 min-sm:grid-cols-3 min-lg:grid-cols-4 gap-y-6 gap-x-4'>

          {
            dashboardData.map((item, i) => (
            <div className='border-2 border-primary w-40 h-50 rounded-2xl shadow-lg shadow-primary/30'>
              <div className='flex items-center justify-center mt-4 '>
                <img src={item.img} className='size-25 ' alt="" />
              </div>
              <div className='mt-2'>
                <h1 className='font-bold text-center text-lg title'>{item.title}</h1>
                <p className='font-bold text-center text-2xl'>{item.count}</p>
              </div>
            </div>
            ))
          }

        </div>
      </div>
    </div>
  )
}

export default Dashboard