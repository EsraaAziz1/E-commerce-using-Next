import React from 'react'
import Link from 'next/link'

export default function Category2() {
  return (
    <div>
      Category2
      <br />
      <Link href="/categories" className="text-blue-500 hover:underline">
        Back to Categories
      </Link>
    </div>
  )
}
