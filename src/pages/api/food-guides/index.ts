import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { foodGuideValidationSchema } from 'validationSchema/food-guides';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getFoodGuides();
    case 'POST':
      return createFoodGuide();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFoodGuides() {
    const data = await prisma.food_guide
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'food_guide'));
    return res.status(200).json(data);
  }

  async function createFoodGuide() {
    await foodGuideValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.promotion?.length > 0) {
      const create_promotion = body.promotion;
      body.promotion = {
        create: create_promotion,
      };
    } else {
      delete body.promotion;
    }
    if (body?.restaurant?.length > 0) {
      const create_restaurant = body.restaurant;
      body.restaurant = {
        create: create_restaurant,
      };
    } else {
      delete body.restaurant;
    }
    const data = await prisma.food_guide.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
