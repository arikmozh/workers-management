/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const urlData = "http://localhost:8000";

// Get the token from storage
const ss = sessionStorage.getItem("Workers");

export const addDepartmentToAPI = async (departmentName: string) => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    // Set the Authorization header with the token
    const { data: result } = await axios.post(
      `${urlData}/departments/addDepartment`,
      { userId: userId, departmentName: departmentName },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(result);

    return result;
  } else {
    return;
  }
};

export const updateDepartmentToAPI = async (
  departmentId: string,
  departmentName: string
) => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    // Set the Authorization header with the token
    const { data: result } = await axios.put(
      `${urlData}/departments/updateDepartment/${departmentId}`,
      { userId: userId, departmentName: departmentName },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(result);

    return result;
  } else {
    return;
  }
};

export const deleteDepartmentToAPI = async (departmentId: string) => {
  if (ss !== null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    try {
      const { data: result } = await axios.delete(
        `${urlData}/departments/deleteDepartment/${departmentId}`, // Correct endpoint
        {
          headers: {
            authorization: token,
          },
          data: {
            userId: userId,
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      // Handle the error, maybe log it
      console.error("Error:", error);
      throw error;
    }
  } else {
    return;
  }
};

export const addShiftToAPI = async (shift: any) => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;
    shift.userId = userId;
    // Set the Authorization header with the token
    const { data: result } = await axios.post(
      `${urlData}/shifts/addShift`,
      shift,
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(result);

    return result;
  } else {
    return;
  }
};

export const updateShiftToAPI = async (
  shiftId: string,
  departmentName: string
) => {
  if (ss != null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    // Set the Authorization header with the token
    const { data: result } = await axios.put(
      `${urlData}/departments/updateDepartment/${departmentId}`,
      { userId: userId, departmentName: departmentName },
      {
        headers: {
          authorization: token,
        },
      }
    );
    console.log(result);

    return result;
  } else {
    return;
  }
};

export const deleteShiftToAPI = async (shiftId: string) => {
  if (ss !== null) {
    const storedUserData = JSON.parse(ss);
    const token = storedUserData.token;
    const userId = storedUserData.id;

    try {
      const { data: result } = await axios.delete(
        `${urlData}/shifts/deleteShift/${shiftId}`, // Correct endpoint
        {
          headers: {
            authorization: token,
          },
          data: {
            userId: userId,
          },
        }
      );
      console.log(result);
      return result;
    } catch (error) {
      // Handle the error, maybe log it
      console.error("Error:", error);
      throw error;
    }
  } else {
    return;
  }
};
