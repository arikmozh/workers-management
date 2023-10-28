/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const url = "http://localhost:8000/auth";

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

export const login2 = async (obj: any) => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  // Set the Authorization header with the token
  const { data: result } = await axios.post(`${url}/login`, obj);
  return result;
};

export const logout = () => {
  sessionStorage.clear();
};
