import {
    FETCH_SALARY_SLIP_SUCCESS,
    FETCH_SALARY_SLIP_FAILURE,
    CLEAR_SALARY_SLIP,
} from "../../action/salarySlipAction";

const initialState = {
    salarySlipData: [],
    error: null,
};

const salarySlipReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SALARY_SLIP_SUCCESS:
            return {
                ...state,
                salarySlipData: action.payload,
                error: null,
            };
        case FETCH_SALARY_SLIP_FAILURE:
            return {
                ...state,
                salarySlipData: [],
                error: action.payload,
            };
        case CLEAR_SALARY_SLIP:
            return {
                ...state,
                salarySlipData: [],
                error: null,
            };
        default:
            return state;
    }
};

export default salarySlipReducer;
