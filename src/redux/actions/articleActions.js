import API from "../../assets/js/api";
import { returnErrors } from "./errorActions";

import {
  GET_ARTICLES_SUCCESS,
  GET_ARTICLES_FAILURE,
  ARTICLES_INPUT_CHANGE,
  ADD_ARTICLES_SUCCESS,
  ADD_ARTICLES_FAILURE,
  ADD_ARTICLES_REPLY_SUCCESS,
  ADD_ARTICLES_REPLY_FAILURE,
  DELETE_ARTICLES_SUCCESS,
  DELETE_ARTICLES_FAILURE,
  UPDATE_ARTICLES_SUCCESS,
  UPDATE_ARTICLES_FAILURE
} from "./types";

export const articleInputChange = (name, value) => async (dispatch) => {
  try {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name,
        value,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getArticles = () => async (
  dispatch
) => {
  try {   
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'getArticleLoader',
        value: true,
      },
    });   
    const result = await API.getArticles();
    dispatch({
      type: GET_ARTICLES_SUCCESS,
      payload:result.data.data.articles      
    });

    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'getArticleLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'getArticleLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "GET_ARTICLES_FAILURE"
      )
    );
    dispatch({
      type: GET_ARTICLES_FAILURE,
    });
  }
};

export const createArticle = (data) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: true,
      },
    });   

    const result = await API.postArticle(data);
   
    dispatch({
      type: ADD_ARTICLES_SUCCESS,
      payload:result.data.data     
    });

    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_ARTICLES_FAILURE"
      )
    );
    dispatch({
      type: ADD_ARTICLES_FAILURE,
    });
  }
};

export const addArticleComment = (data, currentCommentIndex) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: true,
      },
    });  
    
    const result = await API.postArticleReply(data);   
    console.log(result.data.data.commentReply)
    dispatch({
      type: ADD_ARTICLES_REPLY_SUCCESS,
      payload:{
        commentReply: result.data.data.commentReply,
        currentCommentIndex
      }     
    });

    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'addCommentResponseLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "ADD_COMMENT_REPLY_FAILURE"
      )
    );
    dispatch({
      type: ADD_ARTICLES_REPLY_FAILURE,
    });
  }
};

export const deleteArticleComment = (commentId) => async (
  dispatch
) => {
  try {       
    await API.deleteArticleComment(commentId);      
    dispatch({
      type: DELETE_ARTICLES_SUCCESS,
      payload:{       
        commentId
      }     
    });
  } catch (err) {  
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "DELETE_ARTICLES_FAILURE"
      )
    );
    dispatch({
      type: DELETE_ARTICLES_FAILURE,
    });
  }
};

export const updateComment = (data, commentId, articleIndex, commentIndex) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: true,
      },
    }); 
  
    const result = await API.updateArticleComment(data, commentId);   
    dispatch({
      type: UPDATE_ARTICLES_SUCCESS,
      payload:{
        data: result.data.data.comment,
        articleIndex,
        commentIndex      
      }     
    });

    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: false,
      },
    });   
  } catch (err) {
    dispatch({
      type: ARTICLES_INPUT_CHANGE,
      payload: {
        name: 'updateCommentResponseLoader',
        value: false,
      },
    });
   
    dispatch(
      returnErrors(
        err.response.data.errors
          ? err.response.data.errors
          : err.response.data.error,
        err.response.data.status,
        "UPDATE_ARTICLES_FAILURE"
      )
    );
    dispatch({
      type: UPDATE_ARTICLES_FAILURE,
    });
  }
};