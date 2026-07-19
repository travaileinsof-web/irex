import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/projects/[id] — public
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const item = await db.project.findUnique({ where: { id } });
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(item);
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}

// PUT /api/projects/[id] — admin only, update
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const item = await db.project.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error("Update projects error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/projects/[id] — admin only
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete projects error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
