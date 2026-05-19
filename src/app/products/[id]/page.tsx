import { connectDB } from '@/lib/mongodb'
import { Product } from '@/models/Product'
import { Category } from '@/models/Category'
import Image from 'next/image'
import AddToCartButton from '@/components/AddToCartButton'

interface props {
    params: Promise<{ id: string }>
}

export default async function ProductDetails({ params }: props) {
    const { id } = await params;
    
    await connectDB();
    
    const product = await Product.findById(id).lean() as any;

    if (!product) {
        return (
            <div className="p-8 text-center text-gray-400 text-lg">
                No product found
            </div>
        );
    }

    const category = await Category.findById(product.category).lean() as any;

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="bg-white rounded-2xl border border-amber-100 shadow-md hover:shadow-amber-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* الصورة */}
                    <div className="relative w-full h-96 bg-amber-50">
                        {product.images?.[0] ? (
                            <Image
                                src={product.images[0]}
                                fill
                                className="object-cover"
                                alt={product.name}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>

                    {/* التفاصيل */}
                    <div className="flex flex-col gap-5 p-8">
                        
                        {/* الكاتيجوري */}
                        {category?.name && (
                            <span className="text-xs font-semibold text-amber-500 bg-amber-50 px-3 py-1 rounded-full w-fit">
                                {category.name}
                            </span>
                        )}

                        <h1 className="text-3xl font-bold text-gray-800">
                            {product.name}
                        </h1>

                        <p className="text-gray-500 leading-relaxed">
                            {product.description}
                        </p>

                        <p className="text-3xl font-bold text-amber-500">
                            ${product.price}
                        </p>

                        <div className="mt-auto pt-4 border-t border-amber-100">
                            <AddToCartButton product={{
                                _id: String(product._id),
                                name: product.name,
                                price: product.price,
                                images: product.images,
                            }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}