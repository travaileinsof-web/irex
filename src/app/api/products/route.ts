export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/products — public, list published (with category)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  const where = (all || includeUnpublished) ? {} : { published: true };
  const items = await db.product.findMany({
    where,
    include: { category: true },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

// POST /api/products — admin only, create
export async function POST(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { category, id: _id, ...dataToCreate } = await request.json();
    const item = await db.product.create({
      data: dataToCreate,
      include: { category: true },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("Create products error:", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
