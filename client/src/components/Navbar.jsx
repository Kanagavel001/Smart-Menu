import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [page, setPage] = useState('/cart');

    const { navigate, cartCount } = useAppContext();

    useEffect(() => {
        if(location.pathname === '/order' ){
            if(cartCount === 0){
                setPage('/order');
            }else{
                setPage('/cart');
            }
        }else if(location.pathname === '/cart') {
            if(cartCount === 0){
                navigate('/order');
            }else{
                setPage('/order');
            }
        }
        if(location.pathname !== '/order' || location.pathname !== '/cart'){
            setIsScrolled(true);
            return;
        }else{
            setIsScrolled(false);
        }
        setIsScrolled(prev => location.pathname !== '/order' || location.pathname !== '/cart' ? true : prev);
        
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [cartCount]);

  return (
    <div className={`fixed top-0 left-0 text-text bg-transparent w-full z-50 flex items-center justify-between xl:px-36 lg:px-25 md:px-18 px-4  ${isScrolled ? "shadow-md backdrop-blur-lg py-2 md:py-4" : "md:py-5 py-3" }`}>
        <div className='flex items-center gap-2'>
            <img className='w-10' src='/smart_menu.png' alt="" />
            <h1 className='text-2xl font-bold title'>SMART MENU</h1>
        </div>
        <div className=' relative'>
            <img onClick={()=>{
                if(cartCount === 0){
                    toast("First select any food");
                }
                navigate(page);}} className='w-10 min-sm:w-12 cursor-pointer' src='/cart.png' alt="" />
            {cartCount > 0 && <div className=' absolute font-semibold text-bg  max-sm:text-xs text-sm  bottom-6 left-7 bg-gradient-to-bl to-primary from-secondary px-1 min-sm:px-1.5 rounded-full'>{cartCount}</div>}
        </div>
    </div>
  )
}

export default Navbar