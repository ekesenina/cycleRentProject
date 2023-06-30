import axios from "axios";
import {
  CREATE_OFFICER_FAILURE,
  CREATE_OFFICER_REQUEST,
  CREATE_OFFICER_SUCCESS,
  DELETE_OFFICER_FAILURE,
  DELETE_OFFICER_REQUEST,
  DELETE_OFFICER_SUCCESS,
  EDIT_OFFICER_FAILURE,
  EDIT_OFFICER_REQUEST,
  EDIT_OFFICER_SUCCESS,
  FETCH_OFFICERS_FAILURE,
  FETCH_OFFICERS_REQUEST,
  FETCH_OFFICERS_SUCCESS,
  GET_ONE_OFFICER_FAILURE,
  GET_ONE_OFFICER_REQUEST,
  GET_ONE_OFFICER_SUCCESS,
  ON_CLICK_MESSAGE_BUTTON,
  ON_CLICK_MODAL_BUTTON,
} from "../type";
import {
  createOfficerFailure,
  createOfficerRequest,
  createOfficerSuccess,
  deleteOfficerFailure,
  deleteOfficerRequest,
  deleteOfficerSuccess,
  editOfficerFailure,
  editOfficerRequest,
  editOfficerSuccess,
  fetchOfficersFailure,
  fetchOfficersRequest,
  fetchOfficersSuccess,
  getOneOfficerFailure,
  getOneOfficerRequest,
  getOneOfficerSuccess,
  onClickMessageButton,
  onClickModalButton,
} from "../actions";
import authHeader from "../../helper";

const initialState = {
  officer: {},
  officers: [],
  officerIsCreated: false,
  isLoading: false,
  message: "",
};

export const officersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFICERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case FETCH_OFFICERS_SUCCESS:
      return {
        ...state,
        officers: action.payload,
        isLoading: false,
        message: "",
      };

    case FETCH_OFFICERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case EDIT_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case EDIT_OFFICER_SUCCESS:
      return {
        ...state,
        officers: [
          ...state.officers,
          {
            ...state.officers.find((item) => item._id !== action.payload.id),
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            password: action.payload.password,
            approved: action.payload.approved,
          },
        ],
        isLoading: false,
        message: "",
      };

    case EDIT_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case DELETE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case DELETE_OFFICER_SUCCESS:
      return {
        ...state,
        officers: state.officers.filter((item) => item._id !== action.payload),
        isLoading: false,
        message: "",
      };

    case DELETE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case GET_ONE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case GET_ONE_OFFICER_SUCCESS:
      return {
        ...state,
        officer: action.payload,
        isLoading: false,
        message: "",
      };

    case GET_ONE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case CREATE_OFFICER_REQUEST:
      return {
        ...state,
        isLoading: true,
        officerIsCreated: false,
        message: "",
      };

    case CREATE_OFFICER_SUCCESS:
      return {
        ...state,
        officers: [...state.officers, action.payload],
        isLoading: false,
        officerIsCreated: true,
        message: "",
      };

    case CREATE_OFFICER_FAILURE:
      return {
        ...state,
        isLoading: false,
        officerIsCreated: false,
        message: action.payload.response.data.message,
      };

    case ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,

        message: "",
      };

    case ON_CLICK_MODAL_BUTTON:
      return {
        ...state,
        officerIsCreated: false,
      };

    default:
      return state;
  }
};

export const getAllOfficers = () => {
  return function (dispatch) {
    dispatch(fetchOfficersRequest());
    axios
      .get("officers/", {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(fetchOfficersSuccess(response.data.officers));
      })
      .catch((response) => dispatch(fetchOfficersFailure(response)));
  };
};

export const deleteOfficer = (id) => {
  return function (dispatch) {
    dispatch(deleteOfficerRequest());
    axios
      .delete(`officers/${id}`, {
        headers: authHeader(),
      })
      .then(() => {
        dispatch(deleteOfficerSuccess(id));
      })
      .catch((response) => dispatch(deleteOfficerFailure(response)));
  };
};

export const getOneOfficer = (id) => {
  return function (dispatch) {
    dispatch(getOneOfficerRequest());
    axios
      .get(`officers/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(getOneOfficerSuccess(response.data.data));
      })
      .catch((response) => dispatch(getOneOfficerFailure(response)));
  };
};

export const editOfficer = (id, values) => {
  return function (dispatch) {
    dispatch(editOfficerRequest());
    const requestData = {
      firstName: values.firstName,
      lastName: values.lastName,
      approved: values.approved,
    };
    if (values.password) {
      requestData.password = values.password
    }
    axios
      .put(
        `officers/${id}`,
        requestData,
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(editOfficerSuccess(id, values));
        dispatch(getOneOfficerSuccess(response.data.data));
      })
      .catch((response) => {
        dispatch(editOfficerFailure(response));
        dispatch(getOneOfficerFailure(response));
      });
  };
};

export const createOfficer = (values) => {
  return function (dispatch) {
    dispatch(createOfficerRequest());
    axios
      .post(
        "officers",
        {
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          approved: values.approved,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(createOfficerSuccess(response.data.data));
      })
      .catch((response) => dispatch(createOfficerFailure(response)));
  };
};

export const handleClickMessageButton = () => {
  return function (dispatch) {
    dispatch(onClickMessageButton());
  };
};

export const handleClickModalButton = () => {
  return function (dispatch) {
    dispatch(onClickModalButton());
  };
};