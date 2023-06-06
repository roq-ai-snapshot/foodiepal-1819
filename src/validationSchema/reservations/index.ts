import * as yup from 'yup';

export const reservationValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  party_size: yup.number().integer().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
