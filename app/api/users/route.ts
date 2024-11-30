// /pages/api/users.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function GET(req: Request) {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true, // You can modify this to select the fields you need
      },
    });

    // Return the users as a response
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching users." }),
      { status: 500 }
    );
  }
}
