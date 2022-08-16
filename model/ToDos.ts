import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

const ToDoSchema = new Schema(
    {
        _id: ObjectId,
        id: String,
        text: String,
        date: String,
        category: String,
    },
    { versionKey: false }
);
export const ToDo = mongoose.model("ToDo", ToDoSchema);
