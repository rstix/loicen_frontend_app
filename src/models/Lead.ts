import { Schema, model, models } from 'mongoose';

export interface LeadDocument {
  _id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<LeadDocument>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Lead = models.Lead || model<LeadDocument>('Lead', LeadSchema);

export default Lead;
