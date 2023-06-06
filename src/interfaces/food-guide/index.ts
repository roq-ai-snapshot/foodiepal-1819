import { PromotionInterface } from 'interfaces/promotion';
import { RestaurantInterface } from 'interfaces/restaurant';
import { UserInterface } from 'interfaces/user';

export interface FoodGuideInterface {
  id?: string;
  name: string;
  user_id: string;
  promotion?: PromotionInterface[];
  restaurant?: RestaurantInterface[];
  user?: UserInterface;
  _count?: {
    promotion?: number;
    restaurant?: number;
  };
}
