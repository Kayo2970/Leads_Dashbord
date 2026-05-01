"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DownloadCloud, FileText, Users, Calendar } from "lucide-react";

interface ReportClientProps {
  events: { id: string; name: string }[];
  members: { id: string; fullName: string }[];
}

export default function ReportClient({ events, members }: ReportClientProps) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedMember, setSelectedMember] = useState("");

  const downloadReport = (type: string, id?: string) => {
    let url = `/api/export?type=${type}`;
    if (type === "event" && id) url += `&eventId=${id}`;
    if (type === "person" && id) url += `&userId=${id}`;
    window.location.href = url;
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Master Report */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Master Report</CardTitle>
          </div>
          <CardDescription>Full organizational performance overview.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => downloadReport("overall")} className="w-full">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Download Master .xlsx
          </Button>
        </CardContent>
      </Card>

      {/* Event Report */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle>Event Report</CardTitle>
          </div>
          <CardDescription>Performance breakdown for a specific event.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Event</Label>
            <select 
              value={selectedEvent} 
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
            >
              <option value="">Choose an event...</option>
              {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <Button 
            onClick={() => downloadReport("event", selectedEvent)} 
            disabled={!selectedEvent}
            className="w-full"
            variant="outline"
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Event Data
          </Button>
        </CardContent>
      </Card>

      {/* Personal Report */}
      <Card className="glass-card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <CardTitle>Member Report</CardTitle>
          </div>
          <CardDescription>Detailed individual performance history.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Member</Label>
            <select 
              value={selectedMember} 
              onChange={(e) => setSelectedMember(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
            >
              <option value="">Choose a member...</option>
              {members.map(m => <option key={m.id} value={m.id}>{m.fullName}</option>)}
            </select>
          </div>
          <Button 
            onClick={() => downloadReport("person", selectedMember)} 
            disabled={!selectedMember}
            className="w-full"
            variant="outline"
          >
            <DownloadCloud className="mr-2 h-4 w-4" />
            Export Personal Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
