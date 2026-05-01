import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "overall";
  const eventId = searchParams.get("eventId");
  const userId = searchParams.get("userId");

  try {
    let reportData: any[] = [];
    let filename = "LEADS_Report.xlsx";

    if (type === "event" && eventId) {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          tasks: {
            include: {
              ratings: { include: { subject: true } }
            }
          }
        }
      });

      if (!event) throw new Error("Event not found");
      filename = `Event_Report_${event.name.replace(/\s+/g, "_")}.xlsx`;

      // Extract all ratings linked to this event's tasks
      event.tasks.forEach(task => {
        task.ratings.forEach(rating => {
          reportData.push({
            "Member": rating.subject.fullName,
            "Task": task.title,
            "Overall Score": rating.score,
            "Communication": rating.communication,
            "Punctuality": rating.punctuality,
            "Quality": rating.quality,
            "Feedback": rating.feedback,
            "Date": rating.createdAt.toISOString().split("T")[0]
          });
        });
      });
    } else if (type === "person" && userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          receivedRatings: { include: { task: { include: { event: true } } } }
        }
      });

      if (!user) throw new Error("User not found");
      filename = `Member_Report_${user.fullName.replace(/\s+/g, "_")}.xlsx`;

      reportData = user.receivedRatings.map(r => ({
        "Task": r.task?.title || "General",
        "Event": r.task?.event?.name || "N/A",
        "Score": r.score,
        "Communication": r.communication,
        "Punctuality": r.punctuality,
        "Quality": r.quality,
        "Feedback": r.feedback,
        "Date": r.createdAt.toISOString().split("T")[0]
      }));
    } else {
      // Overall Master Report
      const users = await prisma.user.findMany({
        include: {
          committee: true,
          receivedRatings: true,
          contributions: true,
        }
      });

      filename = "Master_Performance_Report.xlsx";
      reportData = users.map(user => {
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
          "Avg Score": avgRating.toFixed(2),
          "Contributions": user.contributions.length,
          "Joined": user.createdAt.toISOString().split("T")[0]
        };
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(reportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });

    return new NextResponse(excelBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json({ error: "Failed to generate report" }, { status: 500 });
  }
}
