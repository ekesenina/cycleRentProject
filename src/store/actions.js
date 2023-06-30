import {
    CREATE_CASE_FAILURE,
    CREATE_CASE_PUBLIC_FAILURE,
    CREATE_CASE_PUBLIC_REQUEST,
    CREATE_CASE_PUBLIC_SUCCESS,
    CREATE_CASE_REQUEST,
    CREATE_CASE_SUCCESS,
    CREATE_OFFICER_FAILURE,
    CREATE_OFFICER_REQUEST,
    CREATE_OFFICER_SUCCESS,
    DELETE_CASE_FAILURE,
    DELETE_CASE_REQUEST,
    DELETE_CASE_SUCCESS,
    DELETE_OFFICER_FAILURE,
    DELETE_OFFICER_REQUEST,
    DELETE_OFFICER_SUCCESS,
    EDIT_CASE_FAILURE,
    EDIT_CASE_REQUEST,
    EDIT_CASE_SUCCESS,
    EDIT_OFFICER_FAILURE,
    EDIT_OFFICER_REQUEST,
    EDIT_OFFICER_SUCCESS,
    FETCH_CASES_FAILURE,
    FETCH_CASES_REQUEST,
    FETCH_CASES_SUCCESS,
    FETCH_OFFICERS_FAILURE,
    FETCH_OFFICERS_REQUEST,
    FETCH_OFFICERS_SUCCESS,
    GET_ONE_CASE_FAILURE,
    GET_ONE_CASE_REQUEST,
    GET_ONE_CASE_SUCCESS,
    GET_ONE_OFFICER_FAILURE,
    GET_ONE_OFFICER_REQUEST,
    GET_ONE_OFFICER_SUCCESS,
    LOG_OUT_SUCCESS,
    ON_CLICK_MESSAGE_BUTTON,
    ON_CLICK_MODAL_BUTTON,
    REMEMBER_PATH,
    SIGN_IN_FAILURE,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
  } from "./type";
  
  export const fetchCasesRequest = () => {
    return {
      type: FETCH_CASES_REQUEST,
    };
  };
  
  export const fetchCasesSuccess = (data) => {
    return {
      type: FETCH_CASES_SUCCESS,
      payload: data,
    };
  };
  
  export const fetchCasesFailure = (error) => {
    return {
      type: FETCH_CASES_FAILURE,
      payload: error,
    };
  };
  
  export const createCaseRequest = () => {
    return {
      type: CREATE_CASE_REQUEST,
    };
  };
  
  export const createCaseSuccess = (data) => {
    return {
      type: CREATE_CASE_SUCCESS,
      payload: data,
    };
  };
  
  export const createCaseFailure = (error) => {
    return {
      type: CREATE_CASE_FAILURE,
      payload: error,
    };
  };
  
  export const createCasePublicRequest = () => {
    return {
      type: CREATE_CASE_PUBLIC_REQUEST,
    };
  };
  
  export const createCasePublicSuccess = (data) => {
    return {
      type: CREATE_CASE_PUBLIC_SUCCESS,
      payload: data,
    };
  };
  
  export const createCasePublicFailure = (error) => {
    return {
      type: CREATE_CASE_PUBLIC_FAILURE,
      payload: error,
    };
  };
  
  export const editCaseRequest = () => {
    return {
      type: EDIT_CASE_REQUEST,
    };
  };
  
  export const editCaseSuccess = (id, data) => {
    return {
      type: EDIT_CASE_SUCCESS,
      payload: {
        id: id,
        status: data.status,
        licenseNumber: data.licenseNumber,
        ownerFullName: data.ownerFullName,
        type: data.type,
        color: data.color === "" ? null : data.color,
        officer: data.officer === "" ? null : data.officer,
        description: data.description === "" ? null : data.description,
        resolution: data.resolution === "" ? null : data.resolution,
      },
    };
  };
  
  export const editCaseFailure = (error) => {
    return {
      type: EDIT_CASE_FAILURE,
      payload: error,
    };
  };
  
  export const deleteCaseRequest = () => {
    return {
      type: DELETE_CASE_REQUEST,
    };
  };
  
  export const deleteCaseSuccess = (id) => {
    return {
      type: DELETE_CASE_SUCCESS,
      payload: id,
    };
  };
  
  export const deleteCaseFailure = (error) => {
    return {
      type: DELETE_CASE_FAILURE,
      payload: error,
    };
  };
  
  export const getOneCaseRequest = () => {
    return {
      type: GET_ONE_CASE_REQUEST,
    };
  };
  
  export const getOneCaseSuccess = (data) => {
    return {
      type: GET_ONE_CASE_SUCCESS,
      payload: data,
    };
  };
  
  export const getOneCaseFailure = (error) => {
    return {
      type: GET_ONE_CASE_FAILURE,
      payload: error,
    };
  };
  
  export const fetchOfficersRequest = () => {
    return {
      type: FETCH_OFFICERS_REQUEST,
    };
  };
  
  export const fetchOfficersSuccess = (data) => {
    return {
      type: FETCH_OFFICERS_SUCCESS,
      payload: data,
    };
  };
  
  export const fetchOfficersFailure = (error) => {
    return {
      type: FETCH_OFFICERS_FAILURE,
      payload: error,
    };
  };
  
  export const deleteOfficerRequest = () => {
    return {
      type: DELETE_OFFICER_REQUEST,
    };
  };
  
  export const deleteOfficerSuccess = (id) => {
    return {
      type: DELETE_OFFICER_SUCCESS,
      payload: id,
    };
  };
  
  export const deleteOfficerFailure = (error) => {
    return {
      type: DELETE_OFFICER_FAILURE,
      payload: error,
    };
  };
  
  export const getOneOfficerRequest = () => {
    return {
      type: GET_ONE_OFFICER_REQUEST,
    };
  };
  
  export const getOneOfficerSuccess = (data) => {
    return {
      type: GET_ONE_OFFICER_SUCCESS,
      payload: data,
    };
  };
  
  export const getOneOfficerFailure = (error) => {
    return {
      type: GET_ONE_OFFICER_FAILURE,
      payload: error,
    };
  };
  
  export const editOfficerRequest = () => {
    return {
      type: EDIT_OFFICER_REQUEST,
    };
  };
  
  export const editOfficerSuccess = (id, data) => {
    return {
      type: EDIT_OFFICER_SUCCESS,
      payload: {
        id: id,
        firstName: data.firstName === "" ? null : data.firstName,
        lastName: data.lastName === "" ? null : data.lastName,
        password:
          data.passwordConfirmation === ""
            ? data.oldPassword
            : data.passwordConfirmation,
        approved: data.approved,
      },
    };
  };
  
  export const editOfficerFailure = (error) => {
    return {
      type: EDIT_OFFICER_FAILURE,
      payload: error,
    };
  };
  
  export const createOfficerRequest = () => {
    return {
      type: CREATE_OFFICER_REQUEST,
    };
  };
  
  export const createOfficerSuccess = (data) => {
    return {
      type: CREATE_OFFICER_SUCCESS,
      payload: data,
    };
  };
  
  export const createOfficerFailure = (error) => {
    return {
      type: CREATE_OFFICER_FAILURE,
      payload: error,
    };
  };

  export const rememberPath = (prePath) => {
    return {
      type: REMEMBER_PATH,
      prePath
    }
  }

  export const signUpRequest = () => {
    return {
      type: SIGN_UP_REQUEST,
    };
  };
  
  export const signUpSuccess = () => {
    return {
      type: SIGN_UP_SUCCESS,
    };
  };
  
  export const signUpFailure = (error) => {
    return {
      type: SIGN_UP_FAILURE,
      payload: error,
    };
  };
  
  export const signInRequest = () => {
    return {
      type: SIGN_IN_REQUEST,
    };
  };
  
  export const signInSuccess = (data) => {
    return {
      type: SIGN_IN_SUCCESS,
      payload: data,
    };
  };
  
  export const signInFailure = (error) => {
    return {
      type: SIGN_IN_FAILURE,
      payload: error,
    };
  };
  
  export const logOutSuccess = () => {
    return {
      type: LOG_OUT_SUCCESS,
    };
  };
  
  export const onClickMessageButton = () => {
    return {
      type: ON_CLICK_MESSAGE_BUTTON,
    };
  };
  
  export const onClickModalButton = () => {
    return {
      type: ON_CLICK_MODAL_BUTTON,
    };
  };