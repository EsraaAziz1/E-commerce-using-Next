import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type CartItem = {
  _id: string
  name: string
  price: number
  image: string
  quantity: number
}

type CartStore = {
  items: CartItem[]
  addItem: (product: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find(i => i._id === product._id)
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i._id === product._id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(state => ({ items: [...state.items, { ...product, quantity: 1 }] }))
        }
      },

      removeItem: (id) =>
        set(state => ({ items: state.items.filter(i => i._id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set(state => ({
          items: state.items.map(i =>
            i._id === id ? { ...i, quantity } : i
          )
        }))
      },

      clearCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'cart-storage' } 
  )
)