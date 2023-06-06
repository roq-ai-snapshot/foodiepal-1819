import * as yup from 'yup';
import { promotionValidationSchema } from 'validationSchema/promotions';
import { restaurantValidationSchema } from 'validationSchema/restaurants';

export const foodGuideValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  promotion: yup.array().of(promotionValidationSchema),
  restaurant: yup.array().of(restaurantValidationSchema),
});
