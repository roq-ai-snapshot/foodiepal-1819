import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { foodGuideValidationSchema } from 'validationSchema/food-guides';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.food_guide
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFoodGuideById();
    case 'PUT':
      return updateFoodGuideById();
    case 'DELETE':
      return deleteFoodGuideById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFoodGuideById() {
    const data = await prisma.food_guide.findFirst(convertQueryToPrismaUtil(req.query, 'food_guide'));
    return res.status(200).json(data);
  }

  async function updateFoodGuideById() {
    await foodGuideValidationSchema.validate(req.body);
    const data = await prisma.food_guide.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteFoodGuideById() {
    const data = await prisma.food_guide.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
