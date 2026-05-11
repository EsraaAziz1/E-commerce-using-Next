'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const pages = [
    { path: '/', name: 'Home' },
    { path: '/products', name: 'Products' },
    { path: '/categories', name: 'Categories' },
];
export default function NavLinks() {
    const pathName = usePathname();
    return (
       

        <ul className='flex gap-4'>
            {pages.map(({path,name})=>(
                <li key={path}>    
                  <Link href={path} className={pathName===path?'text-yellow-500':'text-gray-500'}>
                    {name}
                  </Link>
                </li>
            ))}    
        </ul>

    )
}
