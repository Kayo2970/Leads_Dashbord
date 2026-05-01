import { getEvents, createEvent, assignTeamToEvent, removeFromEventTeam } from "@/app/actions/events";
import { getMembers } from "@/app/actions/members";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, MapPin, Clock, Plus, Users, ClipboardList, UserPlus, X, ExternalLink, Info } from "lucide-react";

export default async function EventsPage() {
  const events = await getEvents();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic">Events</h1>
          <p className="text-muted-foreground mt-1 text-xs md:text-sm font-medium">
            Manage upcoming summits, workshops, and portal events.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="rounded-full shadow-xl shadow-primary/10 w-full sm:w-auto font-black uppercase tracking-widest text-[10px] h-10">
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
              <DialogDescription>
                Schedule a new event. This will be visible to all members.
              </DialogDescription>
            </DialogHeader>
            <form action={createEvent} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Event Name</Label>
                <Input id="name" name="name" required placeholder="e.g. Bharat Lead Summit" className="bg-background/50" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" name="date" type="date" required className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" name="time" type="time" required className="bg-background/50" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="venue">Venue</Label>
                <Input id="venue" name="venue" required placeholder="e.g. Main Auditorium" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description & Details</Label>
                <Textarea id="description" name="description" placeholder="Provide full details here..." className="bg-background/50" />
              </div>
              <Button type="submit" className="w-full">Create Event</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="glass-card hover:border-primary/50 transition-all group overflow-hidden">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl group-hover:text-primary transition-colors">{event.name}</CardTitle>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:bg-primary/20">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar">
                    <DialogHeader>
                      <DialogTitle className="text-2xl font-bold">{event.name}</DialogTitle>
                      <DialogDescription>Complete event overview and management.</DialogDescription>
                    </DialogHeader>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      {/* Left Column: Info & Tasks */}
                      <div className="space-y-6">
                        <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center">
                            <Info className="mr-2 h-4 w-4" /> Basic Info
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                              {event.date.toDateString()}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Clock className="mr-2 h-4 w-4 text-primary" />
                              {event.time || "TBD"}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="mr-2 h-4 w-4 text-primary" />
                              {event.venue || "TBD"}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground border-t border-white/5 pt-3 mt-3 italic">
                            {event.description || "No description provided."}
                          </p>
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center">
                            <ClipboardList className="mr-2 h-4 w-4" /> Related Tasks ({event.tasks.length})
                          </h3>
                          <div className="space-y-2 max-h-[300px] overflow-y-auto no-scrollbar">
                            {event.tasks.map(task => (
                              <div key={task.id} className="p-3 rounded-lg bg-white/5 border border-white/10 flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-bold">{task.title}</p>
                                  <p className="text-[10px] text-muted-foreground">{task.assignee?.fullName || "Unassigned"}</p>
                                </div>
                                <span className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase ${
                                  task.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {task.status}
                                </span>
                              </div>
                            ))}
                            {event.tasks.length === 0 && <p className="text-xs text-muted-foreground italic">No tasks linked to this event.</p>}
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Team Management */}
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center">
                            <Users className="mr-2 h-4 w-4" /> Event Team ({event.teamAssignments.length})
                          </h3>
                          
                          <div className="grid gap-2 max-h-[300px] overflow-y-auto no-scrollbar">
                            {event.teamAssignments.map(assignment => (
                              <div key={assignment.id} className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold">
                                    {assignment.user.fullName[0]}
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase text-primary">{assignment.user.fullName}</p>
                                    <p className="text-[10px] text-muted-foreground font-bold">{assignment.designation || "Support Team"}</p>
                                  </div>
                                </div>
                                <form action={removeFromEventTeam.bind(null, event.id, assignment.userId)}>
                                  <button type="submit" className="p-1 text-muted-foreground hover:text-destructive">
                                    <X className="h-4 w-4" />
                                  </button>
                                </form>
                              </div>
                            ))}
                            {event.teamAssignments.length === 0 && <p className="text-xs text-muted-foreground italic">No team members assigned specifically to this event.</p>}
                          </div>

                          <div className="pt-4 border-t border-white/10">
                            <h4 className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-3 flex items-center">
                              <UserPlus className="mr-2 h-3 w-3" /> Assign to Event
                            </h4>
                            <form action={assignTeamToEvent} className="space-y-3">
                              <input type="hidden" name="eventId" value={event.id} />
                              <div className="space-y-2">
                                <select name="userId" required className="flex h-9 w-full rounded-md border bg-background/50 px-3 py-1 text-sm ring-offset-background">
                                  <option value="">Select Member...</option>
                                  {members.map(m => (
                                    <option key={m.id} value={m.id}>{m.fullName}</option>
                                  ))}
                                </select>
                                <Input name="designation" placeholder="Role (e.g. Stage Manager)" className="h-9 bg-background/50" />
                              </div>
                              <Button type="submit" size="sm" className="w-full">Assign to Team</Button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription className="line-clamp-2 mt-1">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground bg-black/20 p-2 rounded-lg border border-white/5">
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                {event.date.toDateString()}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center text-[11px] text-muted-foreground bg-black/20 p-2 rounded-lg border border-white/5">
                  <Clock className="mr-2 h-3.5 w-3.5 text-primary" />
                  {event.time || "TBD"}
                </div>
                <div className="flex items-center text-[11px] text-muted-foreground bg-black/20 p-2 rounded-lg border border-white/5 overflow-hidden">
                  <MapPin className="mr-2 h-3.5 w-3.5 text-primary shrink-0" />
                  <span className="truncate">{event.venue || "TBD"}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center">
                <div className="flex -space-x-2">
                  {event.teamAssignments.slice(0, 3).map(ta => (
                    <div key={ta.id} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold">
                      {ta.user.fullName[0]}
                    </div>
                  ))}
                  {event.teamAssignments.length > 3 && (
                    <div className="h-6 w-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                      +{event.teamAssignments.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black px-2 py-1 bg-primary/10 text-primary rounded-md uppercase tracking-tighter">
                    {event.tasks.length} Tasks
                  </span>
                  <span className="text-[10px] font-black px-2 py-1 bg-secondary/10 text-secondary-foreground rounded-md uppercase tracking-tighter">
                    {event.teamAssignments.length} Team
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {events.length === 0 && (
          <div className="col-span-full py-20 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <CalendarDays className="mx-auto h-16 w-16 text-muted-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No events scheduled</h3>
            <p className="text-sm text-muted-foreground mt-2">Start by creating a new summit or workshop.</p>
          </div>
        )}
      </div>
    </div>
  );
}
