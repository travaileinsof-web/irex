export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const all = searchParams.get("all") === "true";
  const includeUnpublished = searchParams.get("includeUnpublished") === "true";

  const where = (all || includeUnpublished) ? {} : { published: true };
  const items = await db.service.findMany({
    where,
    orderBy: { order: "asc" },
  });
  return NextResponse.json(items);
}

export async function POST(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id: _id, ...dataToCreate } = await request.json();
    const item = await db.service.create({
      data: dataToCreate,
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("Create service error:", err);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
