import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Products, { loader as productsLoader, action as updateavailability } from "./pages/Products";
import NewProduct, { action as NewProductAction } from "./pages/NewProduct";
import EditProduct, {
  loader as EditProductLoader,
  action as editProductAction,
} from "./pages/EditProduct";
import {action as DeleteProductAction} from "./components/ProductDatail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
        loader: productsLoader,
        action: updateavailability
      },
      {
        path: "productos/nuevo",
        element: <NewProduct />,
        action: NewProductAction,
      },
      {
        path: "productos/:id/edit", // ROA Pattern
        element: <EditProduct />,
        loader: EditProductLoader,
        action: editProductAction,
      },
      {
        path: "productos/:id/eliminar", // ROA Pattern
        action: DeleteProductAction,
      },
    ],
  },
]);
