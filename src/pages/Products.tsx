import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import {
  getProducts,
  updateProductAvailability,
} from "../services/ProductService";
import type { Product } from "../types";
import ProductDatail from "../components/ProductDatail";

// Funcion que se ejecuta antes de que se renderice la pagina, esta trae los datos y para utilizarlo se llaman con el useLoaderData().
export async function loader() {
  const products = await getProducts();
  return products;
}

export async function action({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());
  console.log(data);
  await updateProductAvailability(+data.id);
  return null;
}

export default function Products() {
  const data = useLoaderData() as Product[];

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl sm:text-4xl font-black text-slate-500">
          Productos
        </h2>

        <Link
          to="productos/nuevo"
          className="w-full sm:w-auto text-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-800"
        >
          Agregar Producto
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-2 text-left">Producto</th>
              <th className="p-2 text-left">Precio</th>
              <th className="p-2 text-left">Disponibilidad</th>
              <th className="p-2 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((product) => (
              <ProductDatail key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
