import {
    FETCH_ABSENT_REPORT_SUCCESS,
    FETCH_ABSENT_REPORT_FAILURE,
    CLEAR_ABSENT_REPORT,
} from "../../action/absentReportAction";

const initialState = {
    absentReportData: [],
    error: null,
};

const absentReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ABSENT_REPORT_SUCCESS:
            return {
                ...state,
                absentReportData: action.payload,
                error: null,
            };
        case FETCH_ABSENT_REPORT_FAILURE:
            return {
                ...state,
                absentReportData: [],
                error: action.payload,
            };
        case CLEAR_ABSENT_REPORT:
            return {
                ...state,
                absentReportData: [],
                error: null,
            };
        default:
            return state;
    }
};

export default absentReportReducer;
