import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../components/molecules/NotFound'
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Login from '../../pages/Login';
import Dashboard from '../../pages/Dashboard';
import {
  FormAddJobTitleData,
  FormEditJobTitleData,
  FormAddAttendanceData,
  FormEditAttendanceData,
  FormAddEmployeeData,
  FormEditEmployeeData,
  FormAddDeductionData,
  FormEditDeductionData,
  PrintPdfSalarySlipReport,
  DetailSalaryData,
  PrintPdfSalarySlip,
  PrintPdfAbsentReport,
  PrintPdfEmployeeSalaryData,
  
} from '../../components';
import {
  EmployeeData,
  JobTitleData,
  AttendanceData,
  SalaryData,
  SalaryReport,
  AbsentReport,
  SalarySlip,
  ChangePasswordAdmin,
  EmployeeSalaryData,
  ChangePasswordEmployee,
  DeductionData
} from '../../pages'

const AppRoutes = () => {
  return (

    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />

      {/* Route Admin */}
      {/* Master Data Admin */}
      <Route
        path='/employeeData'
        element={<EmployeeData />}
      />
      <Route
        path='/employeeData/form-employee-data/add'
        element={<FormAddEmployeeData />}
      />
      <Route
        path='/employeeData/form-employee-data/edit/:id'
        element={<FormEditEmployeeData />}
      />
      <Route
        path='/jobTitleData'
        element={<JobTitleData />}
      />
      <Route
        path='/jobTitleData/form-job-title-data/add'
        element={<FormAddJobTitleData />}
      />
      <Route
        path='/jobTitleData/form-job-title-data/edit/:id'
        element={<FormEditJobTitleData />}
      />

      {/* Transaksi Admin */}
      <Route
        path='/attendanceData'
        element={<AttendanceData />}
      />
      <Route
        path='/attendanceData/form-attendance-data/add'
        element={<FormAddAttendanceData />}
      />
      <Route
        path='/attendanceData/form-attendance-data/edit/:id'
        element={<FormEditAttendanceData />}
      />
      <Route
        path='/deductionData'
        element={<DeductionData />}
      />
      <Route
        path='/deductionData/form-deduction-data/add'
        element={<FormAddDeductionData />} />
      <Route
        path='/deductionData/form-deduction-data/edit/:id'
        element={<FormEditDeductionData />} />
      <Route
        path='/salaryData'
        element={<SalaryData />}
      />
      <Route
        path='/salaryData/detail-salary-data/name/:name'
        element={<DetailSalaryData />}
      />
      <Route
        path='/salaryData/print-salary/salary-slip/name/:name'
        element={<PrintPdfSalarySlip />}
      />

      {/*  Admin Report */}
      <Route
        path='/report/salary'
        element={<SalaryReport />}
      />
      <Route
        path='/report/salary/print-page'
        element={<PrintPdfSalarySlipReport />}
      />
      <Route
        path='/report/absent'
        element={<AbsentReport />}
      />
      <Route
        path='/report/absent/print-page'
        element={<PrintPdfAbsentReport />}
      />
      <Route
        path='/report/salary-slip'
        element={<SalarySlip />}
      />
      <Route
        path='/report/salary-slip/print-page'
        element={<PrintPdfSalarySlip />}
      />

      {/* Admin Settings */}
      <Route
        path='/change-password'
        element={<changePasswordAdmin />}
      />

      {/* employee Route  */}
      {/* Dashboard Employee Salary Data */}
      <Route
        path='/employee-salary-data'
        element={<EmployeeSalaryData />}
      />
      <Route
        path='/employee-salary-data/print-page'
        element={<PrintPdfEmployeeSalaryData />}
      />
      <Route
        path='/change-password-employee'
        element={<changePasswordEmployee />}
      />

      {/* Route Not Found 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  )
}

export default AppRoutes;
