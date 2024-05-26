import mongoose, { ConnectOptions } from "mongoose";

const connectMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI ?? "", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        } as ConnectOptions);
        console.log("Mongo Connected succesfully")
    } catch (error) {
        throw new Error("Error connecting to MongoDB")
    }
}

export default connectMongoDB;