"use client"
import { useEffect, useState } from "react"
import { Package, CalendarDays, ShoppingBag } from "lucide-react"

export default function OrderHistory() {
    const [orders, setOrders] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/orders")
            .then(r => r.json())
            .then(data => {
                setOrders(data.orders ?? [])
                setLoading(false)
            })
    }, [])

    if (loading) return (
        <div className="text-center p-8 text-amber-500 animate-pulse font-medium">
            Loading orders...
        </div>
    )

    if (orders.length === 0) return (
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-8 text-center text-gray-400 flex flex-col items-center gap-2">
            <Package size={40} className="text-amber-300" />
            <p>No orders yet</p>
        </div>
    )

    return (
        <div className="bg-white rounded-2xl border border-amber-100 shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <ShoppingBag size={20} className="text-amber-500" />
                Order History
            </h2>
            <div className="flex flex-col gap-4">
                {orders.map((order: any) => (
                    <div key={order._id} className="border border-amber-100 rounded-xl p-4 hover:shadow-sm transition">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-400 flex items-center gap-1">
                                <CalendarDays size={14} />
                                {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                order.status === "pending" ? "bg-yellow-50 text-yellow-500" :
                                order.status === "delivered" ? "bg-green-50 text-green-500" :
                                "bg-blue-50 text-blue-500"
                            }`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            {order.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between text-sm text-gray-600">
                                    <span>{item.product?.name} x{item.quantity}</span>
                                    <span className="text-amber-500 font-medium">${item.price}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-3 pt-3 border-t border-amber-100 font-bold text-gray-800">
                            Total: <span className="text-amber-500 ml-1">${order.total}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}