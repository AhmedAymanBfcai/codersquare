import dotenv from 'dotenv';
import express, { ErrorRequestHandler, RequestHandler } from 'express';
import asyncHandler from 'express-async-handler';

import { initDb } from './datastore';
import { signInHandler, signUpHandler } from './handlers/authHandler';
import { createPostHandler, listPostsHandler } from './handlers/postHandler';
import { authMiddleware } from './middleware/authMiddleware';
import { errHandler } from './middleware/errorMiddleware';
import { requestLoggerMiddleware } from './middleware/loggerMiddleware';

(async () => {
  await initDb();
  dotenv.config(); // To load envfile and put it's content in process.env

  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  // Public endpoints, Anyone can use them without need for jwt token.
  // app.post('/v1/signup', asyncHandler(signUpHandler));
  // app.post('/v1/signin', asyncHandler(signInHandler));

  app.use(authMiddleware);

  //Protected endpoints
  // app.get('/v1/posts', asyncHandler(listPostsHandler));
  // app.post('/v1/posts', asyncHandler(createPostHandler));
  app.use(errHandler);

  app.listen(3000);
})();
