import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return new Response(
      JSON.stringify({
        success: true,
        message: "Users fetched successfully",
        users,
      }),
      { status: 200, headers: { "Content-type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error while getting users",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
