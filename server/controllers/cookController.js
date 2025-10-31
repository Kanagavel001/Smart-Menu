import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Cook from '../models/Cook.js';

export const addCook = async (req, res) => {
    try {
        
        const {name, category } = JSON.parse(req.body.cookData);
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

        await Cook.create({name, category, image });
        res.json({success: true, message: "Cook Added Successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getCooks = async (req, res) => {
    try {
        const cooks = await Cook.find({});
        res.json({success: true, cooks})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getcook = async (req, res) => {
    try {
        const { id } = req.params;
        const cook = await Cook.findById(id);
        res.json({success: true, cook});
    } catch (error) {
        res.json({success: false, message: error.message});
        
    }
}