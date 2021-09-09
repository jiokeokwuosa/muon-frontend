import {
  GET_ARTICLES_SUCCESS,
  ARTICLES_INPUT_CHANGE,
  ADD_ARTICLES_SUCCESS,
  ADD_ARTICLES_REPLY_SUCCESS,
  DELETE_ARTICLES_SUCCESS,
  UPDATE_ARTICLES_SUCCESS
} from "../actions/types";

const initialState = {
  getArticleLoader: false,
  articles: [],
  addCommentLoader: false,
  newArticle: '',
  newArticleTitle:'',
  addCommentResponseLoader: false,
  newArticleReply: '',
  commentUpdateText:'',
  updateCommentResponseLoader: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARTICLES_INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case GET_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload,
      };

    case ADD_ARTICLES_SUCCESS:
      let newArticles = state.articles;
      newArticles.unshift(action.payload.article)
      state.articles = [...newArticles]
      return {
        ...state,
        newArticle: '',
        newArticleTitle:''
      };
      
    case UPDATE_ARTICLES_SUCCESS:  
      let allArticles = state.articles;
      let DtargetedArticle = allArticles[action.payload.articleIndex];
      DtargetedArticle.articlesReplies[action.payload.commentIndex] = action.payload.data;      
      return {
        ...state,
      };

    case ADD_ARTICLES_REPLY_SUCCESS:
      let DlesssonArticles = state.articles;
      let DtargetLesssonComment = DlesssonArticles[action.payload.currentCommentIndex];
      let DtargetLesssonCommentReplies = DtargetLesssonComment.articlesReplies;
      DtargetLesssonCommentReplies.unshift({
        ...action.payload.commentReply
      });

      return {
        ...state,
        newArticleReply: ''
      };

    case DELETE_ARTICLES_SUCCESS:    
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default articleReducer;