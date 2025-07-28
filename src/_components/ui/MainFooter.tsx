"use client";

import type React from "react";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Heart,
  CreditCard,
  Truck,
  Shield,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

export default function MainFooter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail("");
    }, 1500);
  };

  const footerLinks = {
    shop: [
      { name: "New Arrivals", href: "/shop?filter=new" },
      { name: "Best Sellers", href: "/shop?filter=bestsellers" },
      { name: "Sale", href: "/shop?filter=sale" },
      { name: "Skincare", href: "/category/skincare" },
      { name: "Makeup", href: "/category/makeup" },
      { name: "Hair Care", href: "/category/hair" },
      { name: "Fragrance", href: "/category/fragrance" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
    customer: [
      { name: "My Account", href: "/dashboard" },
      { name: "Order History", href: "/dashboard/orders" },
      { name: "Wishlist", href: "/wishlist" },
      { name: "Track Your Order", href: "/track-order" },
      { name: "Returns & Exchanges", href: "/returns" },
      { name: "Size Guide", href: "/size-guide" },
      { name: "Customer Reviews", href: "/reviews" },
      { name: "Loyalty Program", href: "/loyalty" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Sustainability", href: "/sustainability" },
      { name: "Affiliate Program", href: "/affiliate" },
      { name: "Wholesale", href: "/wholesale" },
      { name: "Store Locator", href: "/stores" },
      { name: "Contact Us", href: "/contact" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Shipping Info", href: "/shipping" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Security", href: "/security" },
      { name: "Sitemap", href: "/sitemap" },
    ],
  };

  const socialLinks = [
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/beautyadore",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/beautyadore",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/beautyadore",
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/beautyadore",
      color: "hover:text-red-600",
    },
  ];

  const paymentMethods = [
    "Visa",
    "Mastercard",
    "American Express",
    "PayPal",
    "Apple Pay",
    "Google Pay",
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-700">
        <div className="main-container py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Beautiful, Stay Updated
            </h2>
            <p className="text-pink-100 text-lg mb-8">
              Get exclusive offers, beauty tips, and be the first to know about
              new arrivals
            </p>

            {!isSubscribed ? (
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-0 bg-white/20 backdrop-blur-sm text-white placeholder-pink-200 focus:bg-white/30 focus:ring-2 focus:ring-white/50"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-pink-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center space-x-3 text-lg">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span>
                  Thank you for subscribing! Check your email for exclusive
                  offers.
                </span>
              </div>
            )}

            <p className="text-pink-200 text-sm mt-4">
              Join 50,000+ beauty lovers and get 15% off your first order
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="main-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Beauty Adore
              </h3>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted beauty destination for premium skincare, makeup, and
              wellness products. Discover your perfect beauty routine with us.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="h-4 w-4 text-pink-400" />
                <span className="text-sm">1-800-BEAUTY-1</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="h-4 w-4 text-pink-400" />
                <span className="text-sm">hello@beautyadore.com</span>
              </div>
              <div className="flex items-start space-x-3 text-gray-300">
                <MapPin className="h-4 w-4 text-pink-400 mt-0.5" />
                <span className="text-sm">
                  123 Beauty Street
                  <br />
                  New York, NY 10001
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-200 hover:bg-gray-700 ${social.color} hover:scale-110`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white duration-300 transition-all ease-in hover:translate-x-2 text-sm  transform inline-block "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {footerLinks.customer.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white duration-300 transition-all ease-in hover:translate-x-2 text-sm  transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white duration-300 transition-all ease-in hover:translate-x-2 text-sm transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-pink-400">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white duration-300 transition-all ease-in hover:translate-x-2 text-sm  transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-gray-800">
        <div className="main-container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Free Shipping</h5>
                <p className="text-gray-400 text-sm">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Secure Payment</h5>
                <p className="text-gray-400 text-sm">SSL encrypted checkout</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">30-Day Returns</h5>
                <p className="text-gray-400 text-sm">Easy return policy</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Flexible Payment</h5>
                <p className="text-gray-400 text-sm">
                  Multiple payment options
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="main-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2024 Beauty Adore. All rights reserved. | Made with{" "}
              <Heart className="h-4 w-4 inline text-pink-500" /> for beauty
              lovers
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">We accept:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="w-8 h-5 bg-white rounded text-xs flex items-center justify-center text-gray-800 font-semibold"
                  >
                    {method.slice(0, 4)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
