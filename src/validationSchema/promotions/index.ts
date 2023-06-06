import * as yup from 'yup';

export const promotionValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  food_guide_id: yup.string().nullable().required(),
});
