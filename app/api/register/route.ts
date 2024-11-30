import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
  first_name: z.string().min(1, "First name is required."),
  last_name: z.string().min(1, "Last name is required."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  password_confirmation: z.string().min(6, "Password confirmation must be at least 6 characters.")
});

const validateUserData = (data: any) => {
  try {
    userSchema.parse(data);
    return null;
  } catch (err) {
    return err.errors.map((error) => error.message).join(', ');
  }
};

export async function POST(req: Request) {
  const { first_name, last_name, email, password, password_confirmation } = await req.json();

  // Validate input
  const validationError = validateUserData({ first_name, last_name, email, password, password_confirmation });
  if (validationError) {
    return new Response(JSON.stringify({ error: validationError }), { status: 400 });
  }

  if (password !== password_confirmation) {
    return new Response(JSON.stringify({ error: "Passwords do not match." }), { status: 400 });
  }

  try {
    // Check if the email is already registered
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "Email is already in use." }), { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        firstName: first_name,
        lastName: last_name,
        email,
        password: hashedPassword,
      },
    });

    return new Response(JSON.stringify({ message: 'Account created successfully!', user: newUser }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to create account.' }), { status: 500 });
  }
}
