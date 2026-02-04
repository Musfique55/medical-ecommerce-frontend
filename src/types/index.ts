export interface Category {
    id : string
    category_name : string
    description : string
    slug : string
    icon_url : string
    is_active : boolean
}

export interface Manufacturer {
    id: string;
    name: string,
    description: string;
    logo_url: string;
    country: string;
    is_active: boolean
    medicine_count: number,
}

export interface Product {
  id: string;
  name: string;
  description: string;
  retails_price: number;
  image_url: string[];
  category: Category;
  manufacturer : Manufacturer;
  stock: number;
  rating: number;
  reviews: [];
}