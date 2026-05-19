import CartItems from "@/components/cartItems"

export default function CartPage() {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
            <CartItems />
        </div>
    )
}