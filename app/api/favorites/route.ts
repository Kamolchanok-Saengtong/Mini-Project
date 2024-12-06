import { NextResponse } from 'next/server';
import prisma from '@/utils/db';

// GET handler for fetching all favorites
export async function GET() {
  try {
    const favorites = await prisma.favorite.findMany();
    return NextResponse.json(favorites); // Return the JSON array of favorites
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return NextResponse.json({ message: "Error fetching favorites" }, { status: 500 }); // Ensure JSON response on error
  }
}

// POST handler for adding a new favorite
export async function POST(req: Request) {
  try {
    const { title, url, tag } = await req.json(); // Use req.json() to parse the body

    if (!title || !url) {
      return NextResponse.json({ message: "Title and URL are required" }, { status: 400 });
    }

    const newFavorite = await prisma.favorite.create({
      data: { title, url, tag }
    });
    return NextResponse.json(newFavorite, { status: 201 }); // Return the created favorite
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// PATCH handler for updating a favorite's tag
export async function PATCH(req: Request, { params }: { params: { favoriteId: string } }) {
  const { tag } = await req.json(); // Parse the request body for the tag

  if (!tag) {
    return NextResponse.json({ message: 'Tag is required' }, { status: 400 });
  }

  try {
    const updatedFavorite = await prisma.favorite.update({
      where: { id: params.favoriteId },
      data: { tag },
    });
    return NextResponse.json(updatedFavorite);
  } catch (error) {
    console.error("Error updating favorite:", error);
    return NextResponse.json({ message: "Error updating favorite" }, { status: 500 });
  }
}

// DELETE handler for deleting a favorite
export async function DELETE(req: Request, { params }: { params: { favoriteId: string } }) {
  try {
    await prisma.favorite.delete({
      where: { id: params.favoriteId },
    });
    return NextResponse.json({ message: 'Favorite deleted' });
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json({ message: "Error deleting favorite" }, { status: 500 });
  }
}
