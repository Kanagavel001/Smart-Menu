import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { Image, X } from 'lucide-react';
import toast from 'react-hot-toast';

const AddFood = ({setIsOpen}) => {

    const { foodCategory, axios } = useAppContext();

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const foodData = {
                name, amount, category
            }
                        
            const formData = new FormData();
            formData.append('foodData', JSON.stringify(foodData));
            formData.append('image', image);

            const { data } = await axios.post('/api/food/add', formData);

            if(data.success){
                toast.success(data.message);
                setIsOpen(false);
                setImage(false);
                setAmount('');
                setCategory('');
                setName('');
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }


  return (
    <div className='z-50 mx-auto max-w-screen h-screen overflow-x-hidden flex items-center justify-center -mt-10'>
        
        <form onSubmit={handleSubmit} className='bg-gradient-to-br from-primary to-secondary rounded-3xl w-3xl h-120 px-6 py-4 shadow-lg '>

            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl title'>Add Food</h1>
                <X onClick={()=>setIsOpen(false)}/>
            </div>
            
            <div className='flex justify-between'>
                <div className='flex flex-col gap-8 mt-10'>
                    <label>
                        <input type="text" className='bg-white font-medium rounded-full pl-4 py-2 w-60 outline-none' placeholder='Food Name' onChange={(e)=>setName(e.target.value)} value={name} required />
                    </label>
                    <label>
                        <input type="number" className='bg-white rounded-full px-4 py-2 w-60 outline-none font-medium' placeholder='Food Price' onChange={(e)=>setAmount(e.target.value)} value={amount} required/>
                    </label>
                    <label htmlFor='category' className='flex flex-col gap-2  font-medium'>
                        <select className='w-60 text-gray-500 bg-white rounded-full outline-none border border-secondary py-2 px-2' name='category' id='category' onChange={(e)=>setCategory(e.target.value)} value={category} required>
                            <option value="">Select Food Category</option>
                            {foodCategory.map((item, i) => (
                                <option className='font-medium' key={i} value={item.title}>{item.title}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor='image' className='flex justify-between w-60 gap-2  font-medium items-center bg-white py-2 px-4 rounded-full'>
                        <p className='text-gray-500'>Select Food Image</p>
                        <Image size={25} />
                        <input type="file" id='image' accept='image/*' hidden  onChange={(e)=>setImage(e.target.files[0])} />
                    </label>

                    <button type='submit' className='bg-secondary w-full hover:bg-secondary/70 transition-all duration-300 border-primary border-2 text-primary py-2 px-6 rounded-full  font-bold '>Add Food</button>
                </div>

                <div>
                    <img className={`w-100 ${!image && "opacity-50"} `} src={!image ? "/empty_img.png" : URL.createObjectURL(image)} />
                </div>
            </div>
        </form>
    </div>
    
  )
}

export default AddFood