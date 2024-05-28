import mongoose from "mongoose"

const AppUserSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
})

export default mongoose.models.AppUser || mongoose.model("AppUser", AppUserSchema)