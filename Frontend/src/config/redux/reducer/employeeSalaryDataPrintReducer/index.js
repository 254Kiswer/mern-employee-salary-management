import {
    GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS,
    GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE,
} from "../../action/employeeSalaryDataPrintAction/employeeSalaryDataPrintActionTypes";

const initialState = {
    singleEmployeeSalaryDataPrint: [], 
    error: null,
  };
  

const employeeSalaryDataPrintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_EMPLOYEE_SALARY_DATA_SUCCESS:
            return {
                ...state,
                employeeSalaryDataPrint: action.payload,
                error: null,
            };
        case GET_SINGLE_EMPLOYEE_SALARY_DATA_FAILURE:
            return {
                ...state,
                employeeSalaryDataPrint: null,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default employeeSalaryDataPrintReducer;
