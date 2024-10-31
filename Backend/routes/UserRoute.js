import express from 'express';

/* === import Middleware === */
import { adminOnly, verifyUser } from '../middleware/AuthUser.js';

/* === import Controllers === */
import {
    getEmployeeData,
    getEmployeeDataByID,
    createEmployeeData,
    updateEmployeeData,
    deleteEmployeeData,
    getEmployeeDataByNid,
    getEmployeeDataByName,
} from '../controllers/EmployeeData.js';

import {
    getJobTitleData,
    createJobTitleData,
    updateJobTitleData,
    deleteJobTitleData,
    getJobTitleDataByID
} from "../controllers/JobTitleData.js";

import {
    viewAttendanceData,
    createAttendanceData,
    updateAttendanceData,
    deleteAttendanceData,
    viewAttendanceDataByID,
    viewSalaryDataByName,
} from "../controllers/TransactionController.js";

import {
    createSalaryDeductionData,
    deleteDeductionData,
    viewDeductionDataByID,
    updateDeductionData,
    viewDeductionData
} from "../controllers/TransactionController.js";

import {
    viewEmployeeSalaryData,
    viewEmployeeSalaryDataByMonth,
    viewEmployeeSalaryDataByYear
} from "../controllers/TransactionController.js";

import {
    viewEmployeeAbsentReportByMonth,
    viewEmployeeAbsentReportByYear,
    viewEmployeeSalaryReport,
    viewEmployeeSalaryReportByMonth,
    viewEmployeeSalaryReportByName,
    viewEmployeeSalaryReportByYear,
    viewSalarySlipByMonth,
    viewSalarySlipByName,
    viewSalarySlipByYear,
} from "../controllers/ReportController.js";

import {Me, LogOut, changePassword } from '../controllers/Auth.js';
import {
    employeeDashboard,
    viewSingleEmployeeSalaryDataByMonth,
    viewSingleEmployeeSalaryDataByYear
} from '../controllers/Employee.js';

const router = express.Router();

// Admin Route :

/* ==== Master Data ==== */
// Employee Data
router.get('/employee_data', verifyUser, adminOnly, getEmployeeData);
router.get('/employee_data/id/:id', verifyUser, adminOnly, getEmployeeDataByID);
router.get('/employee_data/nid/:nid', verifyUser, adminOnly, getEmployeeDataByNid);
router.get('/employee_data/name/:name', verifyUser, getEmployeeDataByName);
router.post('/employee_data',verifyUser, adminOnly, createEmployeeData);
router.patch('/employee_data/:id', verifyUser, adminOnly, updateEmployeeData);
router.delete('/employee_data/:id', verifyUser, adminOnly, deleteEmployeeData);
router.patch('/employee_data/:id/change_password', verifyUser, adminOnly, changePassword);
// JobTitle Data
router.get('/jobTitle_data', verifyUser, adminOnly, getJobTitleData);
router.get('/jobTitle_data/:id', verifyUser, adminOnly, getJobTitleDataByID);
router.post('/jobTitle_data', verifyUser, adminOnly, createJobTitleData);
router.patch('/jobTitle_data/:id', verifyUser, adminOnly, updateJobTitleData);
router.delete('/jobTitle_data/:id', verifyUser, adminOnly, deleteJobTitleData);

/* ==== Transaction  ==== */
// Attendance Data
router.get('/attendance_data', verifyUser, adminOnly, viewAttendanceData);
router.get('/attendance_data/:id', verifyUser, adminOnly, viewAttendanceDataByID);
router.post('/attendance_data',verifyUser, adminOnly, createAttendanceData);
router.patch('/attendance_data/update/:id',verifyUser, adminOnly, updateAttendanceData);
router.delete('/attendance_data/:id', verifyUser, adminOnly, deleteAttendanceData);
// Data Potongan
router.get('/deduction_data', adminOnly, verifyUser, viewDeductionData);
router.get('/deduction_data/:id', adminOnly, verifyUser, viewDeductionDataByID);
router.post('/deduction_data', adminOnly, verifyUser, createSalaryDeductionData);
router.patch('/deduction_data/update/:id', adminOnly, verifyUser, updateDeductionData);
router.delete('/deduction_data/:id', adminOnly, verifyUser, deleteDeductionData);
// Data salary
router.get('/employee_salary_data', viewEmployeeSalaryData);
router.get('/salary_data/name/:name', verifyUser, viewSalaryDataByName);
router.get('/employee_salary_data/month/:month', viewEmployeeSalaryDataByMonth);
router.get('/employee_salary_data/year/:year', viewEmployeeSalaryDataByYear);

/* ====  report  ==== */
// employee salary report
router.get('/report/salary',verifyUser, adminOnly, viewEmployeeSalaryReport);
router.get('/report/salary/name/:name',verifyUser, adminOnly, viewEmployeeSalaryReportByName);
router.get('/report/salary/month/:month', verifyUser, adminOnly,viewEmployeeSalaryReportByMonth);
router.get('/report/salary/year/:year', verifyUser, adminOnly,viewEmployeeSalaryReportByYear);
// Employee Absent Report
router.get('/report/absent/month/:month', verifyUser, adminOnly,viewEmployeeAbsentReportByMonth);
router.get('/report/absent/year/:year', verifyUser, adminOnly,viewEmployeeAbsentReportByYear);
// Slip salary Pegawai
router.get('/report/salary_slip/name/:name', verifyUser, adminOnly,viewSalarySlipByName);
router.get('/report/salary_slip/month/:month',verifyUser, adminOnly, viewSalarySlipByMonth);
router.get('/report/salary_slip/year/:year',verifyUser, adminOnly, viewSalarySlipByYear);

/* ==== Change Password ==== */
router.patch('/change_password', verifyUser, changePassword);

// Route for getting user info
router.get('/me', Me);

/* ==== Logout ==== */
router.delete('/logout', LogOut);

// Employee Route :
/* ==== Dashboard ==== */
router.get('/dashboard', verifyUser, employeeDashboard);
/* ==== Data salary ==== */
router.get('/salary_data/month/:month', verifyUser, viewSingleEmployeeSalaryDataByMonth);
router.get('/salary_data/year/:year', verifyUser, viewSingleEmployeeSalaryDataByYear);
/* ==== change Password ==== */
router.patch('/change_password', verifyUser, changePassword);
/* ==== Logout ==== */
router.delete('/logout', LogOut);


export default router;