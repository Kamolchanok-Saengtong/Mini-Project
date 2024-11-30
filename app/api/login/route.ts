import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

// Schema for login validation
const loginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const validateLoginData = (data: any) => {
  try {
    loginSchema.parse(data);
    return null;
  } catch (err) {
    return err.errors.map((error) => error.message).join(', ');
  }
};

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  const validationError = validateLoginData({ email, password });
  if (validationError) {
    return new Response(JSON.stringify({ error: validationError }), { status: 400 });
  }

  try {
    // Check if the user exists in the database
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found." }), { status: 404 });
    }

    // Compare provided password with stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(JSON.stringify({ error: "Incorrect password." }), { status: 401 });
    }

    // Successful login
    return new Response(JSON.stringify({ message: "Login successful!", user: { email: user.email, firstName: user.firstName, lastName: user.lastName } }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred during login." }), { status: 500 });
  }
}
