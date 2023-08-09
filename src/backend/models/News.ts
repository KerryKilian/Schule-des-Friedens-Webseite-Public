import { Schema, model, Types } from "mongoose";

export interface INews {
    title: string;
    subtitle: string;
    text: string;
    authorName: string;
    authorIP?: string;
    images?: string[];
    createdAt?: Date;
}

const newsSchema = new Schema<INews>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    text: { type: String, required: true },
    authorName: { type: String, required: true },
    authorIP: { type: String, required: false },
    images: { type: [String], required: false },
  },

  {
    timestamps: true,
  }
);


export const News = model("News", newsSchema);
