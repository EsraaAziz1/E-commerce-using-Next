"use client"
import { useCartStore } from '@/store/cartstore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CartItems() {
    const { items, removeItem, updateQuantity, clearCart, total } = useCartStore()
    const router = useRouter()

    const handleCheckout = async () => {
        const orderItems = items.map(i => ({
            product: i._id,
            quantity: i.quantity,
            price: i.price,
        }))
        await fetch("/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: orderItems, total: total() }),
        })
        clearCart()
        router.push("/profile")
    }

    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
                <p className="text-2xl text-gray-400">🛒 Your cart is empty</p>
                <Link href="/products" className="btn btn-primary">
                    Go Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {items.map((item) => (
                <div key={item._id} className="card bg-base-100 shadow-sm p-4 flex flex-row items-center gap-4">
                    
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        {item.image ? (
                            <Image
                                src={item.image}
                                fill
                                className="object-cover"
                                alt={item.name}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">
                                No Image
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h2 className="font-bold text-lg">{item.name}</h2>
                        <p className="text-green-600 font-medium">${item.price}</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        >
                            -
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                            className="btn btn-sm btn-outline"
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        >
                            +
                        </button>
                    </div>

                    <p className="font-bold w-20 text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                    </p>

                    <button
                        className="btn btn-sm btn-error btn-outline"
                        onClick={() => removeItem(item._id)}
                    >
                        ✕
                    </button>
                </div>
            ))}

            <div className="card bg-base-100 shadow-sm p-6 mt-2">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl">Total:</span>
                    <span className="text-2xl font-bold text-green-600">
                        ${total().toFixed(2)}
                    </span>
                </div>

                <div className="flex gap-4">
                    <button
                        className="btn btn-error btn-outline flex-1"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                 
                    <button
                        onClick={handleCheckout}
                        className="btn btn-primary flex-1"
                    >
                        Checkout →
                    </button>
                </div>
            </div>
        </div>
    )
}