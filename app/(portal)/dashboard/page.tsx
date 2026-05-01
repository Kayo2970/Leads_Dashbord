import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckSquare, Star, Clock, PlusCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back. Here is what is happening across LEADS today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Bharat Lead Summit</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 4 committees</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Ratings</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">Logged in the last 7 days</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Star className="h-4 w-4 text-warning fill-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <p className="text-xs text-muted-foreground">+0.3 from last quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 glass-card">
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
            <CardDescription>
              Tasks assigned across committees.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Finalize Sponsorship Deck", committee: "Corporate Relations", status: "In Progress", due: "Today" },
                { title: "Design Social Media Posts", committee: "Design", status: "Pending", due: "Tomorrow" },
                { title: "Book Auditorium for Summit", committee: "Logistics", status: "Completed", due: "Yesterday" },
                { title: "Draft Email Invites", committee: "Content", status: "Pending", due: "Next Week" }
              ].map((task, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground gap-2">
                      <Badge variant="secondary" className="font-normal text-[10px]">{task.committee}</Badge>
                      <span className="flex items-center"><Clock className="mr-1 h-3 w-3" /> {task.due}</span>
                    </div>
                  </div>
                  <Badge 
                    variant={task.status === "Completed" ? "default" : task.status === "In Progress" ? "secondary" : "outline"}
                    className={task.status === "Completed" ? "bg-success hover:bg-success/80" : ""}
                  >
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 glass-card">
          <CardHeader>
            <CardTitle>Announcements</CardTitle>
            <CardDescription>
              Latest updates from the core team.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { title: "Quarterly Review Meetings", date: "May 2, 2026", desc: "Please ensure all pending tasks are updated before the review meetings start next week." },
                { title: "New Design Assets Available", date: "April 28, 2026", desc: "The updated logo package and branding guidelines are now on the shared drive." }
              ].map((ann, i) => (
                <div key={i} className="space-y-1 pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{ann.title}</p>
                    <span className="text-xs text-muted-foreground">{ann.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {ann.desc}
                  </p>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary">
              View All Announcements
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
