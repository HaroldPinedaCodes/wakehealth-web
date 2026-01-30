export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  customizable: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  customNote: string;
  image: string;
}

export interface CustomerInfo {
  name: string;
  whatsapp: string;
  email: string;
  address: string;
}

export interface SiteConfig {
  whatsappNumber: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companyPhone: string;
}
