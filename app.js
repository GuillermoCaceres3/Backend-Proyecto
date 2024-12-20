import express from "express";
import {config} from "./src/config/config.js";
import { connectToDatabase } from "./src/config/database.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRoutes from "./src/routes/user.route.js";
import recipeRoutes from "./src/routes/recipe.route.js";
import postRoutes from "./src/routes/post.route.js"
import paypalRoutes from "./src/routes/paypal.route.js";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
connectToDatabase();
app.use(cors());
app.use(express.json());


app.use("/api/recipes", recipeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/uploads', express.static(path.join(__dirname,'src', 'uploads')));

app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
}
);

