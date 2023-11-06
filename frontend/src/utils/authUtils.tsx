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

export const isLoggedIn = async () => {
  if (ss != null) {
    try {
      const storedUserData = JSON.parse(ss);
      const token = storedUserData.token;
      const userId = storedUserData.id;
      console.log(token);

      // Set the Authorization header with the token
      const response = await axios.get(`${url}/isLoggedIn/${userId}`, {
        headers: {
          authorization: token,
        },
      });

      // Handle the successful response here
      const result = response.data.message;
      return result;
    } catch (error) {
      // Handle errors here
      return error;
    }
  } else {
    return null;
  }

  // const { data: result } = await axios.post(`${url}/login`, obj);
  // return result;
};

export const getAllData = async () => {
  if (ss != null) {
    try {
      const storedUserData = JSON.parse(ss);
      const token = storedUserData.token;
      const userId = storedUserData.id;

      // Set the Authorization header with the token
      const response = await axios.get(`${urlData}/${userId}`, {
        headers: {
          authorization: token,
        },
      });

      // Handle the successful response here
      const result = response.data;
      return result;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      return [];
    }
  } else {
    return [];
  }
};

export const loggedIn = () => {
  return ss;
};
export const logout = () => {
  sessionStorage.clear();
};
