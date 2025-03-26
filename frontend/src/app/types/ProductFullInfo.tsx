import type { Product } from "./Product";

export type ColorOption = {
  name: string;
  hexCode: string;
  imageUrl: string;
};

export type StorageOption = {
  capacity: string;
  price: number;
};

export type CartItem = {
  id: string;
  color: string;
  storage: string;
  quantity: number;
  priceAtAddTime: number;
};
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
