export interface Product {
  id?: string;
  productName: string;
  supplierCode: string;
  images: string[];
  price: number;
  description?: string;
  categories: string[];
  discountPercentage?: number;
}
