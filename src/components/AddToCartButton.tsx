"use client"
import { useCartStore } from '@/store/cartstore';
import { ShoppingCart } from 'lucide-react'

type Product = {
  _id: string
  name: string
  price: number
  images?: string[]
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0] ?? '/file.svg',
      quantity: 1,
    })
  }

  return (
    <button
      onClick={handleAddToCart}
      className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-xl transition duration-200 active:scale-95"
    >
      <span>Add to Cart</span>
      <ShoppingCart />
    </button>
  )
}