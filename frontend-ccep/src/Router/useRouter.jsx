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
import { Products } from "../Views/Products";
import { PosSystem } from "../Views/PosSystem";
import { Sales } from "../Views/Sales";
import { UpdateSale } from "../Components/Sales/SalesViews/UpdateSale";
import { EdcSystem } from "../Views/EdcSystem";
import { Purchases } from "../Views/Purchases";
import { UpdatePurchase } from "../Components/Purchases/UpdatePurchase";
import { Inventories } from "../Views/Inventories";


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
        {
          path: "products",
          element: <Products />
        },
        {
          path: "pos",
          element: <PosSystem />
        },
        {
          path: "sales",
          element: <Sales />
        },
        {
          path: "sale-update/:id",
          element: <UpdateSale />
        },
        {
          path: "edc",
          element: <EdcSystem />
        },
        {
          path: "purchases",
          element: <Purchases />
        },
        {
          path: "purchase-update/:id",
          element: <UpdatePurchase />
        },
        {
          path: "inventories",
          element: <Inventories />
        }
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