import { MenuInterface } from 'interfaces/menu';
import { PhotoInterface } from 'interfaces/photo';
import { ReservationInterface } from 'interfaces/reservation';
import { ReviewInterface } from 'interfaces/review';
import { FoodGuideInterface } from 'interfaces/food-guide';

export interface RestaurantInterface {
  id?: string;
  name: string;
  address: string;
  cuisine: string;
  price_range: string;
  food_guide_id: string;
  menu?: MenuInterface[];
  photo?: PhotoInterface[];
  reservation?: ReservationInterface[];
  review?: ReviewInterface[];
  food_guide?: FoodGuideInterface;
  _count?: {
    menu?: number;
    photo?: number;
    reservation?: number;
    review?: number;
  };
}
