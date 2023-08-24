import axios from "axios";
const baseUrl = "http://localhost:8080/";

const auth = () => {
  const { token } = JSON.parse(localStorage.getItem("userInfo"));
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};

const getUser = () => {
  const { user } = JSON.parse(localStorage.getItem("userInfo"));
  return user;
};

async function logIn({ email, password }) {
  try {
    const res = await axios.post(`${baseUrl}auth/login`, {
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (err) {
    console.log(err);
  }
}
async function register({ name, email, password }) {
  try {
    const res = await axios.post(`${baseUrl}auth/register`, {
      name,
      email,
      password,
    });
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (err) {
    console.log(err);
  }
}

async function logOut() {
  try {
    const res = await axios.post(`${baseUrl}user/logout`, undefined, auth());
    console.log(res.data);
    if (res.status === 200) {
      const data = res.data;
      return { data };
    }
  } catch (error) {
    console.log(error);
  }
}

export { logIn, auth, logOut, register, getUser };
