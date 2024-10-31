import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import employeeSalaryDataPrintReducer from './reducer/employeeSalaryDataPrintReducer';
import employeeDataReducer from './reducer/employeeDataReducer';
import jobTitleDataReducer from './reducer/jobTitleDataReducer';
import attendanceDataReucer from './reducer/attendanceDataReducer';
import deductionDataReducer from './reducer/deductionDataReducer';
import salaryDataReducer from './reducer/salaryDataReducer';
import absentReportReducer from './reducer/absentReportReducer';
import salaryReportReducer from './reducer/salaryReportReducer';
import salarySlipReducer from './reducer/salarySlipReducer';
import changePasswordReducer from './reducer/changePasswordReducer';

const store = configureStore({
    reducer: {
        auth: authReducer,
        employeeSalaryDataPrint: employeeSalaryDataPrintReducer,
        employeeData: employeeDataReducer,
        jobTitleData: jobTitleDataReducer,
        attendanceData: attendanceDataReucer,
        deductionData: deductionDataReducer,
        salaryData: salaryDataReducer,
        absentReport: absentReportReducer,
        salaryReport: salaryReportReducer,
        salarySlip: salarySlipReducer,
        changePassword: changePasswordReducer,
    },
});

export default store;
