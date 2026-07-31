export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await db.setting.findMany();
    // Convert to a dictionary: { [key]: boolean }
    const visibilityMap = settings.reduce((acc, curr) => {
      if (curr.key.startsWith("page_") && curr.key.endsWith("_visible")) {
        const section = curr.key.replace("page_", "").replace("_visible", "");
        acc[section] = curr.value === "true";
      }
      return acc;
    }, {} as Record<string, boolean>);

    return NextResponse.json(visibilityMap);
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    
    // Body should be an object like { blog: false, team: true, etc. }
    const updates = Object.entries(body).map(([key, value]) => ({
      key: `page_${key}_visible`,
      value: String(value),
    }));

    // Update each setting (upsert)
    for (const update of updates) {
      await db.setting.upsert({
        where: { key: update.key },
        update: { value: update.value },
        create: { key: update.key, value: update.value },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to update settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
