import Image from 'next/image'

interface props {
    params: Promise<{ id: string }>
}

export const generateMetadata = async ({ params }: props) => {
    const resolvedParams = await params;
    const res = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`); 
    const product = await res.json();
    return {
        title: product.title,
        description: product.description
    }
};

export const revalidate = 20;

export default async function ProductDetails({params}: props) {
    const resolvedParams = await params;
    const res = await fetch(`https://dummyjson.com/products/${resolvedParams.id}`);
    const product = await res.json();

    if (!product || !product.images?.length) {
        return <div>No product found</div>;
    }

    // console.log(product.images[0]);
    return (
        <div className="card bg-base-100 w-80 shadow-sm m-2">
            <h1>{product.title}</h1>
            <Image
                src={product.images[0]}
                width={500}
                height={500}
                alt={product.title}
            />
            <p>{product.description}</p>
        </div>
    );
}
