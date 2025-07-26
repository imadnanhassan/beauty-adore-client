import { useEffect, useMemo, useRef, useState } from "react";
import type { MegaMenuData, Page } from "./types.header";
import {
  ChevronDown,
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // Mock API data - replace with actual API call
  const mockMegaMenuData: MegaMenuData = useMemo(() => ({
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
          { id: "non-padded", name: "Non-Padded Bra", slug: "non-padded-bra" },
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
          { id: "regular-panty", name: "Regular Panty", slug: "regular-panty" },
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
          { id: "boxer-shortie", name: "Boxer/Shortie", slug: "boxer-shortie" },
          { id: "thong", name: "Thong", slug: "thong" },
        ],
      },
      {
        id: "teenage",
        name: "TEENAGE",
        slug: "teenage",
        subcategories: [
          { id: "teenage-bra", name: "Teenage Bra", slug: "teenage-bra" },
          { id: "teenage-panty", name: "Teenage Panty", slug: "teenage-panty" },
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
          { id: "maternity-bra", name: "Maternity Bra", slug: "maternity-bra" },
          {
            id: "maternity-panty",
            name: "Maternity Panty",
            slug: "maternity-panty",
          },
        ],
      },
    ],
  }), []);

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
    { name: "Personal care", slug: "personal-care" },
    { name: "Mom & Baby", slug: "mom-baby" },
    { name: "Fragrance", slug: "fragrance" },
    { name: "UNDERGARMENTS", slug: "undergarments", hasMegaMenu: true },
    { name: "HERBAL FEST", slug: "herbal-fest", highlight: true },
    { name: "JEWELLERY", slug: "jewellery" },
  ];
  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Header */}
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900 tracking-wider">
                  SHAJGOJ
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

              {/* Search Bar */}
              <div className="flex-1 max-w-lg mx-8 hidden md:block">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search for Products, Brands..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex items-center space-x-2 bg-gray-800 text-white hover:bg-gray-700 border-gray-800"
                >
                  <span>WISHLIST</span>
                </Button>

                <Button variant="ghost" size="sm" className="hidden md:flex">
                  <User className="h-5 w-5 mr-1" />
                  LOGIN
                </Button>

                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="ml-1 hidden md:inline">BAG</span>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>

                {/* Mobile menu button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
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

        {/* Category Navigation - Desktop (No Scrollbar) */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="hidden md:flex space-x-6">
              {mainCategories.map((category) => (
                <div
                  key={category.slug}
                  className="relative flex-shrink-0"
                  onMouseEnter={() =>
                    category.hasMegaMenu && handleMouseEnter(category.slug)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={`/${category.slug}`}
                    className={`flex items-center px-3 py-4 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                      category.highlight
                        ? "text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-md mx-1"
                        : "text-gray-700 hover:text-gray-900 border-b-2 border-transparent hover:border-pink-500"
                    }`}
                  >
                    {category.name}
                    {category.hasMegaMenu && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mega Menu - Desktop */}
        {activeMegaMenu === "undergarments" && megaMenuData && (
          <div
            ref={megaMenuRef}
            className="absolute left-0 w-full bg-white shadow-lg border-t border-gray-200 z-40 animate-in slide-in-from-top-2 duration-200"
            onMouseEnter={handleMegaMenuMouseEnter}
            onMouseLeave={handleMegaMenuMouseLeave}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-8">
                {megaMenuData.categories.map((category) => (
                  <div key={category.id} className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      {category.name}
                    </h3>
                    <ul className="space-y-2">
                      {category.subcategories.map((subcategory) => (
                        <li key={subcategory.id}>
                          <a
                            href={`/${category.slug}/${subcategory.slug}`}
                            className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
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
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    SET (TOP & BOTTOM)
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Regular Wear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Sports/Activewear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Night Wear set
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Honeymoon Set
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    PLUS SIZE
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Plus Size Bra
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
                      >
                        Plus Size Panty
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                    ACCESSORIES
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-gray-600 hover:text-pink-600 transition-colors duration-200 block py-1"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full"
                  />
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => setActiveDrawerTab("categories")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeDrawerTab === "categories"
                      ? "text-pink-600 border-b-2 border-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Categories
                </button>
                <button
                  onClick={() => setActiveDrawerTab("pages")}
                  className={`flex-1 py-3 px-4 text-sm font-medium transition-colors duration-200 ${
                    activeDrawerTab === "pages"
                      ? "text-pink-600 border-b-2 border-pink-600 bg-pink-50"
                      : "text-gray-600 hover:text-gray-900"
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
                          className={`flex items-center justify-between p-3 rounded-lg transition-colors duration-200 ${
                            category.highlight
                              ? "text-white bg-gradient-to-r from-pink-500 to-purple-600"
                              : "text-gray-700 hover:bg-gray-50"
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
                              className="ml-2 p-1"
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
                                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 py-1">
                                    {cat.name}
                                  </h4>
                                  {cat.subcategories.map((subcat) => (
                                    <a
                                      key={subcat.id}
                                      href={`/${cat.slug}/${subcat.slug}`}
                                      className="block px-3 py-2 text-sm text-gray-600 hover:text-pink-600 hover:bg-pink-50 rounded transition-colors duration-200"
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
                        className="block p-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors duration-200 font-medium"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        {page.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-200 space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <Heart className="h-5 w-5 mr-2" />
                  WISHLIST
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  <User className="h-5 w-5 mr-2" />
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
