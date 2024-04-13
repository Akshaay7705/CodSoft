import mongoose, {Schema} from "mongoose";

const jobSchema = mongoose.Schema({
    job_id : {
        type : String,
        required: true
   },
    title : {
        type: String,
        required: true,
    },
    job_time : {
        type: String,
        required: true,
    },
    skills : {
        type : [],
        required : true,
    },
    place : {
        type : String,
        required :true
    },
    description: {
        type : [],
        required : true
    },
    responsibility : {
        type : [],
        default : "",
    },
    qualification : {
        type : [],
        default : "",
    },
    company_id : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
});

export default mongoose.model('jobs', jobSchema);