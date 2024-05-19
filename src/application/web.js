// this class for Express
import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { userRouter } from "../route/api.js";
import multer from "multer";

export const web = express();
const upload = multer();

// Middleware to parse application/json
web.use(express.json());

// Middleware to parse application/x-www-form-urlencoded
web.use(express.urlencoded({ extended: true }));

// Middleware to parse multipart/form-data
web.use(upload.none());

web.use(publicRouter);
web.use(userRouter);
web.use(errorMiddleware);
