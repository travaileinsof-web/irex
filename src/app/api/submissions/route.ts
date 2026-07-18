import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/submissions — admin only, list all submissions
export async function GET(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const type = searchParams.get("type");

  const where: { status?: string; type?: string } = {};
  if (status) where.status = status;
  if (type) where.type = type;

  const submissions = await db.submission.findMany({
    where,
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(submissions);
}

// POST /api/submissions — public, submit form (product inquiry, contact, career, donation)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, productId, name, email, phone, company, subject, message } = body;

    if (!type || !name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: type, name, email, message" },
        { status: 400 }
      );
    }

    const submission = await db.submission.create({
      data: {
        type,
        productId: productId || null,
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject: subject || null,
        message,
        status: "new",
      },
      include: { product: true },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (err) {
    console.error("Submission error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
