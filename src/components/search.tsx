"use client"
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation';


export default function Search() {

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query') || '';

  function handleSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('query', value);
    router.push(`${pathname}?${params.toString()}`);
  }
  
  return (
    <input
      type="search"
      placeholder="Search.."
      onChange={(e) => handleSearch(e.target.value)}
      value={searchQuery}
      className="input input-bordered w-64 lg:w-auto"
    />
  )
}
