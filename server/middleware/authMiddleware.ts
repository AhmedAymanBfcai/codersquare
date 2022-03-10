import { verifyJwt } from '../auth';
import { db } from '../datastore';
import { ExpressHandler } from '../types';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // To get the token
  if (!token) {
    return res.sendStatus(401); // Unauthroized
  }

  try {
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);
    if (!user) {
      throw 'Not found';
    }

    next(); // To call the coming middleware after done.
  } catch {
    return res.status(401).send({ error: 'Bad token' });
  }
};
