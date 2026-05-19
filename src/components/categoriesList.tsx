async function getCategories() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/category`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.categories;
}

export default async function CategoriesList() {
  const categories = await getCategories();

  if (!categories?.length) {
    return <p className="text-gray-500">No categories found.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((cat: any) => (
        <a
          key={cat._id}
          href={`/products?category=${cat._id}`}
          className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center hover:bg-blue-50 transition"
        >
          {cat.image && (
            <img src={cat.image} alt={cat.name} className="w-12 h-12 mx-auto mb-3 object-cover" />
          )}
          <p className="font-medium text-gray-800 dark:text-white">{cat.name}</p>
        </a>
      ))}
    </div>
  );
}