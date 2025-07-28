import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { MegaMenuData, Page } from "./types.header";
import { SearchBarInput } from "@/components/ui/placeholders-and-vanish-input";
import WishlistButton from "@/components/ui/WishlistButton";
import { Link } from "react-router-dom";

const MainHeader = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<
    "categories" | "pages"
  >("categories");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [megaMenuData, setMegaMenuData] = useState<MegaMenuData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  // Mock API data - replace with actual API call
  const mockMegaMenuData: MegaMenuData = useMemo(
    () => ({
      categories: [
        {
          id: "bra",
          name: "BRA",
          slug: "bra",
          subcategories: [
            {
              id: "premium-regular",
              name: "Premium Regular Bra",
              slug: "premium-regular-bra",
            },
            { id: "regular", name: "Regular Bra", slug: "regular-bra" },
            { id: "seamless", name: "Seamless Bra", slug: "seamless-bra" },
            {
              id: "stylish-lace",
              name: "Stylish Lace Bra",
              slug: "stylish-lace-bra",
            },
            { id: "padded", name: "Padded Bra", slug: "padded-bra" },
            {
              id: "non-padded",
              name: "Non-Padded Bra",
              slug: "non-padded-bra",
            },
            { id: "wired", name: "Wired Bra", slug: "wired-bra" },
            { id: "pushup", name: "Pushup Bra", slug: "pushup-bra" },
            { id: "strapless", name: "Strapless Bra", slug: "strapless-bra" },
            { id: "bralette", name: "Bralette", slug: "bralette" },
          ],
        },
        {
          id: "panty",
          name: "PANTY",
          slug: "panty",
          subcategories: [
            { id: "panty-box", name: "Panty Box", slug: "panty-box" },
            {
              id: "regular-panty",
              name: "Regular Panty",
              slug: "regular-panty",
            },
            {
              id: "stylish-lace-panty",
              name: "Stylish Lace Panty",
              slug: "stylish-lace-panty",
            },
            {
              id: "seamless-panty",
              name: "Seamless Panty",
              slug: "seamless-panty",
            },
            {
              id: "boxer-shortie",
              name: "Boxer/Shortie",
              slug: "boxer-shortie",
            },
            { id: "thong", name: "Thong", slug: "thong" },
          ],
        },
        {
          id: "teenage",
          name: "TEENAGE",
          slug: "teenage",
          subcategories: [
            { id: "teenage-bra", name: "Teenage Bra", slug: "teenage-bra" },
            {
              id: "teenage-panty",
              name: "Teenage Panty",
              slug: "teenage-panty",
            },
          ],
        },
        {
          id: "sports-active",
          name: "SPORTS/ACTIVE WEAR",
          slug: "sports-active-wear",
          subcategories: [
            { id: "sports-bra", name: "Sports Bra", slug: "sports-bra" },
            { id: "leggings", name: "Leggings", slug: "leggings" },
          ],
        },
        {
          id: "nighty",
          name: "NIGHTY",
          slug: "nighty",
          subcategories: [
            {
              id: "regular-nighty",
              name: "Regular Nighty",
              slug: "regular-nighty",
            },
            {
              id: "honeymoon-nighty",
              name: "Honeymoon Nighty",
              slug: "honeymoon-nighty",
            },
          ],
        },
        {
          id: "bodysuits",
          name: "BODYSUITS & BODY SHAPERS",
          slug: "bodysuits-body-shapers",
          subcategories: [
            { id: "body-suits", name: "Body Suits", slug: "body-suits" },
            { id: "body-shapers", name: "Body Shapers", slug: "body-shapers" },
          ],
        },
        {
          id: "maternity",
          name: "MATERNITY/NEW MOM",
          slug: "maternity-new-mom",
          subcategories: [
            {
              id: "maternity-bra",
              name: "Maternity Bra",
              slug: "maternity-bra",
            },
            {
              id: "maternity-panty",
              name: "Maternity Panty",
              slug: "maternity-panty",
            },
          ],
        },
      ],
    }),
    []
  );

  const pages: Page[] = [
    { id: "home", name: "Home", slug: "/" },
    { id: "about", name: "About Us", slug: "/about" },
    { id: "blog", name: "Blog", slug: "/blog" },
    { id: "contact", name: "Contact", slug: "/contact" },
    { id: "faq", name: "FAQ", slug: "/faq" },
    { id: "privacy", name: "Privacy Policy", slug: "/privacy" },
    { id: "terms", name: "Terms & Conditions", slug: "/terms" },
    { id: "shipping", name: "Shipping Info", slug: "/shipping" },
    { id: "returns", name: "Returns & Exchanges", slug: "/returns" },
  ];

  // Simulate API call
  useEffect(() => {
    const fetchMegaMenuData = async () => {
      try {
        setTimeout(() => {
          setMegaMenuData(mockMegaMenuData);
        }, 500);
      } catch (error) {
        console.error("Failed to fetch mega menu data:", error);
      }
    };

    fetchMegaMenuData();
  }, [mockMegaMenuData]);

  // Check if arrows are needed
  useEffect(() => {
    const checkScrollArrows = () => {
      if (categoryScrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          categoryScrollRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
      }
    };

    checkScrollArrows();
    const scrollElement = categoryScrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollArrows);
      window.addEventListener("resize", checkScrollArrows);

      return () => {
        scrollElement.removeEventListener("scroll", checkScrollArrows);
        window.removeEventListener("resize", checkScrollArrows);
      };
    }
  }, []);

  const scrollCategories = (direction: "left" | "right") => {
    if (categoryScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        categoryScrollRef.current.scrollLeft +
        (direction === "right" ? scrollAmount : -scrollAmount);
      categoryScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const handleMouseEnter = (menuId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setActiveMegaMenu(menuId);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const handleMegaMenuMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMegaMenuMouseLeave = () => {
    setActiveMegaMenu(null);
  };

  const toggleCategoryExpansion = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const mainCategories = [
    { name: "Makeup", slug: "makeup" },
    { name: "Skin", slug: "skin" },
    { name: "Hair", slug: "hair" },
    { name: "Personal care", slug: "personal-care", },
    { name: "Mom & Baby", slug: "mom-baby" },
    { name: "Fragrance", slug: "fragrance" },
    { name: "UNDERGARMENTS", slug: "undergarments", hasMegaMenu: true },
    { name: "JEWELLERY", slug: "jewellery" },
    { name: "CLEARANCE SALE", slug: "clearance-sale", highlight: true },
    { name: "MEN", slug: "men" },
  ];

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Header */}
        <div className="border-b border-gray-200">
          <div className="main-container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 tracking-wider">
                  Beauty Adore
                </h1>
              </div>

              {/* Navigation - Desktop */}
              <nav className="hidden md:flex space-x-8">
                <a
                  href="#"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  BRANDS
                </a>
              </nav>

              {/* Search Bar - Premium Style */}
              <div className="flex-1 max-w-lg mx-8 hidden md:block">
                <SearchBarInput
                  placeholders={["Search for Products, Brands..."]}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <WishlistButton />
              {/* User Actions - Premium Style */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden md:flex items-center space-x-2 bg-white text-gray-700 hover:text-pink-600 border-2 border-gray-200 hover:border-pink-300 hover:bg-pink-50 rounded-full px-6 py-2.5 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 font-medium"
                  onClick={() => (window.location.href = "/login")}
                >
                  <User className="h-5 w-5" />
                  <span>LOGIN</span>
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="relative hover:bg-pink-50 hover:text-pink-600 rounded-xl px-4 py-2 transition-all duration-200"
                >
                  <ShoppingBag className="h-5 w-5" />
                  <span className="ml-2 hidden md:inline">BAG</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                      {cartCount}
                    </span>
                  )}
                </Button>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden hover:bg-pink-50 rounded-xl p-2"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  {isDrawerOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Category Navigation with Arrow Controls */}
        <div className="bg-white border-b border-gray-200 relative">
          <div className="main-container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex items-center">
              {/* Left Arrow */}
              {showLeftArrow && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCategories("left")}
                  className="absolute left-2 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white rounded-full p-2 transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}

              {/* Categories Container */}
              <div
                ref={categoryScrollRef}
                className="flex space-x-6 overflow-x-auto scrollbar-hide scroll-smooth py-1"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {mainCategories.map((category) => (
                  <div
                    key={category.slug}
                    className="relative flex-shrink-0"
                    onMouseEnter={() =>
                      category.hasMegaMenu && handleMouseEnter(category.slug)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      to={`/${category.slug}`}
                      className={`flex items-center px-1 py-1 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        category.highlight
                          ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl mx-1 shadow-lg hover:shadow-xl transform "
                          : "text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-pink-500  rounded-t-lg"
                      }`}
                    >
                      {category.name}
                      {category.hasMegaMenu && (
                        <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              {showRightArrow && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => scrollCategories("right")}
                  className="absolute right-1 z-10 bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white rounded-full p-2 transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mega Menu - Desktop */}
        {activeMegaMenu === "undergarments" && megaMenuData && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 w-full bg-white shadow-2xl border-t border-gray-200 z-40 animate-in slide-in-from-top-2 duration-300"
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            <div className="main-container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
                {megaMenuData.categories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b border-pink-200 pb-2">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <a
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="text-sm text-gray-600 hover:text-pink-600  transition-all duration-200 block py-2 px-2 rounded-lg"
                          >
                            {subcategory.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Additional sections */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b border-pink-200 pb-2">
                    SET (TOP & BOTTOM)
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600  transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Regular Wear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Sports/Activewear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Night Wear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Honeymoon Set
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b border-pink-200 pb-2">
                    PLUS SIZE
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Plus Size Bra
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        Plus Size Panty
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide border-b border-pink-200 pb-2">
                    ACCESSORIES
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 transition-all duration-200 block py-2 px-2 rounded-lg"
                      >
                        BLOUSE
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                  className="hover:bg-white rounded-full p-2"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors duration-200" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border-2 border-gray-200 rounded-2xl bg-gray-50/50 focus:bg-white focus:border-pink-500 focus:ring-0 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveDrawerTab("categories")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                    activeDrawerTab === "categories"
                      ? "text-pink-600 border-b-2 border-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveDrawerTab("pages")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-all duration-200 ${
                    activeDrawerTab === "pages"
                      ? "text-pink-600 border-b-2 border-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Pages
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeDrawerTab === "categories" && (
                  <div className="p-4 space-y-2">
                    {mainCategories.map((category) => (
                      <div key={category.slug}>
                        <div
                          className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                            category.highlight
                              ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg"
                              : "text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-pink-200"
                          }`}
                        >
                          <a
                            href={`/${category.slug}`}
                            className="flex-1 font-medium"
                            onClick={() => setIsDrawerOpen(false)}
                          >
                            {category.name}
                          </a>
                          {category.hasMegaMenu && megaMenuData && (
                            <button
                              onClick={() =>
                                toggleCategoryExpansion(category.slug)
                              }
                              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-all duration-200"
                            >
                              <ChevronRight
                                className={`h-4 w-4 transition-transform duration-200 ${
                                  expandedCategory === category.slug
                                    ? "rotate-90"
                                    : ""
                                }`}
                              />
                            </button>
                          )}
                        </div>

                        {/* Expanded Subcategories */}
                        {expandedCategory === category.slug &&
                          category.hasMegaMenu &&
                          megaMenuData && (
                            <div className="ml-4 mt-2 space-y-1 animate-in slide-in-from-top-2 duration-200">
                              {megaMenuData.categories.map((cat) => (
                                <div key={cat.id} className="space-y-1">
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-2 bg-gray-50 rounded-lg">
                                    {cat.name}
                                  </h4>
                                  {cat.subcategories.map((subcat) => (
                                    <a
                                      key={subcat.id}
                                      href={`/${cat.slug}/${subcat.slug}`}
                                      className="block px-3 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-all duration-200 ml-2"
                                      onClick={() => setIsDrawerOpen(false)}
                                    >
                                      {subcat.name}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}

                {activeDrawerTab === "pages" && (
                  <div className="p-4 space-y-2">
                    {pages.map((page) => (
                      <a
                        key={page.id}
                        href={page.slug}
                        className="block p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200 font-medium border border-gray-200 hover:border-pink-200"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-200 space-y-2 bg-gray-50">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white hover:bg-pink-50 border-2 border-gray-200 hover:border-pink-300 rounded-xl py-3 transition-all duration-200"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Heart className="h-5 w-5 mr-2 text-pink-500" />
                  WISHLIST
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white hover:bg-pink-50 border-2 border-gray-200 hover:border-pink-300 rounded-xl py-3 transition-all duration-200"
                  onClick={() => {
                    setIsDrawerOpen(false);
                    window.location.href = "/login";
                  }}
                >
                  <User className="h-5 w-5 mr-2 text-pink-500" />
                  LOGIN
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MainHeader;
