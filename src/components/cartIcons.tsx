
"use client"
import { useCartStore } from '@/store/cartstore'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'


export default function CartIcon() {
    const items = useCartStore(state => state.items)
    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <Link href="/cart" className="btn btn-ghost btn-sm relative">
            <ShoppingCart />
            {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                </span>
            )}
        </Link>
    )
}