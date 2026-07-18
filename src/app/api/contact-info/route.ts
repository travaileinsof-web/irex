import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/contact-info — public
export async function GET() {
  const info = await db.contactInfo.findFirst();
  return NextResponse.json(info);
}

// PUT /api/contact-info — admin only
export async function PUT(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const existing = await db.contactInfo.findFirst();
    let info;
    if (existing) {
      info = await db.contactInfo.update({
        where: { id: existing.id },
        data: body,
      });
    } else {
      info = await db.contactInfo.create({
        data: { id: "contact-info-single", ...body },
      });
    }
    return NextResponse.json(info);
  } catch (err) {
    console.error("Update contact info error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
