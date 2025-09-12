export interface IOrder {
  _id: string;
  id: string;
  createdAt: string;
  isPaid: boolean;
  isDelivered: boolean;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  paymentMethodType: string;
  user: {
    name: string;
    email: string;
  };
  shippingAddress: {
    city: string;
    phone: string;
    address: string;
  };
  cartItems: ICartItem[];
}

export interface ICartItem {
  _id: string;
  price: number;
  count: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
    brand: {
      name: string;
    };
  };
}
