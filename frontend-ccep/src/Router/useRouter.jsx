import React from "react";

//React Router
import { createBrowserRouter } from "react-router-dom";

//Views
import { Index } from "../Views/Index";
import { DashBoard } from "../Views/DashBoard";
import { StartPage } from "../Views/StarPage";
import { Categories } from "../Views/Categories";
import { SubCategories } from "../Views/SubCategories";
import { Suppliers } from "../Views/Suppliers";


const RouteContext = React.createContext();

function RouteProvider(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Index />,
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
      children: [
        {
          path: "index",
          element: <StartPage />
        },
        {
          path: "categories",
          element: <Categories />
        },
        {
          path: "subcategories",
          element: <SubCategories />
        },
        {
          path: "suppliers",
          element: <Suppliers />
        },
      ]
    },
  ]);

  return (
    <RouteContext.Provider value={{ router }}>
      {props.children}
    </RouteContext.Provider>
  );
}

export { RouteContext, RouteProvider };