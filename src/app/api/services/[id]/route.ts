export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const { id: _id, ...dataToUpdate } = await request.json();
    const item = await db.service.update({
      where: { id: params.id },
      data: dataToUpdate,
    });
    return NextResponse.json(item);
  } catch (err) {
    console.error("Update service error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    await db.service.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Delete service error:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
