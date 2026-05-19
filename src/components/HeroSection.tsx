import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-amber-50 py-16 px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        
     
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-bold text-amber-500 mb-4 leading-tight">
            Welcome to <br /> E-Commerce
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            Discover the best products at the best prices
          </p>
          <a
            href="/products"
            className="bg-amber-500 text-white font-semibold px-8 py-3 rounded-xl hover:bg-amber-600 transition"
          >
            Shop Now →
          </a>
        </div>

    
        <div className="flex-1 flex justify-center">
          <Image
            src="/E-commerce.png"
            alt="E-Commerce Hero"
            width={500}
            height={500}
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>

      </div>
    </div>
  );
}