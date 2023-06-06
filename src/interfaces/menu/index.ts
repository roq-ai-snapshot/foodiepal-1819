import { RestaurantInterface } from 'interfaces/restaurant';

export interface MenuInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
  restaurant_id: string;

  restaurant?: RestaurantInterface;
  _count?: {};
}
