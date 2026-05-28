import mongoose from "mongoose";

const interviewSchema = mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:[
            "Easy",
            "Medium",
            "Hard"
        ],
        default:"Easy"
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},
{
    timestamps:true
}
);

const Interview=
mongoose.model(
"Interview",
interviewSchema
);

export default Interview;