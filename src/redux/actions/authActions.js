import API from "./../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  INPUT_CHANGE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE 
} from "./types";

export const inputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: INPUT_CHANGE,
      payload: {
        name: name,
        value: value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
export const registerUser = (user) => async (dispatch) => {
  try {
    document.body.classList.add("loading-indicator");
    const result = await API.registerUser(user);
    dispatch({
      type: CLEAR_FORM,
    });
    dispatch({
      type: REGISTER_SUCCESS,
      payload: result.data.data,
    });

    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "REGISTER_FAILURE"
      )
    );
    dispatch({
      type: REGISTER_FAILURE,
    });
  }
};
export const loginUser = (user, google = false, facebook = false) => async (
  dispatch
) => {
  try {
    document.body.classList.add("loading-indicator");
    let result = null;
    if (google) {
      result = await API.socialLoginGoogle(user);
    } else if (facebook) {
      result = await API.socialLoginFacebook(user);
    } else {
      result = await API.login(user);
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: result.data.data,
    });
    document.body.classList.remove("loading-indicator");
  } catch (err) {
    document.body.classList.remove("loading-indicator");
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "LOGIN_FAILURE"
      )
    );
    dispatch({
      type: LOGIN_FAILURE,
    });
  }
};
