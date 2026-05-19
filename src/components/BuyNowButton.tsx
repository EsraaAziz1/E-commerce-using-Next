"use client"
import { useCartStore } from '@/store/cartstore'
import { useRouter } from 'next/navigation'

type Product = {
    _id: string
    name: string
    price: number
    images?: string[]
}

export default function BuyNowButton({ product }: { product: Product }) {
    const addItem = useCartStore(state => state.addItem)
    const items = useCartStore(state => state.items)
    const router = useRouter()

    const isInCart = items.some(item => item._id === product._id)

    const handleBuyNow = () => {
        addItem({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0] ?? '',
            quantity: 1,
        })
        router.push('/cart')
    }

    return (
        <button
            onClick={handleBuyNow}
            disabled={isInCart}
            className={`flex items-center justify-center gap-2 font-semibold py-2 px-4 rounded-xl transition duration-200 active:scale-95
                ${isInCart
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}
        >
            {isInCart ? 'Already in Cart ✓' : 'Buy Now'}
        </button>
    )
}