import axios from "axios";
import {
  LOG_OUT_SUCCESS,
  ON_CLICK_MESSAGE_BUTTON,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from "../type";
import {
  logOutSuccess,
  onClickMessageButton,
  signInFailure,
  signInRequest,
  signInSuccess,
  signUpFailure,
  signUpRequest,
  signUpSuccess,
} from "../actions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? {
      isAuthorized: true,
      isRegistered: true,
      user,
      isLoading: false,
      message: "",
    }
  : {
      isAuthorized: false,
      isRegistered: false,
      user: null,
      isLoading: false,
      message: "",
    };

export const authorizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthorized: false,
        isRegistered: false,
        user: null,
        message: "",
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        isRegistered: true,
        isLoading: false,
        message: "",
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        isRegistered: false,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case SIGN_IN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthorized: false,
        user: null,
        message: "",
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        isAuthorized: true,
        user: action.payload,
        isLoading: false,
        message: "",
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        isAuthorized: false,
        isLoading: false,
        message: action.payload.response.data.message,
      };

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isAuthorized: false,
        user: null,
        isLoading: false,
        message: "",
      };

    case ON_CLICK_MESSAGE_BUTTON:
      return {
        ...state,
        message: "",
      };

    default:
      return state;
  }
};

export const signUp = (values) => {
  return function (dispatch) {
    dispatch(signUpRequest());
    axios
      .post("auth/sign_up", {
        email: values.email,
        password: values.password,
        clientId: values.clientId,
        firstName: values.firstName,
        lastName: values.lastName,
        approved: values.approved,
      })
      .then(() => {
        dispatch(signUpSuccess());
      })
      .catch((response) => {
        dispatch(signUpFailure(response));
      });
  };
};

export const signIn = (values) => {
  return function (dispatch) {
    dispatch(signInRequest());
    axios
      .post("auth/sign_in", {
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        if (response.data.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data));
        }
        dispatch(signInSuccess(response.data.data.user));
      })
      .catch((response) => dispatch(signInFailure(response)));
  };
};

export const logOut = () => {
  return function (dispatch) {
    localStorage.removeItem("user");
    dispatch(logOutSuccess());
  };
};

export const handleClickMessageButton = () => {
  return function (dispatch) {
    dispatch(onClickMessageButton());
  };
};