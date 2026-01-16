import {
  Link,
  Form,
  useActionData,
  redirect,
  type ActionFunctionArgs,
} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";
import ProductForm from "../components/ProductForm";

export async function action({ request }: ActionFunctionArgs) {
  // Object.fromEntries() acepta cualquier iterable de pares clave-valor.
  // El objeto Request tiene un método llamado .formData(). Este método lee el cuerpo de la petición
  // (que viene codificado) y lo convierte en un objeto especial de tipo FormData que contiene pares clave-valor (los name de tus inputs).
  const data = Object.fromEntries(await request.formData());
  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return error;
  }

  await addProduct(data);
  return redirect("/");
}

export default function NewProduct() {
  const error = useActionData() as string;
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-4xl font-black text-slate-500">
          Registrar Producto
        </h2>
        <Link
          to="/"
          className="rounded-lg bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-800"
        >
          Volver a Productos
        </Link>
      </div>
      {error && <ErrorMessage>{error}</ErrorMessage>}
       {/* Form html normal, utilizamos el de react-router que este crea un
      request y ejecuta el action de la ruta, entonces el el Form esta conectado
      con la action */}
      <Form className="mt-10" method="POST">
        <ProductForm />

        <input
          type="submit"
          className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded hover:bg-indigo-500"
          value="Registrar Producto"
        />
      </Form>
    </>
  );
}
