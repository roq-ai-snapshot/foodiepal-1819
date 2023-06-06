import { FoodGuideInterface } from 'interfaces/food-guide';

export interface PromotionInterface {
  id?: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  food_guide_id: string;

  food_guide?: FoodGuideInterface;
  _count?: {};
}
