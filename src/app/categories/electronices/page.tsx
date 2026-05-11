import React from 'react'
import Link from 'next/link';

export default function Electronics() {
    return (
        <div>
            Electronics
            <br />
            <Link href="/categories" className="text-blue-500 hover:underline">
                Back to Categories
            </Link>
        </div>
    )
}
