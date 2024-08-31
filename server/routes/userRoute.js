import express from "express";
import { login, newUser } from "../controllers/userController.js";

const app = express.Router();

app.post('/new',newUser)
app.get('/',  login)

export default app