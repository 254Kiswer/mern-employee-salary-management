import axios from "axios";

export const FETCH_ABSENT_REPORT_SUCCESS = "FETCH_ABSENT_REPORT_SUCCESS";
export const FETCH_ABSENT_REPORT_FAILURE = "FETCH_ABSENT_REPORT_FAILURE";
export const CLEAR_ABSENT_REPORT = "CLEAR_ABSENT_REPORT";

export const fetchAbsentReportSuccess = (data) => ({
    type: FETCH_ABSENT_REPORT_SUCCESS,
    payload: data,
});

export const fetchAbsentReportFailure = (error) => ({
    type: FETCH_ABSENT_REPORT_FAILURE,
    payload: error,
});

export const clearAbsentReport = () => ({
    type: CLEAR_ABSENT_REPORT,
});

export const fetchAbsentReportByYear = (selectedYear, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/absent/report/year/${selectedYear}`
        );
        const data = response.data;
        dispatch(fetchAbsentReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchAbsentReportFailure("An error occurred while loading data."));
        }
    }
};

export const fetchAbsentReportByMonth = (selectedMonth, onDataFound) => async (dispatch) => {
    try {
        const response = await axios.get(
            `http://localhost:5000/Absent/Report/month/${selectedMonth}`
        );
        const data = response.data;
        dispatch(fetchAbsentReportSuccess(data));
        onDataFound();
    } catch (error) {
        if (error.response && error.response.data) {
            dispatch(fetchAbsentReportFailure("An error occurred while loading data."));
        }
    }
};
