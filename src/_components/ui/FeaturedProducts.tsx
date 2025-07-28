
import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isWishlisted?: boolean;
}

export default function FeaturedProducts() {
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);

  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Hydrating Face Serum",
      brand: "GlowUp",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "BESTSELLER",
    },
    {
      id: 2,
      name: "Matte Liquid Lipstick",
      brand: "VelvetLips",
      price: 24.99,
      rating: 4.6,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      badge: "NEW",
    },
    {
      id: 3,
      name: "Anti-Aging Night Cream",
      brand: "YouthGlow",
      price: 78.99,
      originalPrice: 95.99,
      rating: 4.9,
      reviews: 456,
      image: "/placeholder.svg?height=300&width=300",
      badge: "SALE",
    },
    {
      id: 4,
      name: "Vitamin C Brightening Mask",
      brand: "RadiantSkin",
      price: 32.99,
      rating: 4.7,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Long-Wear Foundation",
      brand: "FlawlessBase",
      price: 42.99,
      originalPrice: 52.99,
      rating: 4.5,
      reviews: 298,
      image: "/placeholder.svg?height=300&width=300",
      badge: "TRENDING",
    },
    {
      id: 6,
      name: "Nourishing Hair Oil",
      brand: "SilkyStrands",
      price: 28.99,
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
    },
  ];

  const toggleWishlist = (productId: number) => {
    setWishlistedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "BESTSELLER":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "NEW":
        return "bg-gradient-to-r from-green-400 to-emerald-500";
      case "SALE":
        return "bg-gradient-to-r from-red-400 to-pink-500";
      case "TRENDING":
        return "bg-gradient-to-r from-purple-400 to-indigo-500";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500";
    }
  };

  return (
    <section className="main-container py-16 bg-gradient-to-b from-white to-pink-50/30">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Featured Products
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of premium beauty products that our
          customers love most
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200"
          >
            {/* Product Image Container */}
            <div className="relative aspect-square overflow-hidden bg-gray-50">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Badge */}
              {product.badge && (
                <div
                  className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(
                    product.badge
                  )} shadow-lg`}
                >
                  {product.badge}
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  variant="ghost"
                  className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 ${
                    wishlistedItems.includes(product.id)
                      ? "text-pink-500"
                      : "text-gray-600"
                  }`}
                  onClick={() => toggleWishlist(product.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      wishlistedItems.includes(product.id) ? "fill-current" : ""
                    }`}
                  />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 shadow-lg transition-all duration-200"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Add to Cart */}
              <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="mb-2">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {product.brand}
                </p>
                <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
                  {product.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500 ml-1">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                {product.originalPrice && (
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Button
          size="lg"
          className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          View All Products
        </Button>
      </div>
    </section>
  );
}
