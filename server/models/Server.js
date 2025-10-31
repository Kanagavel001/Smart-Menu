import mongoose from "mongoose";

const serverSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tableNumber: {type: Number, required: true},
    image: {type: String, required: true},
});

const Server = mongoose.model('Server', serverSchema);

export default Server;