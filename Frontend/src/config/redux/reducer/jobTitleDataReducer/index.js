import {
    GET_JOB_TITLE_DATA_SUCCESS,
    GET_JOB_TITLE_DATA_FAILURE,
    CREATE_JOB_TITLE_DATA_SUCCESS,
    CREATE_JOB_TITLE_DATA_FAILURE,
    UPDATE_JOB_TITLE_DATA_SUCCESS,
    UPDATE_JOB_TITLE_DATA_FAILURE,
    DELETE_JOB_TITLE_DATA_SUCCESS,
    DELETE_JOB_TITLE_DATA_FAILURE
} from '../../action/jobTitleDataAction/jobTitleDataActionTypes';

const initialState = {
    jobTitleData: [],
    message: null,
    error: null
};

const jobTitleDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_JOB_TITLE_DATA_SUCCESS:
            return {
                ...state,
                jobTitleData: action.payload,
                message: null,
                error: null,
            };
        case GET_JOB_TITLE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: '',
            };
        case CREATE_JOB_TITLE_DATA_SUCCESS:
            return {
                ...state,
                message: null,
                error: null,
            };
        case CREATE_JOB_TITLE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload.message,
                message: null,
            };
        case UPDATE_JOB_TITLE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case UPDATE_JOB_TITLE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        case DELETE_JOB_TITLE_DATA_SUCCESS:
            return {
                ...state,
                message: action.payload,
                error: null,
            };
        case DELETE_JOB_TITLE_DATA_FAILURE:
            return {
                ...state,
                error: action.payload,
                message: null,
            };
        default:
            return state;
    }
};

export default jobTitleDataReducer;
