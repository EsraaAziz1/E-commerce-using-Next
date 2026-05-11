"use client"

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = searchParams.get('rating') || 'all';

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('rating', filter);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className='flex gap-3 mb-4'>
      <button
        onClick={() => handleFilter('all')}
        className={
          activeFilter === 'all'
            ? 'btn btn-sm btn-primary'
            : 'btn btn-sm bg-amber-500 text-white'}>
        All
      </button>

      <button
        onClick={() => handleFilter('Lowest')}
        className={
          activeFilter === 'Lowest'
            ? 'btn btn-sm btn-primary'
            : 'btn btn-sm bg-amber-500 text-white'}>
        Lowest Rating
      </button>

      <button
        onClick={() => handleFilter('Average')}
        className={
          activeFilter === 'Average'
            ? 'btn btn-sm btn-primary'
            : 'btn btn-sm bg-amber-500 text-white'
        }>
        Average Rating
      </button>

      <button
        onClick={() => handleFilter('Highest')}
        className={
          activeFilter === 'Highest'
            ? 'btn btn-sm btn-primary'
            : 'btn btn-sm bg-amber-500 text-white'
        }>
        Highest Rating
      </button>
    </div>
  )
}
