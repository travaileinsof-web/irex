import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// POST /api/newsletter — public, subscribe an email
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const lang = body?.lang === "en" ? "en" : "fr";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }

    // Upsert: if the email already exists, reactivate it silently
    const subscriber = await db.newsletterSubscriber.upsert({
      where: { email },
      update: { active: true, lang },
      create: { email, lang, active: true },
    });

    return NextResponse.json(
      { ok: true, id: subscriber.id },
      { status: 201 }
    );
  } catch (err) {
    console.error("Newsletter subscribe error:", err);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}

// GET /api/newsletter — admin only, list subscribers
export async function GET(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  const subscribers = await db.newsletterSubscriber.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(subscribers);
}
