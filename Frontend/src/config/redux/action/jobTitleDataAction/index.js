import axios from 'axios';
import {
    GET_JOB_TITLE_DATA_SUCCESS,
    GET_JOB_TITLE_DATA_FAILURE,
    CREATE_JOB_TITLE_DATA_SUCCESS,
    CREATE_JOB_TITLE_DATA_FAILURE,
    UPDATE_JOB_TITLE_DATA_SUCCESS,
    UPDATE_JOB_TITLE_DATA_FAILURE,
    DELETE_JOB_TITLE_DATA_SUCCESS,
    DELETE_JOB_TITLE_DATA_FAILURE
} from './jobTitleDataActionTypes';

const API_URL = 'http://localhost:5000';

export const getJobTitleData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${API_URL}/jobTitleData`);
            dispatch({
                type: GET_JOB_TITLE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_JOB_TITLE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createJobTitleData = (formData, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URL}/jobTitleData`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            dispatch({
                type: CREATE_JOB_TITLE_DATA_SUCCESS,
                payload: response.data
            });
            navigate("/jobTitleData");
            return response.data;
        } catch (error) {
            dispatch({
                type: CREATE_JOB_TITLE_DATA_FAILURE,
                payload: error.message
            });
            throw error;
        }
    };
};

export const updateJobTitleData = (id, data) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`${API_URL}/jobTitleData/${id}`, data);
            dispatch({
                type: UPDATE_JOB_TITLE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: UPDATE_JOB_TITLE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteJobTitleData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`${API_URL}/jobTitleData/${id}`);
            dispatch({
                type: DELETE_JOB_TITLE_DATA_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: DELETE_JOB_TITLE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
