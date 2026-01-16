import { safeParse } from "valibot";
import {
  DraftProductSchema,
  ProductsSchema,
  ProductSchema,
  type Product,
} from "../types";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });
    console.log(result)
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no validos");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos`;
    const { data } = await axios(url);
    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProductById(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error("Hubo un error...");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: Number(data.price),
      availability: data.availability === "true",
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {}
}

export async function deletProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/productos/${id}`; 
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}