export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/categories/[id] — public
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await db.category.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// PUT /api/categories/[id] — admin only, update
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    const { id: _id, ...dataToUpdate } = await request.json();
    const item = await db.category.update({
      where: { id },
      data: dataToUpdate,
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error("Update categories error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/categories/[id] — admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await db.category.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete categories error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
