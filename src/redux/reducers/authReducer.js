import {
  INPUT_CHANGE,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_FORM,
  LOGIN_SUCCESS,
  LOGIN_FAILURE 
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user:{}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
   
    default:
      return state;
  }
};
export default authReducer;
