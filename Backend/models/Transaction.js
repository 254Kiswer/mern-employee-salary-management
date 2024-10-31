import EmployeeData from './EmployeeDataModel.js';
import JobTitleData from './JobTitleDataModel.js';
import AttendanceData from './DModel.js';

/* Method untuk mengambil Data Pegawai */

async function getEmployeeData() {
    try {
        const employeeData = await EmployeeData.findAll();
        const employeeDataMap = new Map();
        employeeData.forEach(employee => {
            const {nid, employeeName, job_title} = employee;
            employeeDataMap.set(employeeName, {nid, job_title});
        });

        const resultEmployeeData = [];
        employeeDataMap.forEach(({nid, job_title}, employeeName) => {
            resultEmployeeData.push({nid, employeeName, job_title});
        });

        const employeeName_data = resultEmployeeData.map(employee => employee.employeeName);
        const nid_data = resultEmployeeData.map(employee => employee.nid);
        const job_title_data = resultEmployeeData.map(employee => employee.job_title);

        return { employeeName_data, nid_data, job_title_data, };
    } catch (error) {
        console.log(error);
    }
}

/* Method untuk mengambil Data Kehadiran */

async function getAttendanceData() {
    try {
    const attendanceData = await AttendanceData.findAll();
    const attendanceDataMap = new Map();

    const { employeeName_data } = await getEmployeeData();
    const { nid_data } = await getEmployeeData();

    attendanceData.forEach(attendance => {
        const { nid, month, gender, job_title, present, sick, absent } = attendance;
        const employeeName = employeeName_data.find(name => name === attendance.employeeName) || "-";
        const employee_nid = nid_data.find(nid => nid === attendance.nid) || "-";
        attendanceDataMap.set(employee_nid, { employeeName, month, gender, job_title, present, sick, absent, sick, absent });
    });

    const resultAttendanceData = [];
    attendanceDataMap.forEach(({ nid, month, gender, job_title, present, sick, absent }, employeeNid) => {
        const employeeName = employeeName_data.find(name => name === attendanceDataMap.get(employeeNid).employeeName) || "-";
        resultAttendanceData.push({ employeeName, nid, month, gender, job_title, present, sick, absent });
    });

    console.log(resultAttendanceData);

    } catch (error) {
    console.log(error);
    }
}

getAttendanceData();



/* Method untuk mengambil Data Pegawai */

async function getAttendanceData() {
    const jobTitleData = await JobTitleData.findAll();
    const jobTitleDataMap = new Map();
    try {
        jobTitleData.forEach(jobTitle => {
            const {job_title, basic_salary, transport_allowance, meal_allowance} = jobTitle;
            jobTitleDataMap.set(job_title, {basic_salary, transport_allowance, meal_allowance});
        });

        const resultJobTitleData = [];
        jobTitleDataMap.forEach(({basic_salary, transport_allowance, meal_allowance}, job_title) => {
            resultJobTitleData.push({job_title, basic_salary, transport_allowance, meal_allowance});
        });

        return resultJobTitleData;
    } catch (error) {
        console.log(error);
    }
}