import dotenv from 'dotenv';
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();

export interface ILoginTokenObject {
  firstName: string;
  id: string;
  lastName: string;
  role: string;
}

export function generateEmailToken(email: string): string {
  const nodeEnv: string = process.env.SENDGRID_API_KEY as string;
  const token = jsonwebtoken.sign({ email }, nodeEnv, {
    expiresIn: '2d',
  });

  return token;
}

export function generateLoginToken({
  firstName,
  id,
  lastName,
  role,
}: ILoginTokenObject): string {
  const token = jsonwebtoken.sign(
    { firstName, id, lastName, role },
    process.env.AUTH_TOKEN_SECRET!,
    { expiresIn: '2d' },
  );

  return token;
}

export const isEmail = (email: string): boolean =>
  /^\w{2,}@\w{2,}\.\w{2,}$/.test(email);
