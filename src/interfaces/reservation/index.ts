import { UserInterface } from 'interfaces/user';
import { RestaurantInterface } from 'interfaces/restaurant';

export interface ReservationInterface {
  id?: string;
  date_time: Date;
  party_size: number;
  user_id: string;
  restaurant_id: string;

  user?: UserInterface;
  restaurant?: RestaurantInterface;
  _count?: {};
}
