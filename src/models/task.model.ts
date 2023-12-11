import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        
    },
    status: {
        type: Boolean,
        default: true,
        
    }
});

export const TaskModel = model('task',
    taskSchema);