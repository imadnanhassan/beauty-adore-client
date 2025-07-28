export default function ProductCategoryCard() {
  const categories = [
    {
      title: "SKIN",
      productCount: 24,
      image:
        "https://beautyadore.xyz/wp-content/uploads/2025/03/Untitled-design-2.png",
      href: "/skin",
    },
    {
      title: "PERSONAL CARE",
      productCount: 18,
      image:
        "https://beautyadore.xyz/wp-content/uploads/2025/03/Untitled-design-3.png",
      href: "/personal-care",
    },
    {
      title: "MAKEUP",
      productCount: 42,
      image:
        "https://beautyadore.xyz/wp-content/uploads/2025/03/Untitled-design-1.png",
      href: "/makeup",
    },
    {
      title: "HAIR",
      productCount: 15,
      image:
        "https://beautyadore.xyz/wp-content/uploads/2025/03/Untitled-design.png",
      href: "/hair",
    },
  ];

  return (
    <div className="main-container w-full py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden"
          >
            <div className="aspect-[3/4] relative">
              <img
                src={category.image || "/placeholder.svg"}
                alt={category.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105 w-full"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider mb-2 transition-all duration-300">
                  {category.title}
                </h2>
                <div className="transition-all duration-300">
                  <p className="text-md md:text-md font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 absolute inset-x-0">
                    {category.productCount} Products
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
