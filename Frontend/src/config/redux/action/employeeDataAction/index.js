import axios from 'axios';
import {
    GET_EMPLOYEE_DATA_SUCCESS,
    GET_EMPLOYEE_DATA_FAILURE,
    EMPLOYEE_IMAGE_SUCCESS,
    EMPLOYEE_IMAGE_FAILURE,
    GET_EMPLOYEE_DATA_BY_ID_SUCCESS,
    GET_EMPLOYEE_DATA_BY_ID_FAILURE,
    GET_EMPLOYEE_DATA_BY_NAME_SUCCESS,
    GET_EMPLOYEE_DATA_BY_NAME_FAILURE,
    CREATE_EMPLOYEE_DATA_REQUEST,
    CREATE_EMPLOYEE_DATA_SUCCESS,
    CREATE_EMPLOYEE_DATA_FAILURE,
    UPDATE_EMPLOYEE_DATA_SUCCESS,
    UPDATE_EMPLOYEE_DATA_FAILURE,
    DELETE_EMPLOYEE_DATA_SUCCESS,
    DELETE_EMPLOYEE_DATA_FAILURE
} from './employeeDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getEmployeeData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employeeData`);
            dispatch({
                type: GET_EMPLOYEE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_EMPLOYEE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const EmployeeImage = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/images`);
            dispatch({
                type: EMPLOYEE_IMAGE_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: EMPLOYEE_IMAGE_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataById = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employeeData/id/${id}`);
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_ID_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataByID = (ID) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employeeData/ID/${ID}`);
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_ID_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_ID_FAILURE,
                payload: error.message
            });
        }
    };
};

export const getEmployeeDataByName = (employeeName) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/employeeData/name/${nama_pegawai}`);
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_NAME_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_EMPLOYEE_DATA_BY_NAME_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createEmployeeData = (formData, navigate) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_EMPLOYEE_DATA_REQUEST });

        try {
            const response = await axios.post(`${API_URL}/employeeData`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_EMPLOYEE_DATA_SUCCESS,
                payload: response.data
            });
            navigate("/employeeData");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_EMPLOYEE_DATA_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateEmployeeData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/employeeData/${id}`, data);
            dispatch({
                type: UPDATE_EMPLOYEE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_EMPLOYEE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteEmployeeData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/employeeData/${id}`);
            dispatch({
                type: DELETE_EMPLOYEE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_EMPLOYEE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
