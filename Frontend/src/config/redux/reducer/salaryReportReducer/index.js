import {
    FETCH_SALARY_REPORT_SUCCESS,
    FETCH_SALARY_REPORT_FAILURE,
    CLEAR_SALARY_REPORT,
} from "../../action/salaryReportAction";

const initialState = {
    salaryReportData: [],
    error: null,
};

const salaryReportReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALARY_REPORT_SUCCESS:
            return {
                ...state,
                salaryReportData: action.payload,
                error: null,
            };
        case FETCH_SALARY_REPORT_FAILURE:
            return {
                ...state,
                salaryReportData: [],
                error: action.payload,
            };
        case CLEAR_SALARY_REPORT:
            return {
                ...state,
                salaryReportData: [],
                error: null,
            };
        default:
            return state;
    }
};

export default salaryReportReducer;
