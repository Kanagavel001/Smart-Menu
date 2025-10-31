import mongoose from "mongoose";

const cookSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
});

const Cook = mongoose.model('Cook', cookSchema);

export default Cook;