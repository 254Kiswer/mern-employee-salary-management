import axios from "axios";

export const FETCH_SALARY_REPORT_SUCCESS = "FETCH_SALARY_REPORT_SUCCESS";
export const FETCH_SALARY_REPORT_FAILURE = "FETCH_SALARY_REPORT_FAILURE";
export const CLEAR_SALARY_REPORT = "CLEAR_SALARY_REPORT";

export const fetchSalaryReportSuccess = (data) => ({
    type: FETCH_SALARY_REPORT_SUCCESS,
    payload: data,
});

export const fetchSalaryReportFailure = (error) => ({
    type: FETCH_SALARY_REPORT_FAILURE,
    payload: error,
});

export const clearSalaryReport = () => ({
    type: CLEAR_SALARY_REPORT,
});

export const fetchSalaryReportByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchSalaryReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalaryReportFailure("An error occurred while loading data."));
        }
    }
};

export const fetchSalaryReportByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/report/salary/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchSalaryReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchSalaryReportFailure("An error occurred while loading data."));
        }
    }
};
