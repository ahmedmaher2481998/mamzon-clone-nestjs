export type ProductType = {
  name: string;
  price: number;
  description?: string;
};

export type updateProductType = {
  name?: string;
  price?: number;
  description?: string;
};
