import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { Text, Box, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Link } from '@chakra-ui/react';
import { UserSelect } from 'components/user-select';
import { getRestaurantById } from 'apiSdk/restaurants';
import { Error } from 'components/error';
import { RestaurantInterface } from 'interfaces/restaurant';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';
import { deleteMenuById } from 'apiSdk/menus';
import { deletePhotoById } from 'apiSdk/photos';
import { deleteReservationById } from 'apiSdk/reservations';
import { deleteReviewById } from 'apiSdk/reviews';

function RestaurantViewPage() {
  const { hasAccess } = useAuthorizationApi();
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<RestaurantInterface>(
    () => (id ? `/restaurants/${id}` : null),
    () =>
      getRestaurantById(id, {
        relations: ['food_guide', 'menu', 'photo', 'reservation', 'review'],
      }),
  );

  const menuHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteMenuById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const photoHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deletePhotoById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const reservationHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteReservationById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const reviewHandleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteReviewById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  const [deleteError, setDeleteError] = useState(null);
  const [createError, setCreateError] = useState(null);

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Restaurant Detail View
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Text fontSize="lg" fontWeight="bold" as="span">
              Name:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.name}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Address:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.address}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Cuisine:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.cuisine}
            </Text>
            <br />
            <Text fontSize="lg" fontWeight="bold" as="span">
              Price Range:
            </Text>
            <Text fontSize="md" as="span" ml={3}>
              {data?.price_range}
            </Text>
            <br />
            {hasAccess('food_guide', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold" as="span">
                  Food Guide:
                </Text>
                <Text fontSize="md" as="span" ml={3}>
                  <Link as={NextLink} href={`/food-guides/view/${data?.food_guide?.id}`}>
                    {data?.food_guide?.name}
                  </Link>
                </Text>
              </>
            )}
            {hasAccess('menu', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Menus:
                </Text>
                <NextLink passHref href={`/menus/create?restaurant_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>name</Th>
                        <Th>description</Th>
                        <Th>price</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.menu?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.name}</Td>
                          <Td>{record.description}</Td>
                          <Td>{record.price}</Td>
                          <Td>
                            <NextLink passHref href={`/menus/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/menus/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => menuHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            {hasAccess('photo', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Photos:
                </Text>
                <NextLink passHref href={`/photos/create?restaurant_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>url</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.photo?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.url}</Td>
                          <Td>
                            <NextLink passHref href={`/photos/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/photos/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => photoHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            {hasAccess('reservation', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Reservations:
                </Text>
                <NextLink passHref href={`/reservations/create?restaurant_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>date_time</Th>
                        <Th>party_size</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.reservation?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.date_time as unknown as string}</Td>
                          <Td>{record.party_size}</Td>
                          <Td>
                            <NextLink passHref href={`/reservations/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/reservations/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => reservationHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}

            {hasAccess('review', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
              <>
                <Text fontSize="lg" fontWeight="bold">
                  Reviews:
                </Text>
                <NextLink passHref href={`/reviews/create?restaurant_id=${data?.id}`}>
                  <Button colorScheme="blue" mr="4" as="a">
                    Create
                  </Button>
                </NextLink>
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>rating</Th>
                        <Th>content</Th>
                        <Th>Edit</Th>
                        <Th>View</Th>
                        <Th>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data?.review?.map((record) => (
                        <Tr key={record.id}>
                          <Td>{record.rating}</Td>
                          <Td>{record.content}</Td>
                          <Td>
                            <NextLink passHref href={`/reviews/edit/${record.id}`}>
                              <Button as="a">Edit</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <NextLink passHref href={`/reviews/view/${record.id}`}>
                              <Button as="a">View</Button>
                            </NextLink>
                          </Td>
                          <Td>
                            <Button onClick={() => reviewHandleDelete(record.id)}>Delete</Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </>
            )}
          </>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'restaurant',
  operation: AccessOperationEnum.READ,
})(RestaurantViewPage);
