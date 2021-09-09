import axios from "axios";
const LocalURL = "http://localhost:5000/api/v1/";

/* eslint-disable import/no-anonymous-default-export */
export default {
  url: LocalURL,
  headers(fileupload = false) {
    const token = localStorage.getItem("token");

    let header = {};
    if (fileupload) {
      header["Content-type"] = "multipart/form-data";
    } else {
      header["Content-type"] = "application/json";
      header["Accept"] = "*/*";
      header["Access-Control-Allow-Origin"] = "*";
    }
    if (token && token !== undefined) {
      header["token"] = token;
    }
    return header;
  },

  
  registerUser(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/signup`,
      headers: this.headers(),
      data,
    });
  },

  login(data) {
    return axios({
      method: "post",
      url: `${this.url}auth/login`,
      headers: this.headers(),
      data,
    });
  },  

  getArticles() {
    return axios({
      method: "get",
      url: `${this.url}article`,
      headers: this.headers()
    });
  },

  postArticle(data) {
    return axios({
      method: "post",
      url: `${this.url}article/`,
      headers: this.headers(),
      data,
    });
  },

  postArticleReply(data) {
    return axios({
      method: "post",
      url: `${this.url}article/comment`,
      headers: this.headers(),
      data,
    });
  },
  deleteArticleComment(commentId) {
    return axios({
      method: "delete",
      url: `${this.url}article/comment/${commentId}`,
      headers: this.headers(),
    });
  },
  updateArticleComment(data, commentId) {
    return axios({
      method: "patch",
      url: `${this.url}article/comment/${commentId}`,
      headers: this.headers(),
      data,
    });
  } 
};
