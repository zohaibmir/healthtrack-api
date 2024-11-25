import { Request, Response } from 'express';
import { generateToken } from '../utils/auth.utils';

class AuthController {
  // Use arrow functions to auto-bind `this`
  login = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { username, password } = req.body;

      // Mock user authentication (replace with actual logic)
      if (username === 'admin' && password === 'password') {
        const token = generateToken(1, 'admin'); // Mock userId = 1 and role = admin
        return res.status(200).json({ token });
      }

      if (username === 'doctor' && password === 'password') {
        const token = generateToken(2, 'doctor'); // Mock userId = 2 and role = doctor
        return res.status(200).json({ token });
      }

      return res.status(401).json({ error: 'Invalid username or password' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

export default new AuthController();
