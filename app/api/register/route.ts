import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const { username, email, password, name } = await request.json();
    if (!username || !email || !password || !name) {
      return new Response("All credentials required", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        hashedPassword,
        // profileImage:'https://images.pexels.com/photos/13016654/pexels-photo-13016654.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        user,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect(); // Make sure to close the Prisma client connection
  }
}
