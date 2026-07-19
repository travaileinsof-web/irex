import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/faq — public, list published
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  const where = (all || includeUnpublished) ? {} : { published: true };
  const items = await db.faqItem.findMany({
    where,
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

// POST /api/faq — admin only, create
export async function POST(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const item = await db.faqItem.create({ data: body });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("Create faq error:", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
