import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface PhotoInterface {
  id?: string;
  url: string;
  user_id: string;
  restaurant_id: string;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
