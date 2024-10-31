import EmployeeData from "../models/EmployeeDataModel.js";
import AttendanceData from "../models/AttendanceDataModel.js";
import { getEmployeeSalaryData } from "./TransactionController.js";
import { verifyUser } from "../middleware/AuthUser.js";

// method untuk dashboard pegawai
export const employeeDashboard = async (req, res) => {
    await verifyUser(req, res, () => {});

    const userId = req.userId;

    const response = await EmployeeData.findOne({
      where:{
        id: userId
      },
      attributes: [
        'id', 'nid', 'employeeName',
        'gender', 'job_title', 'dateOfEntry',
        'status', 'photo', 'accessRights'
      ]
    });

    res.status(200).json(response);
  };

// method untuk view gaji single pegawai by month
export const viewSingleEmployeeSalaryDataByMonth = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
      const employeeSalaryData = await getEmployeeSalaryData();

      const response = await AttendanceData.findOne({
          attributes: [
              'month'
          ],
          where: {
              bulan: req.params.month
          }
      });

      if (response) {
        const salaryDataByMonth = employeeSalaryData.filter((salary_data) => {
          return salary_data.id === user.id && salary_data.month === response.month;
        }).map((salary_data) => {
          return {
            month: response.month,
            year: salary_data.year,
            nid: user.nid,
            employeeName: user.employeeName,
            gender: user.gender,
            job_title: user.job_title,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
          };
        });
          return res.json(salaryDataByMonth);
      }

      res.status(404).json({ msg: `Salary Data for the Month of ${req.params.month} Not Found for Employee ${user.nama_pegawai}` });
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

// method untuk view gaji single pegawai by year
export const viewSingleEmployeeSalaryDataByYear = async (req, res) => {
  await verifyUser(req, res, () => {});

  const userId = req.userId;
  const user = await EmployeeData.findOne({
    where:{
      id: userId
    }
  });

  try {
    const employeeSalaryData = await getEmployeeSalaryData();
    const { year } = req.params;

    const salaryDataByYear = employeeSalaryData.filter((salary_data) => {
        return salary_data.id === user.id && salary_data.year === parseInt(year);
    }).map((salary_data) => {
        return {
            year: salary_data.year,
            month: salary_data.month,
            nid: user.nid,
            employeeName: user.employeeName,
            gender: user.gender,
            job_title: user.job_title,
            basic_salary: salary_data.basic_salary,
            transport_allowance: salary_data.transport_allowance,
            meal_allowance: salary_data.meal_allowance,
            deduction: salary_data.deduction,
            total_salary: salary_data.total,
        };
    });

    if (salaryDataByYear.length === 0) {
        return res.status(404).json({ msg: `Year Data ${year} Not Found` });
    }
    res.json(salaryDataByYear)
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

// data yang ditampilkan ( Bulan / Tahun, Gaji Pokok, tj_transport, Uang Makan, Potongan, Total Gaji  )