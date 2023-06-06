import * as yup from 'yup';
import { menuValidationSchema } from 'validationSchema/menus';
import { photoValidationSchema } from 'validationSchema/photos';
import { reservationValidationSchema } from 'validationSchema/reservations';
import { reviewValidationSchema } from 'validationSchema/reviews';

export const restaurantValidationSchema = yup.object().shape({
  name: yup.string().required(),
  address: yup.string().required(),
  cuisine: yup.string().required(),
  price_range: yup.string().required(),
  food_guide_id: yup.string().nullable().required(),
  menu: yup.array().of(menuValidationSchema),
  photo: yup.array().of(photoValidationSchema),
  reservation: yup.array().of(reservationValidationSchema),
  review: yup.array().of(reviewValidationSchema),
});
