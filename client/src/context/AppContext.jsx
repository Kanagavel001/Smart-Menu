import { createContext, useContext, useState } from  'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useEffect } from 'react';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('MainDish');
    const [foods, setFoods] = useState([]);
    const [cooks, setCooks] = useState([]);
    const [servers, setServers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartAmount, setCartAmount] = useState(0);
    const [tableNumber, setTableNumber] = useState('');

    const foodCategory = [
        {title: "MainDish", icon: '/main_course.png' },
        {title: "Starters", icon: '/starters.png' },
        {title: "Snacks", icon: '/snacks.png' },
        {title: "Desserts", icon: '/desserts.png' },
        {title: "Beverages", icon: '/beverages.png' }
    ]

    const fetchFoods = async () => {
        try {
            const { data } = await axios.get('/api/food/get');
            if(data.success){
                setFoods(data.foods)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const fetchCooks = async () => {
        try {
            const { data } = await axios.get('/api/cook/get-all');
            if(data.success){
                setCooks(data.cooks)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchServers = async () => {
        try {
            const { data } = await axios.get('/api/server/get');
            if(data.success){
                setServers(data.servers)
            }else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const fetchOrders = async () => {
        try {
          const { data } = await axios.get('/api/order/get-all');
          if(data.success){
            setOrders(data.orders)
          }else{
            toast.error(data.message);
          }
        } catch (error) {
          toast.error(error.message)
        }
    }

    const addToCart = async (foodId) => {
        const food = foods.find(food => food._id === foodId)
        if(!food.stack){
            toast(`${food.name} is not available`);
            return;
        }
        const cartItemsData = JSON.parse(localStorage.getItem('cartItems')) || [];

        let updatedCart = cartItemsData.map(item =>
            item._id === foodId
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );

        const exists = cartItemsData.some(item => item._id === foodId);
        if (!exists) {
            updatedCart.push({ ...food, quantity: 1 });
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(cartItems.length)
    }

    const removeFromCart = async (foodId) => {
        const cartItemsDate = JSON.parse(localStorage.getItem('cartItems')) || [];
        const updatedCart = cartItemsDate.map(item => {
            if (item._id === foodId) {
                const newQty = (item.quantity || 1) - 1;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
            }
            return item;
        }).filter(Boolean);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(cartItems.length)
    }

    const selectCart = async (foodId) => {
        const food = foods.find(food => food._id === foodId)
        if(!food.stack){
            toast(`${food.name} is not available`);
            return;
        }
        const cartItemsData = JSON.parse(localStorage.getItem('cartItems')) || [];

        const exists = cartItemsData.some(item => item._id === foodId);
        let updatedCart;
        if (!exists) {
            updatedCart = [...cartItemsData, { ...food, quantity: 1 }];
        } else {
            updatedCart = cartItemsData.filter(food => food._id !== foodId)
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
        setCartCount(cartItems.length)
    }

    const fetchCartItems = async () => {
        try {
            const cartData = JSON.parse(localStorage.getItem('cartItems')) || [];
            if(cartData !== cartItems){
                setCartItems(cartData);
            }
        } catch (error) {
            toast(error.message);
        }
    };

    const fetchCartData = async () => {
        setCartCount(cartItems.length)
        let totalAmount = 0;
        cartItems.map(item => totalAmount += (item.quantity) * item.amount)
        setCartAmount(totalAmount);
    }

    useEffect(()=>{
        fetchFoods();
        fetchCartItems();
    },[]);

    useEffect(()=>{
        fetchCartData();
    },[cartItems])

    const value = { axios, navigate, selectedCategory, setSelectedCategory, foodCategory, foods, fetchCooks, fetchFoods, cooks, servers, orders, fetchServers, addToCart, removeFromCart, fetchCartItems, cartItems , setCartItems, selectCart, cartCount, cartAmount, tableNumber, setTableNumber, fetchOrders };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
};

export const useAppContext = () => {
    return useContext(AppContext);
};