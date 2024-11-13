import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params?.userId;
    if (!userId) {
      return Response.json(
        { success: "false", message: "Invalid Id" },
        { status: 500 }
      );
    }
    const existingUser = await prisma.user.findUnique({
        where: {
            id: String(userId), // Ensure userId is a string
        },
    });
    if (!existingUser) {
        return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const followersCount = await prisma.user.count({
        where: {
            followingIds: {
                has: String(userId),
            },
        },
    });

    return NextResponse.json({
        success: true,
        existingUser,
        followersCount,
    });

} catch (error) {
    console.error(error);
    return NextResponse.json({
        success: false,
        message: "An error occurred",
    }, { status: 500 });
}
}