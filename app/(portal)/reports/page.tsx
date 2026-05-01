import { getEvents } from "@/app/actions/events";
import { getMembers } from "@/app/actions/members";
import ReportClient from "./report-client";

export default async function ReportsPage() {
  const events = await getEvents();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Generate targeted Excel exports for events, individuals, or the entire organization.
        </p>
      </div>

      <ReportClient events={events} members={members} />
    </div>
  );
}
