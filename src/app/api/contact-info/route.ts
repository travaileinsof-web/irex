export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const safeParse = (str: any, fallback: any) => {
  try { return typeof str === "string" ? JSON.parse(str) : (str || fallback); } catch { return fallback; }
};

// GET /api/contact-info — public
export async function GET() {
  const info = await db.contactInfo.findFirst();
  if (!info) return NextResponse.json(null);
  
  return NextResponse.json({
    ...info,
    phones: safeParse(info.phones, []),
    emails: safeParse(info.emails, []),
    socials: safeParse(info.socials, []),
  });
}

// PUT /api/contact-info — admin only
export async function PUT(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  try {
    const body = await request.json();
    const existing = await db.contactInfo.findFirst();
    
    const dataToSave = {
      address: body.address,
      hours: body.hours,
      hoursEn: body.hoursEn,
      mapUrl: body.mapUrl,
      phones: Array.isArray(body.phones) ? JSON.stringify(body.phones) : "[]",
      emails: Array.isArray(body.emails) ? JSON.stringify(body.emails) : "[]",
      socials: Array.isArray(body.socials) ? JSON.stringify(body.socials) : "[]",
    };

    let info;
    if (existing) {
      info = await db.contactInfo.update({
        where: { id: existing.id },
        data: dataToSave,
      });
    } else {
      info = await db.contactInfo.create({
        data: { id: "contact-info-single", ...dataToSave },
      });
    }
    
    return NextResponse.json({
      ...info,
      phones: safeParse(info.phones, []),
      emails: safeParse(info.emails, []),
      socials: safeParse(info.socials, []),
    });
  } catch (err) {
    console.error("Update contact info error:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
