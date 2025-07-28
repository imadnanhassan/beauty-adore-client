
import { useState } from "react";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  Tag,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { applyPromoCode, removeFromCart, removePromoCode, updateQuantity } from "@/redux/slices/cartSlice";
import { pushToDataLayer, trackBeginCheckout, trackRemoveFromCart } from "@/utils/analytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default function CartPage() {

  const dispatch = useAppDispatch();
  const {
    items: cartItems,
    total,
    subtotal,
    shipping,
    tax,
    promoCode,
    promoDiscount,
  } = useAppSelector((state) => state.cart);

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateItemQuantity = (
    id: number,
    variant: string | undefined,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ id, variant, quantity: newQuantity }));
  };

  const removeItem = (id: number, variant: string | undefined) => {
    const item = cartItems.find(
      (item) => item.id === id && item.variant === variant
    );
    if (item) {
      dispatch(removeFromCart({ id, variant }));

      // Track analytics
      trackRemoveFromCart(
        {
          id: item.id,
          name: item.name,
          category: "beauty", // You might want to add category to cart items
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
        },
        item.price * item.quantity
      );
    }
  };

  const handleApplyPromoCode = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCodeInput.toLowerCase() === "save10") {
        dispatch(applyPromoCode({ code: promoCodeInput, discount: 10 }));
        setPromoCodeInput("");

        // Track promo code usage
        pushToDataLayer("promo_code_applied", {
          promo_code: promoCodeInput,
          discount_amount: 10,
          cart_value: subtotal,
        });
      } else if (promoCodeInput.toLowerCase() === "welcome20") {
        dispatch(applyPromoCode({ code: promoCodeInput, discount: 20 }));
        setPromoCodeInput("");

        pushToDataLayer("promo_code_applied", {
          promo_code: promoCodeInput,
          discount_amount: 20,
          cart_value: subtotal,
        });
      } else {
        alert("Invalid promo code");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleRemovePromoCode = () => {
    dispatch(removePromoCode());

    pushToDataLayer("promo_code_removed", {
      promo_code: promoCode,
      cart_value: subtotal,
    });
  };

  const handleCheckout = () => {
    // Track begin checkout
    trackBeginCheckout(
      cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        category: "beauty",
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
      })),
      total
    );
  };

  const inStockItems = cartItems.filter((item) => item.inStock);
  const outOfStockItems = cartItems.filter((item) => !item.inStock);

  if (cartItems.length === 0) {
    return (
      <div className="main-container py-8">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>
          <Link to="/shop">
            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/shop">
          <Button variant="ghost" className="mr-4 hover:bg-pink-50 rounded-xl">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {cartItems.length} items in your cart
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* In Stock Items */}
          {inStockItems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Items
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {inStockItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            item.image ||
                            "/placeholder.svg?height=150&width=150"
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl border border-gray-200"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                              {item.brand}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                              {item.name}
                            </h3>
                            {item.variant && (
                              <p className="text-sm text-gray-600 mt-1">
                                Variant: {item.variant}
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateItemQuantity(
                                  item.id,
                                  item.variant,
                                  item.quantity - 1
                                )
                              }
                              className="w-8 h-8 p-0 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-lg font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateItemQuantity(
                                  item.id,
                                  item.variant,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 p-0 rounded-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="flex justify-end mt-2">
                          <span className="text-lg font-bold text-pink-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Out of Stock Items */}
          {outOfStockItems.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden opacity-75">
              <div className="p-6 border-b border-gray-100 bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-900">
                  Out of Stock Items
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  These items are currently unavailable
                </p>
              </div>
              <div className="divide-y divide-gray-100">
                {outOfStockItems.map((item) => (
                  <div
                    key={`${item.id}-${item.variant}`}
                    className="p-6 bg-gray-50"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 relative">
                        <img
                          src={
                            item.image ||
                            "/placeholder.svg?height=150&width=150"
                          }
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-xl border border-gray-200 grayscale"
                        />
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center">
                          <span className="text-xs font-semibold text-white bg-red-500 px-2 py-1 rounded">
                            Out of Stock
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm text-gray-400 font-medium uppercase tracking-wide">
                              {item.brand}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-600 leading-tight">
                              {item.name}
                            </h3>
                            {item.variant && (
                              <p className="text-sm text-gray-500 mt-1">
                                Variant: {item.variant}
                              </p>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-500">
                              ${item.price}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>
                          <span className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              {promoCode ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                  <div className="flex items-center">
                    <Tag className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-700">
                      {promoCode}
                    </span>
                    <span className="text-sm text-green-600 ml-2">
                      (-{promoDiscount}%)
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemovePromoCode}
                    className="text-green-600 hover:text-green-700 hover:bg-green-100 p-1 rounded-full"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    className="flex-1 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0"
                  />
                  <Button
                    onClick={handleApplyPromoCode}
                    disabled={!promoCodeInput || isLoading}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl disabled:opacity-50"
                  >
                    {isLoading ? "..." : "Apply"}
                  </Button>
                </div>
              )}
            </div>

            {/* Order Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({inStockItems.length} items)</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {promoCode && promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount ({promoDiscount}%)</span>
                  <span>-${((subtotal * promoDiscount) / 100).toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  <span>Shipping</span>
                </div>
                <span>
                  {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              {shipping === 0 && (
                <p className="text-xs text-green-600">
                  🎉 You qualify for free shipping!
                </p>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link to="/checkout" onClick={handleCheckout}>
              <Button
                disabled={inStockItems.length === 0}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg font-semibold"
              >
                Proceed to Checkout
              </Button>
            </Link>

            {/* Security Badge */}
            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                🔒 Secure checkout with SSL encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
