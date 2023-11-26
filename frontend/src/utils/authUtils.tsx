/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

// const url = "http://localhost:8000/auth";
// const urlUser = "http://localhost:8000/user";
// const urlData = "http://localhost:8000/allData";

const url = "https://workersmanagementback.onrender.com/auth";
const urlUser = "https://workersmanagementback.onrender.com/user";
const urlData = "https://workersmanagementback.onrender.com/allData";

// Get the token from storage

export const register = async (obj: any) => {
  const { data: result } = await axios.post(`${url}/register`, obj);
  return result;
};

export const login = async (obj: any) => {
  const { data: result } = await axios.post(`${url}/login`, obj);
  return result;
};

export const isLoggedIn = async () => {
  const ss = sessionStorage.getItem("Workers");

  if (ss != null) {
    try {
      const storedUserData = JSON.parse(ss);
      const token = storedUserData.token;
      const userId = storedUserData.id;

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
  const ss = sessionStorage.getItem("Workers");

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
      throw error;
    }
  } else {
    const error = new Error("No session storage found.");

    throw error;
  }
};

export const loggedIn = () => {
  const ss = sessionStorage.getItem("Workers");

  return ss;
};

export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};

export const updateUserToApi = async (obj: any) => {
  const ss = sessionStorage.getItem("Workers");

  if (ss != null) {
    try {
      const storedUserData = JSON.parse(ss);
      const token = storedUserData.token;

      const { data: result } = await axios.put(
        `${urlUser}/updateUser/${obj.userId}`,
        obj,
        {
          headers: {
            authorization: token,
          },
        }
      );
      return result;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching data:", error);
      throw error;
    }
  } else {
    const error = new Error("No session storage found.");

    throw error;
  }
};
