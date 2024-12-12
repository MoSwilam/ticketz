import express, { Request, Response } from 'express';
import { signUpValidationScehma } from '../validation/schemas';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();


router.get('/api/users/currentuser', (req: Request, res: Response) => {
  console.log('currentUser');
  if (!req.session || !req.session.jwt) {
    return res.send({ currentUser: null });
  }

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as any;
    res.send({ currentUser: payload });
  } catch (error) {
    return res.send({ currentUser: null });
  }
});

export { router as currentUserRouter };


// if (err instanceof RequestValidationError) {
//   const formattedErrors = err.errors.map((error) => {
//     if (error.type === 'field') {
//       return { message: error.msg, field: error.path };
//     }
//   });
//   return res.status(400).send({ errors: formattedErrors });
// }