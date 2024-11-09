import express from "express";
import {config} from "./src/config/config.js";
import { connectToDatabase } from "./src/config/database.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import userRoutes from "./src/routes/user.route.js";
import recipeRoutes from "./src/routes/recipe.route.js";

const app = express();
connectToDatabase();
app.use(express.json());


app.use("/api/recipes", recipeRoutes);
app.use('/api/users', userRoutes);
app.use(errorHandler)

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
}
);

