import {
  Form,
  useNavigate,
  type ActionFunctionArgs,
  redirect,
  useFetcher,
} from "react-router-dom";
import type { Product } from "../types";
import { formatCorrency } from "../utils";
import { deletProduct } from "../services/ProductService";

type productDatailProps = {
  product: Product;
};

export async function action({ params }: ActionFunctionArgs) {
  if (params.id !== undefined) {
    await deletProduct(+params.id);
  }
  return redirect("/");
}

export default function ProductDatail({ product }: productDatailProps) {

  const fetcher = useFetcher()
  const navigate = useNavigate();
  const isAvailable = product.availability;

  return (
    <tr className="border-b ">
      <td className="p-3 text-lg text-gray-800">{product.name}</td>
      <td className="p-3 text-lg text-gray-800">
        {formatCorrency(product.price)}
      </td>
      <td className="p-3 text-lg text-gray-800">
        <fetcher.Form method="POST">
          <button
            type="submit"
            name="id"
            value={product.id}
            className={`${isAvailable ? 'text-black' : 'text-red-600'} rounded-lg p-2 text-xs uppercase font-bold w-full border border-black/45 hover:cursor-pointer`}
          >
            {isAvailable ? "Disponible" : "No disponible"}
          </button>
        </fetcher.Form>
      </td>
      <td className="p-3 text-lg text-gray-800 ">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate(`productos/${product.id}/edit`)}
            className="bg-indigo-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer hover:bg-indigo-700"
          >
            Editar
          </button>
          <Form
            className="w-full"
            method="post"
            action={`productos/${product.id}/eliminar`}
            onSubmit={(e) => {
              if (!confirm("Estas seguro de eliminar este producto?")) {
                e.preventDefault();
              }
            }}
          >
            <input
              type="submit"
              value="Eliminar"
              className="bg-red-600 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center cursor-pointer hover:bg-red-700"
            />
          </Form>
        </div>
      </td>
    </tr>
  );
}
