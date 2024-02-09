import mongoose, { Mongoose } from "mongoose";

const employeeSchema = new mongoose.Schema({
    employeeCode: {
      type: Number,
      required: true,
      unique: true
    },
    employeeName: {
      type: String,
      required: true
    },
    salaryStatus: {
      type: String,
      enum: ['valid', 'not valid'],
      default: 'valid'
    },
    dateOfHiring: {
      type: Date,
      required: true
    },
    jobCode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'jop'
    }
  });

  
  const Employee = mongoose.model('Employee', employeeSchema);

  export default Employee;