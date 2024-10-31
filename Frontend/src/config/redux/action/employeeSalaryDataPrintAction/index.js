import axios from "axios";
import {
    GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
} from "./employeeSalaryDataPrintActionTypes";

export const viewSingleEmployeeSalarySuccess = (data) => ({
    type: GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    payload: data,
});

export const viewSingleEmployeeSalaryFailure = (error) => ({
    type: GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
    payload: error,
});

export const viewSingleEmployeeSalaryByYear = (dataYear) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salaryData/month/${dataYear}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalarySuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const viewSingleEmployeeSalaryByMonth = (dataMonth) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salaryData/month/${dataMonth}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalarySuccess(data));
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(viewSingleEmployeeSalaryFailure("An error occurred while loading data."));
        }
    }
};

export const viewSingleEmployeeSalaryByName = (employeeName) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/salaryData/name/${employeeName}`
        );
        const data = response.data;
        dispatch(viewSingleEmployeeSalarySuccess(data));
    } catch (error) {
        console.log(error);
        if (employeeName) {
            dispatch(viewSingleEmployeeSalaryFailure("An error occurred while loading data."));
        }
    }
};
