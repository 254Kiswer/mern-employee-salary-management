import AttendanceData from "../models/AttendanceDataModel.js";
import EmployeeData from "../models/EmployeeDataModel.js";
import JobTitleData from "../models/JobTitleDataModel.js";
import SalaryDeduction from "../models/SalaryDeductionModel.js";
import moment from "moment";
import "moment/locale/id.js";

// method untuk menampilkan semua Data Kehadiran
export const viewAttendanceData = async (req, res) => {
  let resultAttendanceData = [];
  try {
    // Get data kehadiran
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "id",
        "month",
        "nid",
        "employeeName",
        "gender",
        "jobTitle",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      distinct: true,
    });

    resultAttendanceData = attendance_data.map((attendance) => {
      const id = attendance.id;
      const createdAt = new Date(attendance.createdAt);
      const year = createdAt.getFullYear();
      const month = attendance.month;
      const nid = attendance.nid;
      const employeeName = attendance.employeeName;
      const jobTitle = attendance.jobTitle;
      const gender = attendance.gender;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        id,
        month,
        year,
        nid,
        employeeName,
        jobTitle,
        gender,
        present,
        sick,
        absent,
      };
    });
    res.json(resultAttendanceData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Data Kehadiran by ID
export const viewAttendanceDataByID = async (req, res) => {
  try {
    const attendanceData = await AttendanceData.findOne({
      attributes: [
        "id",
        "year",
        "nid",
        "employeeName",
        "gender",
        "jobTitle",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      where: {
        id: req.params.id,
      }
    });
    res.json(attendanceData);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// method untuk menambah data kehadiran
export const createAttendanceData = async (req, res) => {
  const {
    nik,
    employeeName,
    jobTitle,
    gender,
    present,
    sick,
    absent,
  } = req.body;

  try {
    const employeNameData = await employeeName.findOne({
      where: {
        employeeName: employeeName,
      },
    });

    const employeeNameData = await employeeName.findOne({
      where: {
        employeeName: employeeName,
      },
    });

    const employeeNidData = await EmployeeData.findOne({
      where: {
        nid: nid,
      },
    });

    const name_already_exists = await AttendanceData.findOne({
      where: {
        employeeName: employeeName,
      },
    });

    if (!employeeNameData) {
      return res.status(404).json({ msg: "Employee name data not found" });
    }

    if (!employeeNameData) {
      return res.status(404).json({ msg: "Job title name data not found" });
    }

    if (!employeeNidData) {
      return res.status(404).json({ msg: "NID data not found" });
    }

    if (!name_already_exists) {
      const month = moment().locale("id").format("MMMM");
      await AttendanceData.create({
        month: month.toLowerCase(),
        nid: nid,
        employeeName: employeeNameData.employeeName,
        gender: gender,
        jobTitle: JobTitleData.jobTitle,
        present: present,
        sick: sick,
        absent: absent,
      });
      res.json({ msg: "Attendance Data Successfully Added" });
    } else {
      res.status(400).json({ msg: "Name data already exists" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk update data kehadiran
export const updateAttendanceData = async (req, res) => {
  try {
    await AttendanceData.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Attendance data successfully updated" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk delete data kehadiran
export const deleteAttendanceData = async (req, res) => {
  try {
    await AttendanceData.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Delete data Successfully" });
  } catch (error) {
    console.log(error.msg);
  }
};

// method untuk create data potongan gaji
export const createSalaryDeductionData = async (req, res) => {
  const { id, deduction, total_deduction } = req.body;
  try {
    const deductionName = await SalaryDeduction.findOne({
      where: {
        deduction: deduction,
      },
    });
    if (deductionName) {
      res.status(400).json({ msg: "Deduction data already exists!" });
    } else {
      await SalaryDeduction.create({
        id: id,
        deduction: deduction,
        total_deduction: total_deduction.toLocaleString(),
      });
      res.json({ msg: "Salary Deduction Data Successfully Added" });
    }
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan semua Data Potongan
export const viewDeductionData = async (req, res) => {
  try {
    const deductionData = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "total_deduction"],
    });
    res.json(deductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk menampilkan Data Potongan By ID
export const viewDeductionDataByID = async (req, res) => {
  try {
    const deductionData = await SalaryDeduction.findOne({
      attributes: ["id", "deduction", "total_deduction"],
      where: {
        id: req.params.id,
      },
    });
    res.json(deductionData);
  } catch (error) {
    console.log(error);
  }
};

// method untuk update Data Potongan
export const updateDeductionData = async (req, res) => {
  try {
    await SalaryDeduction.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Deduction data successfully updated" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk delete data potongan
export const deleteDeductionData = async (req, res) => {
  try {
    await SalaryDeduction.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "Delete data successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

// method untuk mengambil data gaji pegawai (data pegawai + data jabatan + data kehadiran + data potongan)

// method untuk mengambil data pegawai :
export const getEmployeeData = async () => {
  let resultEmployeeData = [];

  try {
    // Get data pegawai:
    const employee_data = await EmployeeData.findAll({
      attributes: ["id", "nid", "employeeName", "gender", "job_title"],
      distinct: true,
    });

    resultEmployeeData = employee_data.map((employee) => {
      const id = employee.id;
      const nid = employee.nid;
      const employeeName = employee.employeeName;
      const gender = employee.gender;
      const job_title = employee.job_title;

      return { id, nid, employeeName, gender, job_title };
    });
  } catch (error) {
    console.error(error);
  }

  return resultEmployeeData;
};

// method untuk mengambil data jabatan :
export const getJobTitleData = async () => {
  let resultJobTitleData = [];
  try {
    // get data jabatan :
    const jobTitle_data = await JobTitleData.findAll({
      attributes: ["job_title", "basic_salary", "transport_allowance", "meal_allowance"],
      distinct: true,
    });

    resultJobTitleData = jobTitle_data.map((jobTitle) => {
      const job_title = jobTitle.job_title;
      const basic_salary = jobTitle.basic_salary;
      const transport_allowance = jobTitle.transport_allowance;
      const meal_allowance = jobTitle.meal_allowance;

      return { job_title, basic_salary, transport_allowance, meal_allowance };
    });
  } catch (error) {
    console.error(error);
  }
  return resultJobTitleData;
};

// method untuk mengambil data kehadiran :
export const getAttendanceData = async () => {
  try {
    // Get data kehadiran
    const attendance_data = await AttendanceData.findAll({
      attributes: [
        "month",
        "nid",
        "employeeName",
        "gender",
        "job_title",
        "present",
        "sick",
        "absent",
        "createdAt",
      ],
      distinct: true,
    });

    const resultAttendanceData = attendance_data.map((attendance) => {
      const createdAt = new Date(attendance.createdAt);
      const tahun = createdAt.getFullYear();
      const month = attendance.month;
      const nid = attendance.nid;
      const employeeName = attendance.employeeName;
      const job_title = attendance.job_title;
      const present = attendance.present;
      const sick = attendance.sick;
      const absent = attendance.absent;

      return {
        month,
        year,
        nid,
        employeeName,
        job_title,
        present,
        sick,
        absent,
      };
    });
    return resultAttendanceData;
  } catch (error) {
    console.error(error);
  }
};

export const getDeductionData = async () => {
  let resultDeductionData = [];
  try {
    // get data potongan :
    const deduction_data = await SalaryDeduction.findAll({
      attributes: ["id", "deduction", "total_deduction"],
      distinct: true,
    });
    resultDeductionData = deduction_data.map((deduction) => {
      const id = deduction.id;
      const deduction_name = deduction.deduction;
      const total_deduction = deduction.total_deduction;

      return { id, deduction_name, total_deduction };
    });
  } catch (error) {
    console.error(error);
  }
  return resultDeductionData;
};

// Logika matematika
export const getEmployeeSalaryData = async () => {
  try {
    // Gaji Pegawai :
    const resultEmployeeData = await getEmployeeData();
    const resultJobTitleData = await getJobTitleData();

    const employee_salary = resultEmployeeData
      .filter((employee) =>
        resultJobTitleData.some(
          (jobTitle) => jobTitle.job_title === employee.employee_jobTitle
        )
      )
      .map((employee) => {
        const employeeData = resultJobTitleData.find(
          (jobTitle) => jobTitle.job_title === employee.employee_jobTitle
        );
        return {
          id: employee.id,
          nid: employee.nid,
          employeeName: employee.employeeName,
          jobTitle: employee.employee_jobTitle,
          basic_salary: jobTitle.basic_salary,
          transport_allowance: jobTitle.transport_allowance,
          meal_allowance: jobTitle.meal_allowance,
        };
      });

    // Potongan Pegawai :
    const resultAttendanceData = await getAttendanceData();
    const resultDeductionData = await getDeductionData();

    const employee_deduction = resultAttendanceData.map((attendance) => {
      const absentDeduction = attendance.absent > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "absent")
          .reduce((total, deduction) => total + deduction.total_deduction * attendance.absent, 0) : 0;

      const sickDeduction = attendance.sick > 0 ?
        resultDeductionData
          .filter((deduction) => deduction.deduction_name.toLowerCase() === "sick")
          .reduce((total, deduction) => total + deduction.total_deduction * attendance.sick, 0) : 0;

      return {
        year: attendance.year,
        month: attendance.month,
        employeeName: attendance.employeeName,
        present: attendance.present,
        sick: attendance.sick,
        absent: attendance.absent,
        sickDeduction: sickDeduction,
        absentDeduction: absentDeduction,
        total_deduction: sickDeduction + absentDeduction
      };
    });

    // Total Gaji Pegawai :
    const total_employee_salary = employee_salary.map((employee) => {
      const id = employee.id;
      const attendance = resultAttendanceData.find(
        (attendance) => attendance.employeeName === attendance.employeeName
      );
      const deduction = employee_deduction.find(
        (deduction) => deduction.employeeName === employee.employeeName
      );
      const total_salary =
      (employee.basic_salary +
      employee.transport_allowance +
      employee.meal_allowance -
      (deduction ? deduction.total_deduction : 0)).toLocaleString();

      return {
        year: deduction ? deduction.year : attendance ? attendance.year : 0,
        month: deduction ? deduction.month : attendance ? attendance.month : 0,
        id: id,
        nid: employee.nid,
        employeeName: employee.employeeName,
        jobTitle: employee.jobTitle,
        basic_salary: employee.basic_salary.toLocaleString(),
        transport_allowance: employee.transport_allowance.toLocaleString(),
        meal_allowance: employee.meal_allowance.toLocaleString(),
        present: attendance.present,
        sick: attendance.sick,
        absent: attendance.absent,
        deduction: deduction ? deduction.total_deduction.toLocaleString() : 0,
        total: total_salary,
      };
    });
    return total_employee_salary;
  } catch (error) {
    console.error(error);
  }
};

// method untuk melihat data gaji pegawai
export const viewEmployeeSalaryData = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    res.status(200).json(employeeSalaryData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const viewEmployeeSalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { name } = req.params;

    const salaryDataByName = employeeSalaryData
      .filter((salary_data) => {
        return salary_data.employeeName
          .toLowerCase()
          .includes(name.toLowerCase().replace(/ /g, ""));
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          month: salary_data.month,
          id: salary_data.id,
          nid: salary_data.nid,
          employeeName: salary_data.employeeName,
          jobTitle: salary_data.jobTitle,
          gender: salary_data.gender,
          employee_jobTitle: salary_data.employee_jobTitle,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByName.length === 0) {
      return res.status(404).json({ msg: 'Data no found' });
    }
    return res.json(salaryDataByName);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// method untuk melihat data gaji pegawai berdasarkan ID
export const viewSalaryDataById = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const id = parseInt(req.params.id);

    const foundData = employeeSalaryData.find((data) => data.id === id);

    if (!foundData) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

// method untuk melihat data gaji pegawai berdasarkan Name
export const viewSalaryDataByName = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData(req, res);
    const name = req.params.name.toLowerCase();

    const foundData = employeeSalaryData.filter((data) => {
      const formattedName = data.employeeName.toLowerCase();
      const searchKeywords = name.split(" ");

      return searchKeywords.every((keyword) => formattedName.includes(keyword));
    });

    if (foundData.length === 0) {
      res.status(404).json({ msg: "Data not found" });
    } else {
      res.json(foundData);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};



// method untuk mencari data gaji pegawai berdasarkan bulan
export const viewEmployeeSalaryDataByMonth = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const response = await DataKehadiran.findOne({
      attributes: ["month"],
      where: {
        month: req.params.month,
      },
    });

    if (response) {
      const SalaryDataByMonth = employeeSalaryData
        .filter((salary_data) => {
          return salary_data.month === response.month;
        })
        .map((salary_data) => {
          return {
            month: response.month,
            id: salary_data.id,
            nid: salary_data.nid,
            employeeName: salary_data.employeeName,
            gender: salary_data.gender,
            employee_jobTitle: salary_data.employee_jobTitle,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
      return res.json(SalaryDataByMonth);
    }

    res
      .status(404)
      .json({ msg: `Data for the month ${req.params.month} not found` });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data gaji pegawai berdasarkan tahun
export const viewEmployeeSalaryDataByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salary_data) => {
        const salaryYear = salaryYear.year;
        return salaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          id: salary_data.id,
          nid: salary_data.nid,
          employeeName: salary_data.employeeName,
          gender: salary_data.gender,
          employee_jobTitle: salary_data.employee_jobTitle,
          present: salary_data.present,
          sick: salary_data.sick,
          absent: salary_data.absent,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data for the year ${year} not found` });
    }
    res.json(salaryDataByYear);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// method untuk mencari data gaji pegawai berdasarkan tahun
export const salaryReportDataByYear = async (req, res) => {
  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData
      .filter((salary_data) => {
        const salaryYear = salary_data.year;
        return salaryYear === parseInt(year);
      })
      .map((salary_data) => {
        return {
          year: salary_data.year,
          id: salary_data.id,
          nid: salary_data.nid,
          employeeName: salary_data.employeeName,
          gender: salary_data.gender,
          employee_jobTitle: salary_data.employee_jobTitle,
          basic_salary: salary_data.basic_salary,
          transport_allowance: salary_data.transport_allowance,
          meal_allowance: salary_data.meal_allowance,
          deduction: salary_data.deduction,
          total_salary: salary_data.total,
        };
      });

    if (salaryDataByYear.length === 0) {
      return res
        .status(404)
        .json({ msg: `Data of the year ${year} not found` });
    } else {
      const reportByYear = salaryDataByYear.map((data) => data.year)
      console.log(reportByYear)
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};