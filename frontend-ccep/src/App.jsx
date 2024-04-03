import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { RouteContext } from "./Router/useRouter";

function App() {
  const { router } = useContext(RouteContext);

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;