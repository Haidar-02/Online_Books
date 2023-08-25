import axios from "axios";
import { auth } from "./auth.helper";

const baseUrl = "http://localhost:8080/";

async function getAllFollowed() {
  try {
    const res = await axios.get(`${baseUrl}users/getAllFollowed`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
async function getAllBooks() {
  try {
    const res = await axios.get(`${baseUrl}users/getAllBooks`, auth());
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
async function search({ author = "", genre = "", keywords = "" }) {
  try {
    const res = await axios.get(
      `${baseUrl}users/search/?author=${author}&genre=${genre}&keywords=${keywords}`,
      auth()
    );
    console.log(res);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}

async function follow(userId) {
  try {
    const res = await axios.post(
      `${baseUrl}users/follow/${userId}`,
      {},
      auth()
    );
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function likeBook(bookId) {
  try {
    const res = await axios.post(`${baseUrl}users/like/${bookId}`, {}, auth());
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}

async function addPost(data) {
  try {
    const res = await axios.post(`${baseUrl}users/post/`, data, auth());
    console.log(res);
    const post = res.data;
    return { post };
  } catch (err) {
    console.log(err);
    const {
      response: {
        data: { error },
      },
    } = err;

    return { error };
  }
}

async function getBookById(bookId) {
  try {
    const res = await axios.get(
      `${baseUrl}users/getBookById/${bookId}`,
      auth()
    );
    console.log(res.data);
    if (res.status === 200) return res.data;
  } catch (error) {
    console.log(error);
  }
}
export {
  getAllFollowed,
  follow,
  likeBook,
  search,
  addPost,
  getBookById,
  getAllBooks,
};
