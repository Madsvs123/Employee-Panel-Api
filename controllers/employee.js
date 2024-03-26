import Employee from "../models/Employee.js";
import Job from "../models/Jop.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate({
      path: "jobCode",
      select: "code",
    });

    const jobs = await Job.find();

    res.json({ employees, jobs });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id).populate({
      path: "jobCode",
      select: "code",
    });

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

export const addEmployee = async (req, res) => {
  try {
    var { employeeCode, employeeName, salaryStatus, dateOfHiring, jobCode } =
      req.body;
    const employeeExist = await Employee.findOne({ employeeCode });

    // Check The Existing Of Employee

    if (!employeeExist) {
      // Check The Exisiting OF employee code

      if (!employeeCode) {
        const lastEmployee = await Employee.findOne({}).sort({
          employeeCode: -1,
        });
        employeeCode = lastEmployee.employeeCode + 1;
      }

      employeeName = employeeName.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });

      // Add New Employee

      const employee = new Employee({
        employeeCode: employeeCode,
        employeeName: employeeName,
        salaryStatus: salaryStatus,
        dateOfHiring: dateOfHiring,
        jobCode: jobCode,
      });

      await employee.save();
      return res
        .status(200)
        .json({ message: `Employee ${employeeName} added successfully` });
    }

    res.status(400).json({ message: `Employee Code Already Exists` });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Edit Employee

export const EditEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    var { employeeCode, employeeName, salaryStatus, dateOfHiring, jobCode } =
      req.body;

    if (!employeeCode) {
      const lastEmployee = await Employee.findOne({}).sort({
        employeeCode: -1,
      });
      employeeCode = lastEmployee.employeeCode + 1;
    }

    employeeName = employeeName.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });

    const updateEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        employeeCode,
        employeeName,
        salaryStatus,
        dateOfHiring,
        jobCode,
      },
      { new: true }
    );

    updateEmployee.save();
    if (updateEmployee) {
      return res.status(200).json(updateEmployee);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "employee deleted" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
