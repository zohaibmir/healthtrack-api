import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export interface TokenPayload {
  userId: number;
  role: string;
}

// Generate a JWT token
export const generateToken = (userId: number, role: string) => {
  return jwt.sign(
    { userId, role }, // Payload
    JWT_SECRET,       // Secret key
    { expiresIn: '1h' } // Token expiry
  );
};

// Verify and decode a JWT token
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};
