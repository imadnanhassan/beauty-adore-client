
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Brand {
  id: number;
  name: string;
  logo: string;
  description: string;
  productCount: number;
  isPopular?: boolean;
}

export default function BrandShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const brands: Brand[] = [
    {
      id: 1,
      name: "GlowUp",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Premium skincare for radiant skin",
      productCount: 45,
      isPopular: true,
    },
    {
      id: 2,
      name: "VelvetLips",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Luxury lip care and color",
      productCount: 32,
    },
    {
      id: 3,
      name: "YouthGlow",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Anti-aging solutions that work",
      productCount: 28,
      isPopular: true,
    },
    {
      id: 4,
      name: "RadiantSkin",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Natural ingredients, visible results",
      productCount: 38,
    },
    {
      id: 5,
      name: "FlawlessBase",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Perfect coverage for every skin tone",
      productCount: 24,
    },
    {
      id: 6,
      name: "SilkyStrands",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Professional hair care at home",
      productCount: 19,
    },
    {
      id: 7,
      name: "AquaGlow",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Deep hydration for all skin types",
      productCount: 31,
      isPopular: true,
    },
    {
      id: 8,
      name: "ColorPop",
      logo: "https://shop.shajgoj.com/_next/image?url=https%3A%2F%2Fbk.shajgoj.com%2Fstorage%2F2022%2F06%2F19%2Fimage_part_001.jpg&w=1920&q=75",
      description: "Bold colors, endless possibilities",
      productCount: 56,
    },
  ];

  const brandsPerPage = 4;
  const totalPages = Math.ceil(brands.length / brandsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentBrands = () => {
    const startIndex = currentIndex * brandsPerPage;
    return brands.slice(startIndex, startIndex + brandsPerPage);
  };

  return (
    <section className="main-container ">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Brands
          </h2>
          <p className="text-lg text-gray-600">
            Discover premium beauty brands trusted by millions worldwide
          </p>
        </div>

        <div className="hidden md:flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          {getCurrentBrands().map((brand) => (
            <div
              key={brand.id}
              className="group  rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 transform  cursor-pointer"
            >
              {/* Popular Badge */}
              {brand.isPopular && (
                <div className="absolute top-7 right-4 z-10">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                    POPULAR
                  </div>
                </div>
              )}

              {/* Brand Logo Container */}
              <div className="relative p-8 bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center min-h-[120px]">
                <img
                  src={brand.logo || "/placeholder.svg"}
                  alt={`${brand.name} logo`}
                  className="max-w-full max-h-16 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Brand Info */}
              <div className="p-6">
                <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-pink-600 transition-colors duration-200">
                  {brand.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {brand.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {brand.productCount} products
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-pink-600 hover:text-pink-700 hover:bg-pink-50 font-medium"
                  >
                    Shop Now →
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="flex md:hidden justify-center space-x-2 mt-8">
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? "bg-pink-500 w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {/* All Brands CTA */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          variant="outline"
          className="border-2 border-pink-200 text-pink-600 hover:bg-pink-50 hover:border-pink-300 px-8 py-3 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 bg-transparent"
        >
          View All Brands
        </Button>
      </div>
    </section>
  );
}
