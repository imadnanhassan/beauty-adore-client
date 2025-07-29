"use client";

import { useState, useEffect } from "react";
import { Search, Grid, List, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductFilters from "@/_components/ui/ProductFilters";
import ProductCard from "@/_components/ui/ProductCard";


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
  category: string;
  inStock: boolean;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>(
    {}
  );
  const [wishlistedItems, setWishlistedItems] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const productsPerPage = 12;

  // Mock products data
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Hydrating Face Serum with Hyaluronic Acid",
      brand: "GlowUp",
      price: 45.99,
      originalPrice: 59.99,
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=300&width=300",
      badge: "BESTSELLER",
      category: "skincare",
      inStock: true,
    },
    {
      id: 2,
      name: "Matte Liquid Lipstick - Ruby Red",
      brand: "VelvetLips",
      price: 24.99,
      rating: 4.6,
      reviews: 189,
      image: "/placeholder.svg?height=300&width=300",
      badge: "NEW",
      category: "makeup",
      inStock: true,
    },
    {
      id: 3,
      name: "Anti-Aging Night Cream with Retinol",
      brand: "YouthGlow",
      price: 78.99,
      originalPrice: 95.99,
      rating: 4.9,
      reviews: 456,
      image: "/placeholder.svg?height=300&width=300",
      badge: "SALE",
      category: "skincare",
      inStock: true,
    },
    {
      id: 4,
      name: "Vitamin C Brightening Face Mask",
      brand: "RadiantSkin",
      price: 32.99,
      rating: 4.7,
      reviews: 167,
      image: "/placeholder.svg?height=300&width=300",
      category: "skincare",
      inStock: false,
    },
    {
      id: 5,
      name: "Long-Wear Foundation - Medium",
      brand: "FlawlessBase",
      price: 42.99,
      originalPrice: 52.99,
      rating: 4.5,
      reviews: 298,
      image: "/placeholder.svg?height=300&width=300",
      badge: "TRENDING",
      category: "makeup",
      inStock: true,
    },
    {
      id: 6,
      name: "Nourishing Hair Oil with Argan",
      brand: "SilkyStrands",
      price: 28.99,
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?height=300&width=300",
      category: "hair",
      inStock: true,
    },
    // Add more products...
    {
      id: 7,
      name: "Gentle Cleansing Foam",
      brand: "PureSkin",
      price: 19.99,
      rating: 4.4,
      reviews: 145,
      image: "/placeholder.svg?height=300&width=300",
      category: "skincare",
      inStock: true,
    },
    {
      id: 8,
      name: "Waterproof Mascara - Black",
      brand: "LashPerfect",
      price: 18.99,
      originalPrice: 24.99,
      rating: 4.3,
      reviews: 312,
      image: "/placeholder.svg?height=300&width=300",
      category: "makeup",
      inStock: true,
    },
  ];

  const filterOptions = [
    {
      id: "category",
      title: "Category",
      type: "checkbox" as const,
      options: [
        { id: "skincare", label: "Skincare", count: 4 },
        { id: "makeup", label: "Makeup", count: 3 },
        { id: "hair", label: "Hair Care", count: 1 },
        { id: "fragrance", label: "Fragrance", count: 0 },
      ],
    },
    {
      id: "brand",
      title: "Brand",
      type: "checkbox" as const,
      options: [
        { id: "glowup", label: "GlowUp", count: 1 },
        { id: "velvellips", label: "VelvetLips", count: 1 },
        { id: "youthglow", label: "YouthGlow", count: 1 },
        { id: "radiantskin", label: "RadiantSkin", count: 1 },
        { id: "flawlessbase", label: "FlawlessBase", count: 1 },
        { id: "silkystrands", label: "SilkyStrands", count: 1 },
      ],
    },
    {
      id: "price",
      title: "Price Range",
      type: "range" as const,
      options: [],
    },
    {
      id: "rating",
      title: "Rating",
      type: "checkbox" as const,
      options: [
        { id: "4-5", label: "4+ Stars", count: 8 },
        { id: "3-4", label: "3+ Stars", count: 8 },
        { id: "2-3", label: "2+ Stars", count: 8 },
      ],
    },
    {
      id: "availability",
      title: "Availability",
      type: "checkbox" as const,
      options: [
        { id: "in-stock", label: "In Stock", count: 7 },
        { id: "out-of-stock", label: "Out of Stock", count: 1 },
      ],
    },
  ];

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "name", label: "Name A-Z" },
  ];

  useEffect(() => {
    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (activeFilters.category?.length) {
      filtered = filtered.filter((product) =>
        activeFilters.category.includes(product.category)
      );
    }

    // Apply brand filter
    if (activeFilters.brand?.length) {
      filtered = filtered.filter((product) =>
        activeFilters.brand.includes(
          product.brand.toLowerCase().replace(/\s+/g, "")
        )
      );
    }

    // Apply price filter
    if (activeFilters.price?.length) {
      const [min, max] = activeFilters.price[0].split("-").map(Number);
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    // Apply rating filter
    if (activeFilters.rating?.length) {
      filtered = filtered.filter((product) => {
        return activeFilters.rating.some((range) => {
          const [min] = range.split("-").map(Number);
          return product.rating >= min;
        });
      });
    }

    // Apply availability filter
    if (activeFilters.availability?.length) {
      filtered = filtered.filter((product) => {
        if (activeFilters.availability.includes("in-stock"))
          return product.inStock;
        if (activeFilters.availability.includes("out-of-stock"))
          return !product.inStock;
        return true;
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        // Featured - keep original order
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, searchQuery, activeFilters, sortBy]);

  const handleFilterChange = (filterId: string, values: string[]) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterId]: values,
    }));
  };

  const handleClearFilters = () => {
    setActiveFilters({});
    setSearchQuery("");
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    console.log("Added to cart:", product, "Quantity:", quantity);
    // Implement cart logic here
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistedItems((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="main-container py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Shop All Products
        </h1>
        <p className="text-lg text-gray-600">
          Discover our complete collection of premium beauty products
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-1/4">
          <ProductFilters
            filters={filterOptions}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Search and Controls */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            {/* Search Bar */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-pink-500 focus:ring-0 transition-all duration-200"
              />
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-xl p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === "grid"
                        ? "bg-white shadow-sm text-pink-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                      viewMode === "list"
                        ? "bg-white shadow-sm text-pink-600"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Results Count */}
                <span className="text-sm text-gray-600">
                  Showing {startIndex + 1}-
                  {Math.min(endIndex, filteredProducts.length)} of{" "}
                  {filteredProducts.length} products
                </span>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border-2 border-gray-200 rounded-xl px-4 py-2 pr-10 text-sm focus:border-pink-500 focus:outline-none cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {currentProducts.length > 0 ? (
            <>
              <div
                className={`grid gap-6 ${
                  viewMode === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}
              >
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    isWishlisted={wishlistedItems.includes(product.id)}
                    showQuickAdd={viewMode === "grid"}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-12">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                  >
                    Previous
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        onClick={() => handlePageChange(page)}
                        className={`px-4 py-2 ${
                          currentPage === page
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                            : "border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 bg-transparent"
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  )}

                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 disabled:opacity-50 disabled:cursor-not-allowed bg-transparent"
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search or filter criteria to find what you're
                looking for.
              </p>
              <Button
                onClick={handleClearFilters}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
