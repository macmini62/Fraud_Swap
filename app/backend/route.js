import express from "express";
import { postData } from "./controller.js";

const router = express.Router()

export default router.get("/proxy/:phoneNumber", postData)
