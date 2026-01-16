import type { Product } from "../types";

type ProductForm = {
  product?: Product
}

export default function ProductForm({product} : ProductForm) {
  return (
    <>
      <div className="mb-4">
        <label htmlFor="name" className="text-gray-800">
          Nombre del Producto:
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="mt-2 block w-full p-3 bg-gray-50 border border-gray-400/80"
          defaultValue={product?.name}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="text-gray-800">
          Precio del Producto:
        </label>
        <input
          id="price"
          name="price"
          type="number"
          className="mt-2 block w-full p-3 bg-gray-50 border border-gray-400/80"
          defaultValue={product?.price}
        />
      </div>
    </>
  );
}
