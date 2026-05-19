// src/components/CategoryFilter.tsx
"use client"
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

interface Category {
    _id: string
    name: string
}

export default function CategoryFilter({ categories }: { categories: Category[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentCategory = searchParams.get('category') || ''

    function handleCategory(categoryId: string) {
        const params = new URLSearchParams(searchParams.toString())
        if (categoryId) {
            params.set('category', categoryId)
        } else {
            params.delete('category')
        }
        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex gap-2 flex-wrap">
            <button
                className={`btn btn-sm ${currentCategory === '' ? 'btn-amber-500' : 'btn-outline'}`}
                onClick={() => handleCategory('')}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat._id}
                    className={`btn btn-sm ${currentCategory === cat._id ? 'btn bg-amber-500 text-white' : 'btn-outline'}`}
                    onClick={() => handleCategory(cat._id)}
                >
                    {cat.name}
                </button>
            ))}
        </div>
    )
}