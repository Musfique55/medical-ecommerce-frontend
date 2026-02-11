export interface Category {
  id: string;
  category_name: string;
  description: string;
  slug: string;
  icon_url: string;
  is_active: boolean;
  product_count: number;
}

export interface Manufacturer {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  country: string;
  is_active: boolean;
  medicine_count: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  retails_price: number;
  discount_type: discountType;
  discount_value: number;
  image_url: string[];
  category: Category;
  manufacturer: Manufacturer;
  stock: number;
  rating: number;
  reviews: Review[];
}

export interface cartItem {
  id: string;
  name: string;
  image_url: string[];
  price: number;
  quantity: number;
  category: string;
  description: string;
}

export interface Review {
  id: string;
  image_url: string;
  rating: number;
  description: string;
  created_at: string;
  author: Author;
}

interface Author {
  id: string;
  email: string;
  name: string;
}

export interface Step {
  num: number;
  active: boolean;
  complete: boolean;
  label: string;
}

export interface OrderItemPayload {
  product_id: string;
  quantity: number;
  unit_price: number;
}

export interface OrderItem {
  product_id: string;
  quantity: number;
  unit_price: number;
  id: string;
  name: string;
  description: string;
  retails_price: number;
}

export interface OrderPayload {
  customer_id: string;
  subtotal: number;
  total_amount: number;
  order_items: OrderItemPayload[];
  delivery_method: string;
  shipping_address: {
    fullName: string;
    email: string;
    phone: string;
    street_address: string;
    apartment?: string;
    special_instruction?: string;
    city: string;
    zip_code: string;
  };
}

export interface Order {
  id: string;
  order_number: string;
  subtotal: number;
  total_amount: number;
  order_items: OrderItem[];
  delivery_method: string;
  shipping_address: {
    fullName: string;
    email: string;
    phone: string;
    street_address: string;
    apartment?: string;
    special_instruction?: string;
    city: string;
    zip_code: string;
  };
}

export interface Manufacturer {
  id: string;
  name: string;
  description: string;
  logo_url: string;
  country: string;
  is_active: boolean;
  medicine_count: number;
  created_at: string;
  updated_at: string;
}

export enum discountType {
  NONE,
  PERCENTAGE,
  FIXED,
}
