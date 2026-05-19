import Link from 'next/link';
import Image from 'next/image';
import Search from './search';
import BuyNowButton from './BuyNowButton'
import TextExpander from './TextExpander';
import CategoryFilter from './categoryFilter';

interface props {
    searchValue: string,
    categoryValue?: string  
}

export default async function ProductList({ searchValue, categoryValue }: props) {

    const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/products`, { cache: "no-store" }),
        fetch(`${process.env.NEXTAUTH_URL}/api/category`, { cache: "no-store" }),
    ])

    const data = await productsRes.json()
    const categoriesData = await categoriesRes.json()
    const products = data.products
    const categories = categoriesData.categories ?? []

    if (!products?.length) {
        return <p className="text-gray-400">No Products found.</p>
    }

    let filteredList = products

    if (searchValue) {
        filteredList = filteredList.filter((prod: any) =>
            prod.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    }

    if (categoryValue) {
        filteredList = filteredList.filter((prod: any) =>
            prod.category?._id === categoryValue || prod.category === categoryValue
        )
    }

    return (
        <div className="m-3">
            <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between gap-4 px-2">
                    <CategoryFilter categories={categories} />
                    <Search />
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-2'>
                {filteredList.map((prod: any) => (
                    <div
                        key={prod._id}
                        className="bg-white rounded-2xl border border-amber-100 shadow-md hover:shadow-amber-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                    >
                       
                        <div className="relative w-full h-52">
                            <Image
                                src={prod.images?.[0] ?? '/file.svg'}
                                alt={prod.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                   
                        <div className="p-4 flex flex-col gap-2">
                            <h2 className="font-bold text-gray-800 text-lg">{prod.name}</h2>
                            <TextExpander>{prod.description}</TextExpander>
                            <p className="text-amber-500 font-bold text-base">${prod.price}</p>

                            <div className="flex gap-2 mt-2">
                                <BuyNowButton product={{
                                    _id: prod._id,
                                    name: prod.name,
                                    price: prod.price,
                                    images: prod.images,
                                }} />
                                <Link
                                    href={`/products/${prod._id}`}
                                    className="flex-1 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-xl transition duration-200"
                                >
                                    Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}