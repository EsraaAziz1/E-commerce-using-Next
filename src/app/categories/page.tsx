import Link from 'next/link'
import React from 'react'

export default function Categories() {
  return (
    <div>
        Categories
        <br />
        <Link href="/categories/electronices" className="text-blue-500 hover:underline">
          Electronices
        </Link>
        <br />
        <Link href="/categories/category2" className="text-blue-500 hover:underline">
          Category2
        </Link>
    </div>
  )
}
