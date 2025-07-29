

import { useState } from "react";
import {
  User,
  Package,
  Heart,
  Settings,
  MapPin,
  CreditCard,
  Bell,
  LogOut,
  ShoppingBag,
  Star,
  Truck,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalOrders: number;
  wishlistItems: number;
  rewardPoints: number;
  totalSpent: number;
}

interface RecentOrder {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: number;
  image: string;
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats: DashboardStats = {
    totalOrders: 12,
    wishlistItems: 8,
    rewardPoints: 1250,
    totalSpent: 847.5,
  };

  const recentOrders: RecentOrder[] = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 89.97,
      items: 3,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 124.99,
      items: 2,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: "ORD-2024-003",
      date: "2024-01-08",
      status: "processing",
      total: 67.5,
      items: 1,
      image: "/placeholder.svg?height=60&width=60",
    },
  ];

  const menuItems = [
    { id: "overview", label: "Overview", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "wishlist", label: "Wishlist", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payment", label: "Payment Methods", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "settings", label: "Account Settings", icon: Settings },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "processing":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <div className="main-container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-4">
            {/* User Profile */}
            <div className="text-center mb-6 pb-6 border-b border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Sarah Johnson</h2>
              <p className="text-gray-600">sarah.johnson@email.com</p>
              <div className="mt-3">
                <span className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  <Star className="h-4 w-4 mr-1" />
                  VIP Member
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout Button */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, Sarah! 👋
                </h1>
                <p className="text-pink-100 text-lg">
                  You have {stats.rewardPoints} reward points ready to use on
                  your next purchase.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Total Orders
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.totalOrders}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Wishlist Items
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.wishlistItems}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                      <Heart className="h-6 w-6 text-pink-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Reward Points
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stats.rewardPoints}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">
                        Total Spent
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        ${stats.totalSpent}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <ShoppingBag className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Recent Orders
                  </h2>
                  <Link to="/dashboard/orders">
                    <Button
                      variant="ghost"
                      className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                    >
                      View All Orders →
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-pink-200 hover:bg-pink-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={order.image || "/placeholder.svg"}
                          alt="Order"
                          className="w-12 h-12 object-cover rounded-lg border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {order.id}
                          </p>
                          <p className="text-sm text-gray-600">
                            {new Date(order.date).toLocaleDateString()} •{" "}
                            {order.items} items
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            ${order.total}
                          </p>
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/wishlist">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                    >
                      <Heart className="h-6 w-6 text-pink-600" />
                      <span>View Wishlist</span>
                    </Button>
                  </Link>
                  <Link to="/shop">
                    <Button
                      variant="outline"
                      className="w-full h-20 flex-col space-y-2 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                    >
                      <ShoppingBag className="h-6 w-6 text-purple-600" />
                      <span>Continue Shopping</span>
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab("settings")}
                    className="w-full h-20 flex-col space-y-2 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                  >
                    <Settings className="h-6 w-6 text-indigo-600" />
                    <span>Account Settings</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab !== "overview" && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {menuItems.find((item) => item.id === activeTab)?.label}
              </h2>
              <p className="text-gray-600 mb-6">
                This section is under development.
              </p>
              <Button
                onClick={() => setActiveTab("overview")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
              >
                Back to Overview
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
