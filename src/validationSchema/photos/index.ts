import * as yup from 'yup';

export const photoValidationSchema = yup.object().shape({
  url: yup.string().required(),
  user_id: yup.string().nullable().required(),
  restaurant_id: yup.string().nullable().required(),
});
