import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        committee: true,
        receivedRatings: {
          include: { task: true }
        },
        contributions: true,
      }
    });

    const reportData = users.map(user => {
      // Calculate average rating
      const ratings = user.receivedRatings;
      const avgRating = ratings.length > 0 
        ? ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length 
        : 0;

      return {
        "Full Name": user.fullName,
        "Email": user.email,
        "Role": user.role.replace("_", " ").toUpperCase(),
        "Committee": user.committee?.name || "None",
        "Total Tasks Rated": ratings.length,
        "Average Rating (Out of 5)": avgRating.toFixed(2),
        "Total Contributions Logged": user.contributions.length,
        "Joined At": user.createdAt.toISOString().split("T")[0]
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Performance Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Disposition": 'attachment; filename="LEADS_Performance_Report.xlsx"',
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
