import imagekit from "../configs/imageKit.js";
import Food from "../models/Food.js";
import fs from 'fs'



export const addFood = async (req, res) => {
    try {
        
        const {name, category, amount} = JSON.parse(req.body.foodData);
        const imageFile = req.file;
        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload Image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/smart_menu'
        });

        // Optimization through imagekit URL transfomation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // Convert to modern format 
                {width: '1280'}  // Width resizing
            ]
        });

        const image = optimizedImageUrl;

        await Food.create({name, category, amount, image });
        res.json({success: true, message: "Food Added Successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json({success: true, foods});
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateStack = async (req, res) => {
    try {
        const { foodId, inStack } = req.body;
        await Food.findByIdAndUpdate(foodId, {stack: !inStack});
        res.json({success: true, message: "Food Stack Updated"})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const updateAmount = async (req, res) => {
    try {
        const { foodId, amount } = req.body;
        await Food.findByIdAndUpdate(foodId, {amount: amount})
        res.json({success: true, message: "Amount updated successfully"})
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}