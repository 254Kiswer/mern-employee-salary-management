import axios from 'axios';
import {
    GET_DEDUCTION_DATA_SUCCESS,
    GET_DEDUCTION_DATA_FAILURE,
    CREATE_DEDUCTION_DATA_SUCCESS,
    CREATE_DEDUCTION_DATA_FAILURE,
    UPDATE_DEDUCTION_DATA_SUCCESS,
    UPDATE_DEDUCTION_DATA_FAILURE,
    DELETE_DEDUCTION_DATA_SUCCESS,
    DELETE_DEDUCTION_DATA_FAILURE
} from './deductionDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getDeductionData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/DeductionData`);
            dispatch({
                type: GET_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createDeductionData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/deductionData`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
            navigate("/deductionData");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateDeductionData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/deductionData/${id}`, data);
            dispatch({
                type: UPDATE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteDeductionData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/deductionData/${id}`);
            dispatch({
                type: DELETE_DEDUCTION_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_DEDUCTION_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
