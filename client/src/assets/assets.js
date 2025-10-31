import sweet_corn_soup from './Sweet_Corn_Soup.png'
import tomato_soup from './tomato_soup.png'
import mushroom_soup from './mushroom_soup.png'
import chicken_soup from './chicken_soup.png'
import seafood_soup from './seafood_soup.png'
import mutton_soup from './mutton_soup.png'
import fruit_salad from './fruit_salad.png'
import vegetable_salad from './vegetable_salad.png'
import pasta_salad from './pasta_salad.png'
import spring_rolls from './spring_rolls.png'
import chicken_wings from './chicken_wings.png'
import paneer_tikka from './paneer_tikka.png'
import chicken_satay from './chicken_satay.png'
import cheese_balls from './cheese_balls.png'
import chicken_biryani from './chicken_biryani.png'
import Prawn_Biryani from './Prawn_Biryani.png'
import rise_noodles from './rise_noodles.png'
import spaghetti from './spaghetti.png'
import egg_noodles from './egg_noodles.png'
import vegetable_fried_rice from './vegetable_fried_rice.png'
import chicken_fried_rice from './chicken_fried_rice.png'
import egg_fried_rice from './egg_fried_rice.png'
import margherita_pizza from './margherita_pizza.png'
import chicken_tikka_pizza from './chicken_tikka_pizza.png'
import vegetable_pizza from './vegetable_pizza.png'
import grilled_chicken from './grilled_chicken.png'
import grilled_shrimp from './grilled_shrimp.png'
import grilled_salmon from './grilled_salmon.png'
import chicken_shawarma from './chicken_shawarma.png'
import beef_shawarma from './beef_shawarma.png'
import vegetable_shawarma from './vegetable_shawarma.png'
import burger from './burger.png'


export const assets = {

    sweet_corn_soup,
    tomato_soup,
    mushroom_soup,
    chicken_soup,
    seafood_soup,
    mutton_soup,

    fruit_salad,
    vegetable_salad,
    pasta_salad,

    spring_rolls,
    chicken_wings,
    paneer_tikka,
    chicken_satay,
    cheese_balls,

    chicken_biryani,
    Prawn_Biryani,

    rise_noodles,
    spaghetti,
    egg_noodles,

    vegetable_fried_rice,
    chicken_fried_rice,
    egg_fried_rice,

    margherita_pizza,
    chicken_tikka_pizza,
    vegetable_pizza,

    grilled_chicken,
    grilled_shrimp,
    grilled_salmon,

    chicken_shawarma,
    beef_shawarma,
    vegetable_shawarma,

    burger
}

export const foodCategories = [
    "Starters",
    "Main Dish",
    "Snacks",
    "Desserts",
    "Beverages"
]

export const dummyFoodData = [
    {
        _id: 1,
        name: "Chicken Biryani",
        image: chicken_biryani,
        category: "Snacks",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 2,
        name: "Chicken Biryani",
        image: sweet_corn_soup,
        category: "MainDish",
        stack: false,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 3,
        name: "Chicken Biryani",
        image: mutton_soup,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 4,
        name: "Chicken Biryani",
        image: grilled_shrimp,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 5,
        name: "Chicken Biryani",
        image: fruit_salad,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 6,
        name: "Chicken Biryani",
        image: chicken_shawarma,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 7,
        name: "Chicken Biryani",
        image: cheese_balls,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 8,
        name: "Chicken Biryani",
        image: grilled_salmon,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 9,
        name: "Chicken Biryani",
        image: margherita_pizza,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    },
    {
        _id: 10,
        name: "Chicken Biryani",
        image: paneer_tikka,
        category: "MainDish",
        stack: true,
        amount: 100,
        quantity: 4,
    }
    
]

export const  dummyCooksData = [
    {
        _id: "1", 
        name: "Ajith",
        image: '/cook.png',
        category: "MainDish",
    },
    {
        _id: "2", 
        name: "Elangovan",
        image: '/cook.png',
        category: "MainDish",
    },
    {
        _id: "3", 
        name: "Gowtham",
        image: '/cook.png',
        category: "MainDish",
    },
    {
        _id: "4", 
        name: "Kabilan",
        image: '/cook.png',
        category: "MainDish",
    },
    {
        _id: "5", 
        name: "Kirubananthu",
        image: '/cook.png',
        category: "MainDish",
    },
    {
        _id: "6", 
        name: "Kanagavel",
        image: '/cook.png',
        category: "MainDish",
    }
]

export const  dummyServersData = [
    {
        _id: "1", 
        name: "Ajith",
        image: '/cook.png',
        table_no: 1,
    },
    {
        _id: "2", 
        name: "Elangovan",
        image: '/cook.png',
        table_no: 2,
    },
    {
        _id: "3", 
        name: "Gowtham",
        image: '/cook.png',
        table_no: 3,
    },
    {
        _id: "4", 
        name: "Kabilan",
        image: '/cook.png',
        table_no: 4,
    },
    {
        _id: "5", 
        name: "Kirubananthu",
        image: '/cook.png',
        table_no: 5,
    },
    {
        _id: "6", 
        name: "Kanagavel",
        image: '/cook.png',
        table_no: 6,
    }
]

export const dummyOrderData = [
    {
        _id: "11",
        table_no: 3,
        orderStatus: "complete",
        foodStatus: "preparing",
        foodDetails: dummyFoodData,
        totalAmount: 500,
        paid: false
    },
    {
        _id: "22",
        table_no: 3,
        orderStatus: "complete",
        foodStatus: "preparing",
        foodDetails: dummyFoodData,
        totalAmount: 500,
        paid: false
    },
    {
        _id: "33",
        table_no: 3,
        orderStatus: "complete",
        foodStatus: "ready",
        foodDetails: dummyFoodData,
        totalAmount: 500,
        paid: false
    },
    {
        _id: "44",
        table_no: 3,
        orderStatus: "completed",
        foodStatus: "ready",
        foodDetails: dummyFoodData,
        totalAmount: 500,
        paid: false
    },
    {
        _id: "55",
        table_no: 3,
        orderStatus: "completed",
        foodStatus: "ready",
        foodDetails: dummyFoodData,
        totalAmount: 500,
        paid: true
    },
    
]

export const subFoodCategories = [
    {
        category: "Starters", 
        subCategories: [
            "Veg & non-veg Soups", "Salads", "Finger Foods"
        ]
    },
    {
        category: "Main Course",
        subCategories: [
            "Biryanis", "Meals", "Noodles", "Fried Rise", "Pizza", "Grilled Items", "Shawarma"
        ]
    },
    {
        category: "Snacks", 
        subCategories: [
            "Pani Puri & Bhel Puri", "Samosa", "Sandwich", "Burger", "Momos"
        ]
    },
    {
        category: "Desserts", 
        subCategories: [
            "Cakes", "Pastries", "Ice Creams", "Gulab Jamun", "Rasgulla", "Jalebi"
        ]
    },
    {
        category: "Beverages", 
        subCategories: [
            "Coffee", "Tea", "Coca Cola", "Orange Juice", "Choclate Milkshake", "Blackberry Smoothie"
        ]
    }
]