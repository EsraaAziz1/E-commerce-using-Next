import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Filter from './filter';
import Search from './search';

interface props {
    filteredProducts: string,
    searchValue: string
}

export default async function ProductList({ filteredProducts, searchValue }: props) {

    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    const products = data.products;
    console.log(products);

    let filteredList = products;
    if (filteredProducts === 'Lowest') {
        filteredList = filteredList.filter((prod: any) => prod.rating >= 0 && prod.rating < 3);
    }
    if (filteredProducts === 'Average') {
        filteredList = filteredList.filter((prod: any) => prod.rating >= 3 && prod.rating < 4);
    }
    if (filteredProducts === 'Highest') {
        filteredList = filteredList.filter((prod: any) => prod.rating >= 4 && prod.rating <= 5);
    }
    if (searchValue) {
        filteredList = filteredList.filter((prod: any) =>
            prod.title.toLowerCase().includes(searchValue.toLowerCase())
        );
    }

    return (
        <div>
            <div className="flex justify-evenly ">
                <Filter />
                <Search />
            </div>

            <div className='grid grid-cols-4 gap-2 m-2'>
                {
                    filteredList.map((prod: any) => {
                        return (
                            <div className="card bg-base-100 w-75 ml-1 shadow-sm" key={prod.id}>
                                <Image
                                    src={prod.images[0]}
                                    width={150}
                                    height={150}
                                    alt={prod.title}
                                />
                                <div className="card-body">
                                    <h2 className="card-title">
                                        {prod.title}
                                    </h2>
                                    <p>{prod.description}</p>
                                    <p>price: {prod.price}</p>

                                    <div className="card-actions justify-end">
                                        <button className="btn btn-primary">
                                            Buy Now
                                        </button>
                                        <Link href={`/products/${prod.id}`} className="btn btn-success">
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
