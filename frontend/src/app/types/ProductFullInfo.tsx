import type { Product } from "./Product";
// full type of product, inherits from product type
export type ColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export interface CartItem {
  id: string;
  color: string;
  storage: string;
  quantity: number;
  priceAtAddTime: number;
  imageUrl: string; 
}

export type ProductFullInfo = Product & {
  description: string;
  rating: number;
  specs: {
    screen: string;
    resolution: string;
    processor: string;
    mainCamera: string;
    selfieCamera: string;
    battery: string;
    os: string;
    screenRefreshRate: string;
  };
  colorOptions ?: ColorOption[];       
  storageOptions ?: StorageOption[];    
  similarProducts ?: Product[];
};
