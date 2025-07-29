"use client";

import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  User,
  MessageSquare,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/redux/hook";

interface OrderItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    fullAddress: "",
    message: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [deliveryArea, setDeliveryArea] = useState("inside");
  const [transitionId, setTransitionId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart items if empty
  const orderItems: OrderItem[] =
    cartItems.length > 0
      ? cartItems
      : [
          {
            id: 1,
            name: "Hydrating Face Serum",
            brand: "GlowUp",
            price: 1200,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
            variant: "30ml",
          },
          {
            id: 2,
            name: "Matte Liquid Lipstick",
            brand: "VelvetLips",
            price: 800,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            variant: "Ruby Red",
          },
        ];

  // Calculations
  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = deliveryArea === "inside" ? 60 : 120;
  const total = subtotal + deliveryCharge;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!formData.fullName || !formData.phoneNumber || !formData.fullAddress) {
      alert("Please fill in all required fields");
      return;
    }

    if (
      (paymentMethod === "bkash" || paymentMethod === "nagad") &&
      !transitionId
    ) {
      alert("Please enter transition ID for mobile payment");
      return;
    }

    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/order-success");
    }, 3000);
  };

  const bkashNagadNumber = "01404503622";

  return (
    <div className="main-container py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/cart">
          <Button variant="ghost" className="mr-4 hover:bg-pink-50 rounded-xl">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Cart
          </Button>
        </Link>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-1">Complete your order</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            {/* Customer Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Customer Information
              </h2>

              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        handleInputChange("fullName", e.target.value)
                      }
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) =>
                        handleInputChange("phoneNumber", e.target.value)
                      }
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0"
                      placeholder="01XXXXXXXXX"
                      required
                    />
                  </div>
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Full Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      value={formData.fullAddress}
                      onChange={(e) =>
                        handleInputChange("fullAddress", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0 resize-none"
                      placeholder="House/Flat No, Road, Area, District"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                {/* Message (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-gray-400">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      className="w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0 resize-none"
                      placeholder="Any special instructions or notes"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Area */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Delivery Area
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setDeliveryArea("inside")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    deliveryArea === "inside"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">
                      Inside Dhaka
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Delivery Charge: ৳60
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      1-2 days delivery
                    </p>
                  </div>
                </div>
                <div
                  onClick={() => setDeliveryArea("outside")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    deliveryArea === "outside"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <h4 className="font-semibold text-gray-900">
                      Outside Dhaka
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Delivery Charge: ৳120
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      3-5 days delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="space-y-4">
                {/* Cash on Delivery */}
                <div
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === "cod"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-6 w-6 mr-3 text-gray-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Cash on Delivery
                      </h4>
                      <p className="text-sm text-gray-600">
                        Pay when you receive your order
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bkash */}
                <div
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === "bkash"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 bg-pink-600 rounded flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Bkash</h4>
                      <p className="text-sm text-gray-600">
                        Mobile payment via Bkash
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nagad */}
                <div
                  onClick={() => setPaymentMethod("nagad")}
                  className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 ${
                    paymentMethod === "nagad"
                      ? "border-pink-500 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center">
                    <div className="w-6 h-6 mr-3 bg-orange-600 rounded flex items-center justify-center">
                      <Smartphone className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Nagad</h4>
                      <p className="text-sm text-gray-600">
                        Mobile payment via Nagad
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Payment Instructions */}
              {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                <div className="mt-6 p-6 bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl border border-pink-200">
                  <h4 className="font-semibold text-gray-900 mb-3">
                    {paymentMethod === "bkash" ? "Bkash" : "Nagad"} Payment
                    Instructions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-sm text-gray-700">
                        Send Money to:
                      </span>
                      <span className="font-bold text-lg text-gray-900">
                        {bkashNagadNumber}
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <span className="text-sm text-gray-700">Amount:</span>
                      <span className="font-bold text-lg text-pink-600">
                        ৳{total}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      1. Send ৳{total} to {bkashNagadNumber} using{" "}
                      {paymentMethod === "bkash" ? "Bkash" : "Nagad"}
                    </p>
                    <p className="text-sm text-gray-600">
                      2. Enter the transaction ID below
                    </p>
                    <p className="text-sm text-gray-600">
                      3. Complete your order
                    </p>
                  </div>

                  {/* Transaction ID Input */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      value={transitionId}
                      onChange={(e) => setTransitionId(e.target.value)}
                      className="border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-0"
                      placeholder="Enter transaction ID"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Processing Order...
                </div>
              ) : (
                `Place Order - ৳${total}`
              )}
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                    />
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-600">{item.brand}</p>
                    {item.variant && (
                      <p className="text-xs text-gray-600">{item.variant}</p>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    ৳{(item.price * item.quantity).toFixed(0)}
                  </span>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>
                  Delivery Charge (
                  {deliveryArea === "inside" ? "Inside Dhaka" : "Outside Dhaka"}
                  )
                </span>
                <span>৳{deliveryCharge}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>৳{total.toFixed(0)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method Summary */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Payment Method:
                </span>
                <span className="text-sm text-gray-900 capitalize">
                  {paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : paymentMethod.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Delivery Area:
                </span>
                <span className="text-sm text-gray-900">
                  {deliveryArea === "inside" ? "Inside Dhaka" : "Outside Dhaka"}
                </span>
              </div>
            </div>

            {/* Security Features */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>Quality Products</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
