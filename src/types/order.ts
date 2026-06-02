export interface OrderItem {
  product: {
    node: {
      name: string;
    };
  };
  quantity: number;
  total: string;
}

export interface Order {
  id: string;
  databaseId: number;
  orderNumber: string;
  total: string;
  status: string;
  date?: string;
  lineItems: {
    nodes: OrderItem[];
  };
}
