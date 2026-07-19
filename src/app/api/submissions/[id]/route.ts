import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// PUT /api/submissions/[id] — admin, update status (new | read | handled)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const submission = await db.submission.update({
      where: { id },
      data: body,
      include: { product: true },
    });
    return NextResponse.json(submission);
  } catch (err) {
    console.error("Update submission error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

// DELETE /api/submissions/[id] — admin, delete submission
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id } = await params;
    await db.submission.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete submission error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
