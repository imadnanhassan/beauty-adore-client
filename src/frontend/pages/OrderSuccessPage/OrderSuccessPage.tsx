

import { useEffect, useState } from "react";
import {
  CheckCircle,
  Package,
  Truck,
  Mail,
  Download,
  ArrowRight,
  Home,
  ShoppingBag,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { trackPurchase } from "@/utils/analytics";

interface OrderItem {
  id: number;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  paymentMethod: string;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  items: OrderItem[];
}

export default function OrderSuccessPage() {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching order details
    const fetchOrderDetails = () => {
      // In a real app, you'd get this from URL params or API
      const mockOrderDetails: OrderDetails = {
        orderNumber: `ORD-${Date.now()}`,
        orderDate: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        estimatedDelivery: new Date(
          Date.now() + 5 * 24 * 60 * 60 * 1000
        ).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        total: 116.97,
        subtotal: 116.97,
        tax: 9.36,
        shipping: 0,
        paymentMethod: "Credit Card ending in 4242",
        shippingAddress: {
          name: "John Doe",
          address: "123 Main Street",
          city: "New York",
          state: "NY",
          zipCode: "10001",
          country: "United States",
        },
        items: [
          {
            id: 1,
            name: "Hydrating Face Serum",
            brand: "GlowUp",
            price: 45.99,
            quantity: 2,
            image: "/placeholder.svg?height=80&width=80",
            variant: "30ml",
          },
          {
            id: 2,
            name: "Matte Liquid Lipstick",
            brand: "VelvetLips",
            price: 24.99,
            quantity: 1,
            image: "/placeholder.svg?height=80&width=80",
            variant: "Ruby Red",
          },
        ],
      };

      // Track purchase for analytics
      trackPurchase(
        mockOrderDetails.orderNumber,
        mockOrderDetails.total,
        mockOrderDetails.items
      );

      setOrderDetails(mockOrderDetails);
      setIsLoading(false);
    };

    const timer = setTimeout(fetchOrderDetails, 1000);
    return () => clearTimeout(timer);
  }, []);

  const downloadReceipt = () => {
    if (!orderDetails) return;

    // Create a simple receipt text
    const receiptContent = `
ORDER RECEIPT
=============

Order Number: ${orderDetails.orderNumber}
Order Date: ${orderDetails.orderDate}
Estimated Delivery: ${orderDetails.estimatedDelivery}

ITEMS:
${orderDetails.items
  .map(
    (item) =>
      `${item.name} (${item.brand}) - ${item.variant || ""} x${
        item.quantity
      } - $${(item.price * item.quantity).toFixed(2)}`
  )
  .join("\n")}

SUMMARY:
Subtotal: $${orderDetails.subtotal.toFixed(2)}
Tax: $${orderDetails.tax.toFixed(2)}
Shipping: ${
      orderDetails.shipping === 0
        ? "FREE"
        : "$" + orderDetails.shipping.toFixed(2)
    }
Total: $${orderDetails.total.toFixed(2)}

SHIPPING ADDRESS:
${orderDetails.shippingAddress.name}
${orderDetails.shippingAddress.address}
${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.state} ${
      orderDetails.shippingAddress.zipCode
    }
${orderDetails.shippingAddress.country}

Payment Method: ${orderDetails.paymentMethod}

Thank you for your purchase!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${orderDetails.orderNumber}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="main-container py-16">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Processing your order...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="main-container py-16">
        <div className="text-center">
          <p className="text-red-600">Error loading order details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Order Confirmed!
        </h1>
        <p className="text-xl text-gray-600 mb-2">
          Thank you for your purchase
        </p>
        <p className="text-gray-500">
          Order #{orderDetails.orderNumber} • Placed on {orderDetails.orderDate}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status Timeline */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Status
            </h2>
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">
                  Order Placed
                </span>
                <span className="text-xs text-gray-500 mt-1">Just now</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4">
                <div className="h-full bg-green-500 w-1/3"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Package className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Processing
                </span>
                <span className="text-xs text-gray-500 mt-1">1-2 days</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Truck className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Shipped
                </span>
                <span className="text-xs text-gray-500 mt-1">3-4 days</span>
              </div>
              <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                  <Home className="h-6 w-6 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  Delivered
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  {orderDetails.estimatedDelivery}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Items
            </h2>
            <div className="space-y-4">
              {orderDetails.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                    {item.variant && (
                      <p className="text-sm text-gray-600">{item.variant}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Delivery Address
                </h3>
                <div className="text-gray-700 space-y-1">
                  <p className="font-medium">
                    {orderDetails.shippingAddress.name}
                  </p>
                  <p>{orderDetails.shippingAddress.address}</p>
                  <p>
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zipCode}
                  </p>
                  <p>{orderDetails.shippingAddress.country}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  Estimated Delivery
                </h3>
                <div className="flex items-center text-gray-700 mb-2">
                  <Truck className="h-5 w-5 mr-2 text-pink-600" />
                  <span className="font-medium">
                    {orderDetails.estimatedDelivery}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  We'll send you tracking information via email once your order
                  ships.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary & Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${orderDetails.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 font-medium">FREE</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${orderDetails.tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">Payment Method</h3>
              <p className="text-gray-600">{orderDetails.paymentMethod}</p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={downloadReceipt}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>

              <Link to="/orders" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-xl bg-transparent"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Track Your Order
                </Button>
              </Link>

              <Link to="/shop" className="block">
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-xl bg-transparent"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>

          {/* Email Confirmation */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                <Mail className="h-5 w-5 text-pink-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Email Confirmation
                </h3>
                <p className="text-sm text-gray-600">Check your inbox</p>
              </div>
            </div>
            <p className="text-sm text-gray-700">
              We've sent a confirmation email with your order details and
              tracking information.
            </p>
          </div>

          {/* Customer Support */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Our customer support team is here to help with any questions about
              your order.
            </p>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                support@beautystore.com
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> 1-800-BEAUTY-1
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Hours:</span> Mon-Fri 9AM-6PM EST
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            You Might Also Like
          </h2>
          <p className="text-gray-600">
            Discover more products from our collection
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 hover:shadow-xl transition-all duration-300"
            >
              <img
                src={`/placeholder.svg?height=200&width=200&text=Product${i}`}
                alt={`Recommended Product ${i}`}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="font-semibold text-gray-900 mb-2">
                Recommended Product {i}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                Perfect for your beauty routine
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-pink-600">
                  ${(29.99 + i * 5).toFixed(2)}
                </span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg"
                >
                  Add to Cart
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
