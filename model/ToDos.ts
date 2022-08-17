import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

interface IToDo {
    id: string;
    text: string;
    date: string;
    category: Categories;
}

type Categories = "TO_DO" | "DOING" | "DONE";

const ToDoSchema = new Schema<IToDo>(
    {
        id: String,
        text: String,
        date: String,
        category: String,
    },
    { versionKey: false }
);
export const ToDo = mongoose.model<IToDo>("ToDo", ToDoSchema);
