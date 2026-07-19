import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

// GET /api/dashboard/stats — admin only
export async function GET(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;

  const [
    products,
    categories,
    projects,
    teamMembers,
    blogPosts,
    events,
    jobOpenings,
    donationTiers,
    faqItems,
    partners,
    submissions,
    newSubmissions,
  ] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.project.count(),
    db.teamMember.count(),
    db.blogPost.count(),
    db.event.count(),
    db.jobOpening.count(),
    db.donationTier.count(),
    db.faqItem.count(),
    db.partner.count(),
    db.submission.count(),
    db.submission.count({ where: { status: "new" } }),
  ]);

  return NextResponse.json({
    products,
    categories,
    projects,
    teamMembers,
    blogPosts,
    events,
    jobOpenings,
    donationTiers,
    faqItems,
    partners,
    submissions,
    newSubmissions,
  });
}
