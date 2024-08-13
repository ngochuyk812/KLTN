export interface IRoute {
  path: string;
  element: React.ComponentType<any>;
}
export interface ICamera {
  deviceId: string;
  groupId: string;
  kind: string;
  label: string;
}
export interface PageAdmin {
  tabName: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}
export interface ProductCreation {
  image: string;
  price: Number;
  product_name: string;
}
export interface ProductUpdate {
  id: Number;
  image: string;
  price: Number;
  product_name: string;
}

export interface Product {
  id: number;
  label_id: number;
  image: string;
  price: number;
  product_name: string;
}

export interface ProductPredict extends Product {
  image_scan: string;
  quantity: number;
}
export interface OrderDetail {
  product_id: number;
  quantity: number;
}

export interface CreateOrder {
  customer_name: string;
  address: string;
  phone_number: string;
  email: string;
  order_date: Date;
  total: number;
  order_details: OrderDetail[];
}
