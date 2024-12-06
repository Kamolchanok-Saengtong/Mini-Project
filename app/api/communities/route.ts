// Handle POST request to create a new community
export async function POST(req) {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const token = authHeader.split(' ')[1];
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }
  
      const userId = decodedToken.userId;
      const body = await req.json();
      const { name, description, image, category } = body;
  
      // Basic validation
      if (!name || !description || !image || !category) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }
  
      // Create the community in the database
      const newCommunity = await prisma.community.create({
        data: {
          name,
          description,
          image,
          category,
          userId,  // Link the community to the user
        },
      });
  
      return NextResponse.json(newCommunity, { status: 201 });
    } catch (error) {
      console.error("Error creating community:", error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  
  // Handle PUT request to update a community
  export async function PUT(req) {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const token = authHeader.split(' ')[1];
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }
  
      const userId = decodedToken.userId;
      const body = await req.json();
      const { communityId, updatedName, updatedDescription, updatedImage, updatedCategory } = body;
  
      if (!communityId || !updatedName || !updatedDescription || !updatedImage || !updatedCategory) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }
  
      // Update the community in the database
      const updatedCommunity = await prisma.community.update({
        where: { id: communityId },
        data: {
          name: updatedName,
          description: updatedDescription,
          image: updatedImage,
          category: updatedCategory,
        },
      });
  
      return NextResponse.json(updatedCommunity, { status: 200 });
    } catch (error) {
      console.error("Error updating community:", error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  
  // Handle DELETE request to delete a community
  export async function DELETE(req) {
    try {
      const authHeader = req.headers.get('authorization');
      if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
  
      const token = authHeader.split(' ')[1];
      const decodedToken = verifyToken(token);
      if (!decodedToken) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      }
  
      const userId = decodedToken.userId;
      const body = await req.json();
      const { deleteCommunityId } = body;
  
      if (!deleteCommunityId) {
        return NextResponse.json(
          { error: "Community ID is required" },
          { status: 400 }
        );
      }
  
      // Delete the community from the database
      const deletedCommunity = await prisma.community.delete({
        where: { id: deleteCommunityId },
      });
  
      return NextResponse.json(deletedCommunity, { status: 200 });
    } catch (error) {
      console.error("Error deleting community:", error);
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 500 }
      );
    }
  }
  