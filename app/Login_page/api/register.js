import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { first_name, last_name, email, password, password_confirmation } = req.body;

    // Validation
    if (!first_name || !last_name || !email || !password || !password_confirmation) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user in the database
      const user = await prisma.user.create({
        data: {
          First_name: first_name,
          Last_name: last_name,
          email: email,
          password: hashedPassword,
        },
      });

      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ error: 'Error occurred during registration' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
