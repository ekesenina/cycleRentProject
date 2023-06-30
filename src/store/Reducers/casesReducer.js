import axios from "axios";
import {
  CREATE_CASE_FAILURE,
  CREATE_CASE_PUBLIC_FAILURE,
  CREATE_CASE_PUBLIC_REQUEST,
  CREATE_CASE_PUBLIC_SUCCESS,
  CREATE_CASE_REQUEST,
  CREATE_CASE_SUCCESS,
  DELETE_CASE_FAILURE,
  DELETE_CASE_REQUEST,
  DELETE_CASE_SUCCESS,
  EDIT_CASE_FAILURE,
  EDIT_CASE_REQUEST,
  EDIT_CASE_SUCCESS,
  FETCH_CASES_FAILURE,
  FETCH_CASES_REQUEST,
  FETCH_CASES_SUCCESS,
  GET_ONE_CASE_FAILURE,
  GET_ONE_CASE_REQUEST,
  GET_ONE_CASE_SUCCESS,
  ON_CLICK_MESSAGE_BUTTON,
  ON_CLICK_MODAL_BUTTON,
} from "../type";
import {
  createCaseFailure,
  createCasePublicFailure,
  createCasePublicRequest,
  createCasePublicSuccess,
  createCaseRequest,
  createCaseSuccess,
  deleteCaseFailure,
  deleteCaseRequest,
  deleteCaseSuccess,
  editCaseFailure,
  editCaseRequest,
  editCaseSuccess,
  fetchCasesFailure,
  fetchCasesRequest,
  fetchCasesSuccess,
  getOneCaseFailure,
  getOneCaseRequest,
  getOneCaseSuccess,
  onClickMessageButton,
  onClickModalButton,
} from "../actions";
import authHeader from "../../helper";

const initialState = {
  cases: [],
  case: {},
  caseIsCreated: false,
  bicycle: {
    caseStatus: [
      { title: "Открыто", value: "new" },
      { title: "В процессе", value: "in_progress" },
      { title: "Завершено", value: "done" },
    ],
    bicycleType: [
      { title: "Обычный", value: "general" },
      { title: "Спортивный", value: "sport" },
    ],
  },
  isLoading: false,
  message: "",
};

export const casesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CASES_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case FETCH_CASES_SUCCESS:
      return {
        ...state,
        cases: action.payload,
        isLoading: false,
        message: "",
      };

    case FETCH_CASES_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case CREATE_CASE_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: true,
        message: "",
      };

    case CREATE_CASE_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        isLoading: false,
        message: "",
      };

    case CREATE_CASE_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case CREATE_CASE_PUBLIC_REQUEST:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: true,
        message: "",
      };

    case CREATE_CASE_PUBLIC_SUCCESS:
      return {
        ...state,
        cases: [...state.cases, action.payload],
        caseIsCreated: true,
        isLoading: false,
        message: "",
      };

    case CREATE_CASE_PUBLIC_FAILURE:
      return {
        ...state,
        caseIsCreated: false,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case EDIT_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case EDIT_CASE_SUCCESS:
      return {
        ...state,
        cases: [
          ...state.cases,
          {
            ...state.cases.find((item) => item._id !== action.payload.id),
            status: action.payload.status,
            licenseNumber: action.payload.licenseNumber,
            ownerFullName: action.payload.ownerFullName,
            type: action.payload.type,
            color: action.payload.color,
            officer: action.payload.officer,
            description: action.payload.description,
            resolution: action.payload.resolution,
          },
        ],
        isLoading: false,
        message: "",
      };

    case EDIT_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case GET_ONE_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case GET_ONE_CASE_SUCCESS:
      return {
        ...state,
        case: action.payload,
        isLoading: false,
        message: "",
      };

    case GET_ONE_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case DELETE_CASE_REQUEST:
      return {
        ...state,
        isLoading: true,
        message: "",
      };

    case DELETE_CASE_SUCCESS:
      return {
        ...state,
        cases: state.cases.filter((item) => item._id !== action.payload),
        isLoading: false,
        message: "",
      };

    case DELETE_CASE_FAILURE:
      return {
        ...state,
        isLoading: false,
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
        caseIsCreated: false,
      };

    default:
      return state;
  }
};

export const getAllCases = () => {
  return function (dispatch) {
    dispatch(fetchCasesRequest());
    axios
      .get("cases/", {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(fetchCasesSuccess(response.data.data));
      })
      .catch((response) => dispatch(fetchCasesFailure(response)));
  };
};

export const createCase = (values) => {
  return function (dispatch) {
    dispatch(createCaseRequest());
    axios
      .post(
        "cases/",
        {
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          date: values.date,
          officer: values.officer,
          description: values.description,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(createCaseSuccess(response.data.data));
      })
      .catch((response) => dispatch(createCaseFailure(response)));
  };
};

export const createCasePublic = (values) => {
  return function (dispatch) {
    dispatch(createCasePublicRequest());
    axios
      .post("public/report", {
        licenseNumber: values.licenseNumber,
        ownerFullName: values.ownerFullName,
        type: values.type,
        clientId: values.clientId,
        color: values.color,
        date: values.date,
        description: values.description,
      })
      .then((response) => {
        dispatch(createCasePublicSuccess(response.data.data));
      })
      .catch((response) => dispatch(createCasePublicFailure(response)));
  };
};

export const deleteCase = (id) => {
  return function (dispatch) {
    dispatch(deleteCaseRequest());
    axios
      .delete(`cases/${id}`, {
        headers: authHeader(),
      })
      .then(() => {
        dispatch(deleteCaseSuccess(id));
      })
      .catch((response) => dispatch(deleteCaseFailure(response)));
  };
};

export const getOneCase = (id) => {
  return function (dispatch) {
    dispatch(getOneCaseRequest());
    axios
      .get(`cases/${id}`, {
        headers: authHeader(),
      })
      .then((response) => {
        dispatch(getOneCaseSuccess(response.data.data));
      })
      .catch((response) => dispatch(getOneCaseFailure(response)));
  };
};

export const editCase = (id, values) => {
  return function (dispatch) {
    dispatch(editCaseRequest());
    axios
      .put(
        `cases/${id}`,
        {
          status: values.status,
          licenseNumber: values.licenseNumber,
          ownerFullName: values.ownerFullName,
          type: values.type,
          color: values.color,
          officer: values.officer,
          description: values.description,
          resolution: values.resolution,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        dispatch(editCaseSuccess(id, values));
        dispatch(getOneCaseSuccess(response.data.data));
      })
      .catch((response) => {
        dispatch(editCaseFailure(response));
        dispatch(getOneCaseFailure(response));
      });
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