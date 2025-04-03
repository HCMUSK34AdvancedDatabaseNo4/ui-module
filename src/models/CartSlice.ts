import { CartItem } from "./CartItem";

export interface CartSlice {
  cartOpen: boolean;
  checkOut: boolean;
  cartItems: CartItem[];
}
