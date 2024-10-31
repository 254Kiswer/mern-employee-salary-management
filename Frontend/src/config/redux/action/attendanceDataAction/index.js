import axios from 'axios';
import {
    GET_ATTENDANCE_DATA_SUCCESS,
    GET_ATTENDANCE_DATA_FAILURE,
    CREATE_ATTENDANCE_DATA_SUCCESS,
    CREATE_ATTENDANCE_DATA_FAILURE,
    UPDATE_ATTENDANCE_DATA_SUCCESS,
    UPDATE_ATTENDANCE_DATA_FAILURE,
    DELETE_ATTENDANCE_DATA_SUCCESS,
    DELETE_ATTENDANCE_DATA_FAILURE
} from './attendanceDataActionTypes';

export const getAttendanceData = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:5000/attendanceData');
            const attendanceData = response.data;
            dispatch({
                type: GET_ATTENDANCE_DATA_SUCCESS,
                payload: attendanceData
            });
        } catch (error) {
            dispatch({
                type: GET_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const createAttendanceData = (employeeData, attendanceData, navigate) => async (dispatch) => {
    try {
        for (let i = 0; i < employeeData.length; i++) {
            const isNameAvailable = attendanceData.some(
                (attendance) => attendance.employeeName === employeeData[i].employeeName
            );

            if (!isNameAvailable) {
                const response = await axios.post("http://localhost:5000/attendanceData", {
                    ID: employeeName[i].id,
                    employeeName: employeeData[i].employeeName,
                    jobTitle: employeeData[i].jobTitle,
                    gender: employeeData[i].gender,
                    present: present[i] || 0,
                    sick: sick[i] || 0,
                    absent: absent[i] || 0,
                });

                dispatch({
                    type: CREATE_ATTENDANCE_DATA_SUCCESS,
                    payload: response.data,
                });

                navigate("/attendanceData");
                return response.data;
            }
        }
    } catch (error) {
        dispatch({
            type: CREATE_ATTENDANCE_DATA_FAILURE,
            payload: error.message,
        });
        throw error;
    }
};

export const updateAttendanceData = (id, attendanceData) => {
    return async (dispatch) => {
        try {
            const response = await axios.put(`http://localhost:5000/attendanceData/${id}`, attendanceData);
            if (response.status === 200) {
                dispatch({
                    type: UPDATE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Attendance data successfully updated'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: UPDATE_ATTENDANCE_DATA_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: UPDATE_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};

export const deleteAttendanceData = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.delete(`http://localhost:5000/attendanceData/${id}`);
            if (response.status === 200) {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_SUCCESS,
                    payload: 'Data successfully deleted'
                });
                dispatch(getAttendanceData());
            } else {
                dispatch({
                    type: DELETE_ATTENDANCE_DATA_FAILURE,
                    payload: response.data.message
                });
            }
        } catch (error) {
            dispatch({
                type: DELETE_ATTENDANCE_DATA_FAILURE,
                payload: error.message
            });
        }
    };
};
