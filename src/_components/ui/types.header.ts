export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: SubCategory[];
}

export interface MegaMenuData {
  categories: Category[];
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}
