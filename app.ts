require("dotenv").config();
import { ObjectID } from "bson";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { ToDo } from "./model/ToDos";

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MONGO_URL } = process.env;
app.use(cors());

// body-parsing
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// DB연결
mongoose
    .connect(MONGO_URL!)
    .then(() => console.log("Successfully connected to mongodb"))
    .catch((e) => console.error(e));

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    res.send("welcome");
});

// ToDo 리스트
app.get("/api/todos", async (req: Request, res: Response) => {
    const data = await ToDo.find({});
    res.json(data);
});

// ToDo삭제
app.delete("/todo/delete", async (req: Request, res: Response) => {
    const { id } = await req.body;
    try {
        await ToDo.deleteOne({ id });
    } catch (err) {
        console.log(err);
    }
    return;
});

// ToDo 생성
app.post("/post", async (req: Request, res: Response) => {
    console.log(req.body);
    const { id, text, date, category } = req.body.data;
    const toDo = new ToDo({
        id,
        text,
        date,
        category,
    });
    await toDo.save();
    res.json(toDo);
});

app.put("/update/todo", async (req: Request, res: Response) => {
    console.log(req.body);
    const { id, newCategory } = req.body.data;
    await ToDo.findOne({ id }).updateOne({ category: newCategory });
});

app.listen("8080");
