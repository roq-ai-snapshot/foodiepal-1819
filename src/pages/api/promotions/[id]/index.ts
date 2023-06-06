import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { promotionValidationSchema } from 'validationSchema/promotions';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.promotion
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPromotionById();
    case 'PUT':
      return updatePromotionById();
    case 'DELETE':
      return deletePromotionById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPromotionById() {
    const data = await prisma.promotion.findFirst(convertQueryToPrismaUtil(req.query, 'promotion'));
    return res.status(200).json(data);
  }

  async function updatePromotionById() {
    await promotionValidationSchema.validate(req.body);
    const data = await prisma.promotion.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deletePromotionById() {
    const data = await prisma.promotion.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
