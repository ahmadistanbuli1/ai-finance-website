import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "../../../lib/db";
import { recordSchema } from "@/validations/record.schema";

// 1. GET: Fetch all expense records for the logged-in user
export const GET = async () => {
  try {
    const { userId } = await auth();

    if (!userId)
      return NextResponse.json(
        { error: "Unauthorized: Please sign in first" },
        { status: 401 },
      );

    const records = await prisma.record.findMany({
      where: { userId },
      orderBy: { date: "asc" }, // Ordered chronologically from oldest to newest for the chart
    });

    return NextResponse.json({ records }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expense records:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// 2. POST: Create a new expense record (Existing code remains unchanged)
export const POST = async (req: Request) => {
  try {
    // 1. Authentication Check: Verify user identity on the server
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized: Please sign in first" },
        { status: 401 },
      );
    }

    // 2. Parse and Validate Input using the shared Zod Schema (DRY)
    const body = await req.json();
    const validationResult = recordSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid expense data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { text, price, category, date } = validationResult.data;

    // 3. Integrity Check: Ensure the user exists in our DB before linking a record
    const existingUser = await prisma.user.findUnique({
      where: { clerkUserId: userId },
      select: { clerkUserId: true },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User profile not synced in database yet" },
        { status: 404 },
      );
    }

    // 4. Create the record in Neon PostgreSQL
    const newRecord = await prisma.record.create({
      data: {
        text: text.trim(),
        price,
        category,
        date: new Date(date), // Convert "YYYY-MM-DD" string to JS Date object for Prisma DateTime
        userId, // Safely injected from Clerk session, NEVER from client body
      },
    });

    return NextResponse.json({ record: newRecord }, { status: 201 });
  } catch (error) {
    console.error("Error creating expense record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// 3. DELETE: Remove an existing expense record
export const DELETE = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // الطريقة القياسية: استخراج الـ ID من الرابط /api/records?id=...
    const recordId = req.nextUrl.searchParams.get("id");

    if (!recordId) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    // التأكد من الملكية (Security Check)
    const recordToDelete = await prisma.record.findUnique({
      where: { id: recordId },
    });

    if (!recordToDelete || recordToDelete.userId !== userId) {
      return NextResponse.json(
        { error: "Record not found or unauthorized" },
        { status: 404 },
      );
    }

    // تنفيذ الحذف
    await prisma.record.delete({
      where: { id: recordId },
    });

    // إصلاح الثغرة: يجب إرجاع استجابة بالنجاح 200 OK
    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting expense record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};

// 4. PATCH: Update an existing expense record
export const PATCH = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const recordId = req.nextUrl.searchParams.get("id");
    if (!recordId) {
      return NextResponse.json({ error: "Missing record ID" }, { status: 400 });
    }

    const body = await req.json();

    // Validate incoming data with the same schema
    const validationResult = recordSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Invalid expense data",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { text, price, category, date } = validationResult.data;

    // Security Check: Verify ownership before updating
    const existingRecord = await prisma.record.findUnique({
      where: { id: recordId },
    });

    if (!existingRecord || existingRecord.userId !== userId) {
      return NextResponse.json(
        { error: "Record not found or unauthorized" },
        { status: 404 },
      );
    }

    // Perform the update
    const updatedRecord = await prisma.record.update({
      where: { id: recordId },
      data: {
        text: text.trim(),
        price,
        category,
        date: new Date(date),
      },
    });

    return NextResponse.json(
      { record: updatedRecord, message: "Record updated successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating expense record:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
};
