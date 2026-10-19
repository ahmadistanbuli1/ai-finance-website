import { prisma } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async () => {
  // 1. Read session outside try/catch so Next.js 16 Prerender bailout works cleanly
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Fast DB check using userId before calling external Clerk API
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (existingUser) {
      return NextResponse.json({ user: existingUser }, { status: 200 });
    }

    // 3. Only fetch full user details from Clerk if we need to create the DB record
    const user = await currentUser();
    const email = user?.emailAddresses[0]?.emailAddress;

    if (!user || !email) {
      return NextResponse.json(
        { error: "User email is required" },
        { status: 400 },
      );
    }

    const newUser = await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || null,
        email: email,
        imageUrl: user.imageUrl,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in auth sync:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
