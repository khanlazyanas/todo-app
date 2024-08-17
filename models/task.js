import mongoose from "mongoose"


const schema = new mongoose.Schema({
    title:String,
    description:{
       type:String,
       unique:true,
       required:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
})

export const Task = mongoose.model("Task",schema)

