
import { create } from "zustand";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  featured?: boolean;
  category?: any;
};

type ProductsStore = {
  products: Product[];
  categories: any[];
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  setCategories: (categories: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
};

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,
  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));