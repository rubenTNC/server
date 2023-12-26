import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { UserController, NewsController } from "./controllers/index.js";
import {checkAuth} from "./utils/checkAuth.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const lernDirname = __dirname.substr(0, __dirname.length - 6);

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_HOST = process.env.DB_HOST;

app.use(cors());
app.use(express.json());

//ROUTES
app.use("/static", express.static(`${lernDirname}/client/build/static`) )
app.get("/", (req, res) => {
  res.sendFile(`${lernDirname}/client/build/index.html`);
});


app.post("/auth/register", UserController.register)
app.get("/auth/login", UserController.login)
app.get("/auth/me", checkAuth, UserController.getMe)

app.get('/news/all', NewsController.getAll)




async function start() {
  try {
    await mongoose.connect(
      `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:27017/lern`
    );
    app.listen(PORT, () => console.log(`Server STAR`));
  } catch (error) {
    console.log(error);
  }
}

start();
