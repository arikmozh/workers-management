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

// export const getAllData = async () => {
//   if (ss != null) {
//     const storedUserData = JSON.parse(ss);
//     const token = storedUserData.token;
//     const userId = storedUserData.id;

//     // Set the Authorization header with the token
//     const { data: result } = await axios.get(`${urlData}/${userId}`, {
//       headers: {
//         authorization: token,
//       },
//     });
//     return result;
//   } else {
//     return;
//   }
// };
