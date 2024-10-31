import {
    GET_ATTENDANCE_DATA_SUCCESS,
    GET_ATTENDANCE_DATA_FAILURE,
    CREATE_ATTENDANCE_DATA_SUCCESS,
    CREATE_ATTENDANCE_DATA_FAILURE,
    UPDATE_ATTENDANCE_DATA_SUCCESS,
    UPDATE_ATTENDANCE_DATA_FAILURE,
    DELETE_ATTENDANCE_DATA_SUCCESS,
    DELETE_ATTENDANCE_DATA_FAILURE
} from '../../action/attendanceDataAction/attendanceDataActionTypes';

const initialState = {
    attendanceData: [],
    loading: true,
    error: null,
    message: ''
};

const attendanceDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ATTENDANCE_DATA_SUCCESS:
            return {
                ...state,
                attendanceData: action.payload,
                loading: false,
                error: null
            };
        case GET_ATTENDANCE_DATA_FAILURE:
            return {
                ...state,
                attendanceData: [],
                loading: false,
                error: action.payload
            };
        case CREATE_ATTENDANCE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case CREATE_ATTENDANCE_DATA_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case UPDATE_ATTENDANCE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case UPDATE_ATTENDANCE_DATA_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        case DELETE_ATTENDANCE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                loading: false,
                error: null
            };
        case DELETE_ATTENDANCE_DATA_FAILURE:
            return {
                ...state,
                message: '',
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
};

export default attendanceDataReducer;
