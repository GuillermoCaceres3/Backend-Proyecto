import express from "express";
import {config} from "./src/config/config.js";
import { connectToDatabase } from "./src/config/database.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();
connectToDatabase();
app.use(express.json());
app.use(errorHandler)
app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
}
);
