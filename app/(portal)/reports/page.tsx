"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DownloadCloud, FileText } from "lucide-react";

export default function ReportsPage() {
  const handleExport = () => {
    window.location.href = "/api/export";
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground mt-1">
          Generate and export performance reports for the LEADS Centre.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <CardTitle>Master Performance Excel</CardTitle>
            </div>
            <CardDescription>
              Export a complete Excel spreadsheet containing every member's total tasks, average rating out of 5, and logged contributions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport} className="w-full sm:w-auto">
              <DownloadCloud className="mr-2 h-4 w-4" />
              Download .xlsx
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
