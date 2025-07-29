

import { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  trackAddToCart,
  trackAddToWishlist,
  trackViewItem,
} from "@/utils/analytics";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { addToCart } from "@/redux/slices/cartSlice";
import { toggleWishlist } from "@/redux/slices/wishlistSlice";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: string[];
  badge?: string;
  category: string;
  inStock: boolean;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export default function ProductCard({
  product,
  showQuickAdd = true,
}: ProductCardProps) {
  const dispatch = useAppDispatch();
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

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

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product: {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image,
          inStock: product.inStock,
        },
        quantity,
      })
    );

    // Track analytics
    trackAddToCart(
      {
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
        quantity: quantity,
      },
      product.price * quantity
    );
  };

  const handleToggleWishlist = () => {
    dispatch(
      toggleWishlist({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        badge: product.badge,
        category: product.category,
        inStock: product.inStock,
      })
    );

    // Track analytics
    if (!isWishlisted) {
      trackAddToWishlist({
        id: product.id,
        name: product.name,
        category: product.category,
        brand: product.brand,
        price: product.price,
      });
    }
  };

  const handleViewProduct = () => {
    // Track product view
    trackViewItem({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
    });
  };

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Link to={`/product/${product.id}`} onClick={handleViewProduct}>
          <img
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${getBadgeColor(
              product.badge
            )} shadow-lg z-10`}
          >
            {product.badge}
          </div>
        )}

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            variant="ghost"
            className={`w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg transition-all duration-200 ${
              isWishlisted ? "text-pink-500" : "text-gray-600"
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart
              className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`}
            />
          </Button>
          <Link to={`/product/${product.id}`} onClick={handleViewProduct}>
            <Button
              size="sm"
              variant="ghost"
              className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white text-gray-600 shadow-lg transition-all duration-200"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Quick Add to Cart */}
        {showQuickAdd && product.inStock && (
          <div
            className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-2"
            }`}
          >
            <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm rounded-xl p-2 shadow-lg">
              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 hover:bg-gray-100"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">
                  {quantity}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-6 h-6 p-0 hover:bg-gray-100"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                size="sm"
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs py-1 px-2 rounded-lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.brand}
          </p>
          <Link to={`/product/${product.id}`} onClick={handleViewProduct}>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2 group-hover:text-pink-600 transition-colors duration-200">
              {product.name}
            </h3>
          </Link>
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
            <span className="font-bold text-gray-900">${product.price}</span>
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

        {/* Add to Cart Button - Mobile */}
        {!showQuickAdd && product.inStock && (
          <Button
            className="w-full mt-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
}
