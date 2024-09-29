import React from "react";

//React Router
import { createBrowserRouter } from "react-router-dom";

//Views
import { Login } from "../Views/Login";
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
import { ProtectedRoute } from "../Components/Security/ProtectedRoute";

const RouteContext = React.createContext();

function RouteProvider(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute
          element={<Login />}
          requiresAuth={false}
        />
      ),
    },
    {
      path: "/dashboard",
      element: <DashBoard />,
      children: [
        {
          path: "index",
          element: (
            <ProtectedRoute element={<StartPage />} requiresAuth={true} />
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute element={<Categories />} requiresAuth={true} />
          ),
        },
        {
          path: "subcategories",
          element: (
            <ProtectedRoute element={<SubCategories />} requiresAuth={true} />
          ),
        },
        {
          path: "suppliers",
          element: (
            <ProtectedRoute element={<Suppliers />} requiresAuth={true} />
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute element={<Products />} requiresAuth={true} />
          ),
        },
        {
          path: "pos",
          element: (
            <ProtectedRoute element={<PosSystem />} requiresAuth={true} />
          ),
        },
        {
          path: "sales",
          element: <ProtectedRoute element={<Sales />} requiresAuth={true} />,
        },
        {
          path: "sale-update/:id",
          element: (
            <ProtectedRoute element={<UpdateSale />} requiresAuth={true} />
          ),
        },
        {
          path: "edc",
          element: (
            <ProtectedRoute
              element={<EdcSystem />}
              requiresAuth={true}
            />
          ),
        },
        {
          path: "purchases",
          element: (
            <ProtectedRoute
              element={<Purchases />}
              requiresAuth={true}
            />
          ),
        },
        {
          path: "purchase-update/:id",
          element: (
            <ProtectedRoute
              element={<UpdatePurchase />}
              requiresAuth={true}
            />
          ),
        },
        {
          path: "inventories",
          element: (
            <ProtectedRoute
              element={<Inventories />}
              requiresAuth={true}
            />
          ),
        },
      ],
    },
  ]);

  return (
    <RouteContext.Provider value={{ router }}>
      {props.children}
    </RouteContext.Provider>
  );
}

export { RouteContext, RouteProvider };
