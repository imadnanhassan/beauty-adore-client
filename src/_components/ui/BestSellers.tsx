"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BestSellerProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  soldCount: number;
}

export default function BestSellers() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const bestSellers: BestSellerProduct[] = [
    {
      id: 1,
      name: "Miracle Glow Serum",
      brand: "LuxeBeauty",
      price: 89.99,
      originalPrice: 119.99,
      rating: 4.9,
      reviews: 1247,
      image: "/placeholder.svg?height=400&width=400",
      soldCount: 2340,
    },
    {
      id: 2,
      name: "Perfect Coverage Foundation",
      brand: "FlawlessBase",
      price: 54.99,
      rating: 4.8,
      reviews: 892,
      image: "/placeholder.svg?height=400&width=400",
      soldCount: 1890,
    },
    {
      id: 3,
      name: "Hydra-Boost Moisturizer",
      brand: "AquaGlow",
      price: 67.99,
      originalPrice: 84.99,
      rating: 4.7,
      reviews: 756,
      image: "/placeholder.svg?height=400&width=400",
      soldCount: 1654,
    },
    {
      id: 4,
      name: "Velvet Matte Lipstick Set",
      brand: "ColorPop",
      price: 39.99,
      rating: 4.6,
      reviews: 634,
      image: "/placeholder.svg?height=400&width=400",
      soldCount: 1432,
    },
    {
      id: 5,
      name: "Brightening Eye Cream",
      brand: "YouthGlow",
      price: 72.99,
      originalPrice: 89.99,
      rating: 4.8,
      reviews: 523,
      image: "/placeholder.svg?height=400&width=400",
      soldCount: 1287,
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % bestSellers.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + bestSellers.length) % bestSellers.length
    );
  };

  const getVisibleProducts = () => {
    const products = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % bestSellers.length;
      products.push(bestSellers[index]);
    }
    return products;
  };

  return (
    <section className="main-container py-16 bg-white">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600">
            Our most loved products that customers can't get enough of
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {getVisibleProducts().map((product, index) => (
            <div
              key={`${product.id}-${currentIndex}-${index}`}
              className="group bg-gradient-to-br from-white to-pink-50/30 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02]"
            >
              {/* Bestseller Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  #{currentIndex + index + 1} BESTSELLER
                </div>
              </div>

              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50 p-8">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />

                {/* Sold Count */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-lg">
                  {product.soldCount.toLocaleString()} sold
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="mb-3">
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="font-bold text-xl text-gray-900 leading-tight group-hover:text-pink-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 ml-2 font-medium">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-2xl text-gray-900">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  {product.originalPrice && (
                    <span className="text-sm bg-red-100 text-red-600 px-3 py-1 rounded-full font-bold">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
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

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-6">
        {bestSellers.map((_, index) => (
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
    </section>
  );
}
