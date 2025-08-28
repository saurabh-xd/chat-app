import mongoose from "mongoose";

const moongose = mongoose

export const connectDB = async ()=>{
    try {
        moongose.connection.on('connected', ()=> console.log('Database Connected'));
        
      await  mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    } catch (error) {
        console.log("MONGODB CONNECTION ERROR", error);
        process.exit(1)
    }
}