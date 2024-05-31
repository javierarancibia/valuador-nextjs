import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    property: { type: String },
    reference: { type: String },
    appUser: { type: mongoose.Schema.Types.ObjectId, ref: 'AppUser', required: true }
});

export default mongoose.models.Report || mongoose.model('Report', ReportSchema);
