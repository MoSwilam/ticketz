import express, { Request, Response } from 'express';
import { signUpValidationScehma } from '../validation/schemas';
import { validationRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

const router = express.Router();


router.post(
  '/api/users/signin', 
  signUpValidationScehma, 
  validationRequest,
  async (req: Request, res: Response) => {

  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new BadRequestError('User not found');
  }
  const passwordsMatch = await Password.compare(existingUser.password, password);

  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }

  // Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY!);
  
  // Store it on session object
  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
});

export { router as signinRouter };