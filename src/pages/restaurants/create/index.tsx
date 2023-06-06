import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createRestaurant } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { restaurantValidationSchema } from 'validationSchema/restaurants';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FoodGuideInterface } from 'interfaces/food-guide';
import { getUsers } from 'apiSdk/users';
import { UserInterface } from 'interfaces/user';
import { getFoodGuides } from 'apiSdk/food-guides';
import { RestaurantInterface } from 'interfaces/restaurant';

function RestaurantCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RestaurantInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRestaurant(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RestaurantInterface>({
    initialValues: {
      name: '',
      address: '',
      cuisine: '',
      price_range: '',
      food_guide_id: (router.query.food_guide_id as string) ?? null,
      menu: [],
      photo: [],
      reservation: [],
      review: [],
    },
    validationSchema: restaurantValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Restaurant
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="address" mb="4" isInvalid={!!formik.errors?.address}>
            <FormLabel>Address</FormLabel>
            <Input type="text" name="address" value={formik.values?.address} onChange={formik.handleChange} />
            {formik.errors.address && <FormErrorMessage>{formik.errors?.address}</FormErrorMessage>}
          </FormControl>
          <FormControl id="cuisine" mb="4" isInvalid={!!formik.errors?.cuisine}>
            <FormLabel>Cuisine</FormLabel>
            <Input type="text" name="cuisine" value={formik.values?.cuisine} onChange={formik.handleChange} />
            {formik.errors.cuisine && <FormErrorMessage>{formik.errors?.cuisine}</FormErrorMessage>}
          </FormControl>
          <FormControl id="price_range" mb="4" isInvalid={!!formik.errors?.price_range}>
            <FormLabel>Price Range</FormLabel>
            <Input type="text" name="price_range" value={formik.values?.price_range} onChange={formik.handleChange} />
            {formik.errors.price_range && <FormErrorMessage>{formik.errors?.price_range}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FoodGuideInterface>
            formik={formik}
            name={'food_guide_id'}
            label={'Select Food Guide'}
            placeholder={'Select Food Guide'}
            fetcher={getFoodGuides}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'restaurant',
  operation: AccessOperationEnum.CREATE,
})(RestaurantCreatePage);
