/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const url = "http://localhost:8000/auth";
const urlData = "http://localhost:8000/allData";

// Get the token from storage
const ss = sessionStorage.getItem("Workers");

export const register = async (obj: any) => {
  const { data: result } = await axios.post(`${url}/register`, obj);
  return result;
};

export const login = async (obj: any) => {
  const { data: result } = await axios.post(`${url}/login`, obj);
  return result;
};

export const getAllData = async () => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    // Set the Authorization header with the token
    const { data: result } = await axios.get(`${urlData}/${userId}`, {
      headers: {
        authorization: token,
      },
    });
    return result;
  } else {
    return;
  }
};

export const loggedIn = () => {
  return ss;
};
export const logout = () => {
  sessionStorage.clear();
};
