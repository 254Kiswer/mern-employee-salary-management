import {
    getEmployeeSalaryData,
    getAttendanceData,
    viewEmployeeSalaryDataByYear
} from "./TransactionController.js"

// method untuk melihat laporan gaji pegawai
export const viewEmployeeSalaryReport = async(req, res) => {
    try {
        const EmployeeSalaryReport = await getEmployeeSalaryData(req, res);
        res.status(200).json(EmployeeSalaryReport);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat laporan gaji pegawai berdasarkan bulan
export const viewEmployeeSalaryReportByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const salaryReportDataByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = salaryReportDataByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    employeeName: data.employeeName,
                    jobTitle: data.employee_jobTitle,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_salary: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





// method untuk melihat laporan gaji pegawai berdasarkan tahun
export const viewEmployeeSalaryReportByYear = async (req, res) => {
    try {
         await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


// method untuk melihat laporan gaji pegawai berdasarkan nama
export const viewEmployeeSalaryReportByName = async (req, res) => {
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

// method untuk melihat laporan absensi pegawai berdasarkan bulan (menggunakan DROP DOWN)
export const viewEmployeeAbsentReportByMonth = async (req, res) => {
    try {
        const absentDataByMonth = await getAttendanceData();
        const { month } = req.params;

        const absentData = absentDataByMonth.filter((absent) => absent.month.toLowerCase() === month.toLowerCase()).map((absent) => {
            return {
                year: absent.year,
                month: absent.month,
                nid: absent.nid,
                employeeName: absent.employeeName,
                employee_jobTitle: absent.employee_jobTitle,
                present: absent.present,
                sick: absent.sick,
                absent: absent.absent
            };
        });

        if (absentData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(absentData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};


// method untuk melihat laporan absensi pegawai berdasarkan tahun
export const viewEmployeeAbsentReportByYear = async (req, res) => {
    try {
        const absentDataByYear = await getAttendanceData();
        const { year } = req.params;

        const absentData = absentDataByYear.filter((absent) => absent.year.toString() === year.toString()).map((absent) => {
            return {
                year: absent.year,
                month: absent.month,
                nid: absent.nid,
                employeeName: absent.employeeName,
                employee_jobTitle: absent.employee_jobTitle,
                present: absent.present,
                sick: absent.sick,
                absent: absent.absent
            };
        });

        if (absentData.length === 0) {
            res.status(404).json({ msg: 'Data not found' });
        } else {
            res.json(absentData);
        }
    } catch (error) {
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// method untuk melihat Slip Gaji Pegawai By Name
export const viewSalarySlipByName = async (req, res) => {
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
}

// method untuk melihat Slip Gaji Pegawai By Month
export const viewSalarySlipByMonth = async (req, res) => {
    try {
        const { month } = req.params;
        const salaryReportDataByMonth = await getEmployeeSalaryData(req, res);

        const filteredData = salaryReportDataByMonth.filter((data) => {
            return data.month.toLowerCase() === month.toLowerCase();
        });

        if (filteredData.length === 0) {
            res.status(404).json({ msg: `Data with month ${month} Not found ` });
        } else {
            const formattedData = filteredData.map((data) => {
                return {
                    month: data.month,
                    year: data.year,
                    employeeName: data.employeeName,
                    job_title: data.job_title,
                    basic_salary: data.basic_salary,
                    transport_allowance: data.transport_allowance,
                    meal_allowance: data.meal_allowance,
                    deduction: data.deduction,
                    total_amount: data.total
                };
            });
            res.json(formattedData);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// method untuk melihat Slip Gaji Pegawai By Year
export const viewSalarySlipByYear = async (req, res) => {
    try {
        await viewEmployeeSalaryDataByYear(req, res);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}