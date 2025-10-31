import React, { useEffect, useState } from 'react'
import { PlusCircle } from 'lucide-react';
import AddServer from '../../components/admin/AddServer';
import { useAppContext } from '../../context/AppContext';

const Servers = () => {

  const { servers, fetchServers, navigate } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    fetchServers();
  },[servers]);


  return (
    <div>

      {isOpen && <AddServer setIsOpen={setIsOpen}/>}
      
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold title'>Servers List</h1>
        <button onClick={()=>setIsOpen(true)} className='font-medium hover:bg-primary/10 transition-all duration-300 active:scale-95 rounded-full py-1 px-4 border border-primary text-primary flex gap-2'>Add Server<PlusCircle /></button>
      </div>

      <div className='flex items-center justify-center'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 items-center py-6'>
          {
            servers.map((server) => (
              <div onClick={()=>(navigate(`/server/${server._id}`))} key={server._id} className='flex flex-col items-center bg-secondary/30 border border-primary rounded-2xl p-4 w-40 shadow-lg shadow-primary/30 hover:-translate-y-1 hover:shadow-primary/50 transition-all duration-300 '>
                <div className='rounded-full border border-primary w-fit'>
                  <img className='size-25 object-cover rounded-full' src={server.image} alt="" />
                </div>
                <div className='text-center mt-2 space-y-2'>
                  <h1 className='font-medium'>{server.name}</h1>
                  <p className='font-semibold text-primary bg-primary/20 border rounded-2xl border-primary px-4'>Table No : {server.tableNumber}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Servers