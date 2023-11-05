import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ShiftComp = () => {
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Use the 'id' from the route params in useEffect
    console.log("ID from route:", id);

    // Your logic using the 'id' parameter
    // For example, you can make API calls, fetch data, or perform any action based on the 'id'

    // Make sure to handle any async operations or state updates inside useEffect
  }, [id]); // Include 'id' in the dependency array if you want to re-run the effect when 'id' changes

  return <div>ShiftComp</div>;
};

export default ShiftComp;
