export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  sort: string;
  organizationId: number;
};

export type Organization = {
  id: number;
  name: string;
  description: string;
  date: string;
  tel: string;
  mail: string;
  address: string;
};
