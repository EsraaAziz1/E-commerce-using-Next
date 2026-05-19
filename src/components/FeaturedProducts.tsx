"use client";
import { useEffect } from "react";
import { useProductsStore } from "@/store/productstore";
import AddToCartButton from "@/components/AddToCartButton";

export default function FeaturedProducts() {
  const { products, isLoading, error, setProducts, setLoading, setError } = useProductsStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/products?featured=true");
        const data = await res.json();
        if (!res.ok) { setError(data.error); return; }
        setProducts(data.products);
      } catch {
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return (
    <div className="text-center py-10 text-amber-500 font-semibold animate-pulse">
      Loading...
    </div>
  );

  if (error) return (
    <div className="text-center text-red-500 py-10">{error}</div>
  );

  if (!products?.length) return (
    <p className="text-gray-400">No featured products.</p>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 p-4 border border-amber-100"
        >
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-amber-500 font-bold mb-4">${product.price}</p>
          <AddToCartButton product={product} />
        </div>
      ))}
    </div>
  );
}