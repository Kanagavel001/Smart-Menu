import fs from 'fs'
import imagekit from '../configs/imageKit.js';
import Server from '../models/Server.js';

export const addServer = async (req, res) => {
    try {
        
        const {name, tableNumber } = JSON.parse(req.body.serverData);
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

        await Server.create({name, tableNumber, image });
        res.json({success: true, message: "Server Added Successfully"});
    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

export const getServers = async (req, res) => {
    try {
        const servers = await Server.find({});
        res.json({success: true, servers})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}