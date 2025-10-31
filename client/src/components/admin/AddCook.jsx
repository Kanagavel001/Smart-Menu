import { Image, X } from 'lucide-react';
import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCook = ({setIsOpen}) => {

    const { foodCategory, axios } = useAppContext();

    const [name,setName] = useState('');
    const [category,setCategory] = useState('');
    const [image, setImage] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cookData = {
                name, category
            }

            const formData = new FormData();
            formData.append('cookData', JSON.stringify(cookData));
            formData.append('image', image);

            const { data } = await axios.post('/api/cook/add', formData);

            if(data.success){
                toast.success(data.message);
                setName('');
                setCategory('');
                setImage(false);
                setIsOpen(false);
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <div className='z-50 mx-auto max-w-screen h-screen overflow-x-hidden flex items-center justify-center -mt-10'>
        
        <form onSubmit={handleSubmit} className='bg-gradient-to-br from-primary to-secondary rounded-3xl w-3xl h-120 px-6 py-4 shadow-lg '>

            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-2xl title'>Add Cook</h1>
                <X onClick={()=>setIsOpen(false)}/>
            </div>
            
            <div className='flex justify-between'>
                <div className='flex flex-col gap-10 mt-16'>
                    <label className='font-medium'>
                        <input type="text" className='bg-white rounded-full pl-4 py-2 w-60 outline-none' placeholder='Cook Name' onChange={(e)=>setName(e.target.value)} value={name} required />
                    </label>
                    <label htmlFor='category' className='flex flex-col gap-2  font-medium'>
                        <select className='w-60 bg-white  outline-none border border-secondary py-2 rounded-full text-gray-500 px-2' name='category' id='category' onChange={(e)=>setCategory(e.target.value)} value={category} required>
                            <option value="">Select Cook Category</option>
                            {foodCategory.map((item, i) => (
                                <option key={i} value={item.title}>{item.title}</option>
                            ))}
                        </select>
                    </label>
                    <label htmlFor='image' className='flex justify-between  font-medium items-center bg-white py-2 px-4 rounded-full w-60'>
                        <p className='text-gray-500'>Select Cook Image</p>
                        <Image size={25} />
                        <input type="file" id='image' accept='image/*' hidden  onChange={(e)=>setImage(e.target.files[0])} />
                    </label>

                    <button type='submit' className='bg-secondary hover:bg-secondary/70 transition-all duration-300 border-primary border-2 text-primary py-2 px-6 rounded-full  font-bold '>Add Cook</button>
                </div>

                <div>
                    <img className={`w-100 ${!image && "opacity-50"} `} src={!image ? "/empty_img.png" : URL.createObjectURL(image)} />
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddCook