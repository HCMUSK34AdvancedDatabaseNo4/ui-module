export interface Product {
  id: number;
  productName: string;
  supplierCode: string;
  images: string[];
  price: number;
  description?: string;
  categories: string[];
  discountPercentage?: number;
}
