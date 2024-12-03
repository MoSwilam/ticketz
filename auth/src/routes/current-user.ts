import express, { Request, Response } from 'express';
import { signUpValidationScehma } from '../validation/schemas';
import { validationResult } from 'express-validator';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();


router.get('/api/users/currentuser', signUpValidationScehma, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send(errors.array());
  }

  throw new DatabaseConnectionError();

  res.send('User created');
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