import express, { Request, Response } from 'express';
import { signUpValidationScehma } from '../validation/schemas';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-errors';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();


router.post('/api/users/signup', signUpValidationScehma, (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  const { email, password } = req.body;
  throw new DatabaseConnectionError();

  res.send('User created yoo');
});

export { router as signupRouter };