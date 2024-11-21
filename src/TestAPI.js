import React, { useEffect } from "react";
import api from "../api";

const TestAPI = () => {
  useEffect(() => {
    api.get("/products")
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  }, []);

  return <div>Check Console for API Data</div>;
};

export default TestAPI;
