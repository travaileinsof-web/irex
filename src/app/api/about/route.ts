export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { content } from "@/lib/content";

export async function GET(request: NextRequest) {
  try {
    const setting = await db.setting.findUnique({ where: { key: "about_content" } });
    if (setting) {
      return NextResponse.json(JSON.parse(setting.value));
    }
  } catch (err) {
    console.error("GET about error:", err);
  }
  // Default to hardcoded content if not found
  return NextResponse.json({
    fr: content.fr.about,
    en: content.en.about,
  });
}

export async function PUT(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const data = await request.json();
    const setting = await db.setting.upsert({
      where: { key: "about_content" },
      update: { value: JSON.stringify(data) },
      create: { key: "about_content", value: JSON.stringify(data) },
    });
    return NextResponse.json(JSON.parse(setting.value));
  } catch (err) {
    console.error("PUT about error:", err);
    return NextResponse.json({ error: "Failed to update about content" }, { status: 500 });
  }
}
