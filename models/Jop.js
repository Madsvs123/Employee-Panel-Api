import mongoose from "mongoose";

const jopSchema = new mongoose.Schema({
    title : {
        type : String,
        required: true
    }, 
    description : {
        type : String,
    },
    salary : {
        type : Number,
        required: true
    }
  }, {timestamps : true});
  
  const Jop = mongoose.model('jop', jopSchema);
  
  export default Jop