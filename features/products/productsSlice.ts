import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../utils/firebase";

export interface Product {
  id?: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  created: string;
}

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      category: data.category,
      price: data.price,
      stock: data.stock,
      created: data.created?.toDate().toISOString() || new Date().toISOString(),
    };
  }) as Product[];
});

export const addProduct = createAsyncThunk(
  "products/add",
  async (newProduct: Omit<Product, "id" | "created">) => {
    const timestamp = Timestamp.now();
    const docRef = await addDoc(collection(db, "products"), {
      ...newProduct,
      created: timestamp,
    });
    return {
      ...newProduct,
      id: docRef.id,
      created: timestamp.toDate().toISOString(),
    } as Product;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.unshift(action.payload);
      });
  },
});

export default productsSlice.reducer;
