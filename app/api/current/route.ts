import { auth } from "@/auth";
import prisma from "@/lib/prismadb";

export async function GET() {
  const session = await auth();
  
  // Check if user is signed in
  if (!session?.user?.email) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User is not signed in",
      }),
      { status: 401 } // Unauthorized
    );
  }

  // Find the current user in the database
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  // Check if the user exists in the database
  if (!currentUser) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User not found in the database",
      }),
      { status: 404 } // Not Found
    );
  }

  // Return the current user details
  return new Response(
    JSON.stringify({
      success: true,
      message: "User retrieved successfully",
      currentUser,
    }),
    { status: 200 } // OK
  );
}
