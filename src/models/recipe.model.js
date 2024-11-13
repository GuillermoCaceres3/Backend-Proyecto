import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    ingredients: [
        {
            name:{type:String, required:true},
            quantity:{type:String, required:true},
            unit:{type:String, required:true}
        },
    ],
    steps: [
        {
            stepNumber:{type:String, required:true},
            instruction:{type:String, required:true}
        }
    ],
    prepTime: {
        type: Number,
        required: true,
    },
    cookTime: {
        type: Number,
        required: true,
    },
    servings: {
        type: Number,
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    author: {
        type: String,
        required: true,
    },
    isExclusive: { 
        type: Boolean,
        default: false, 
    }
},
    {timestamps: true}
);

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;