import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { RouteContext } from "./Router/useRouter";
import axios from "axios";

function App() {

// Interceptor para agregar el token en cada solicitud
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;   
  }
  return config;
}, (error) => {
  console.log("Pues error")
  return Promise.reject(error);
});


  const { router } = useContext(RouteContext);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;