import { getEvents, createEvent } from "@/app/actions/events";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, MapPin, Clock, Plus } from "lucide-react";

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage upcoming summits, workshops, and portal events.
          </p>
        </div>
        
        {/* New Event Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="glass-card">
            <CardHeader>
              <CardTitle className="text-xl">{event.name}</CardTitle>
              <CardDescription className="line-clamp-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                {event.date.toISOString().split("T")[0]}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-2 h-4 w-4 text-primary" />
                {event.time || "TBD"}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4 text-primary" />
                {event.venue || "TBD"}
              </div>
              
              <div className="pt-4 border-t border-white/10 mt-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Created by {event.creator.fullName}
                </span>
                <span className="text-xs font-medium px-2 py-1 bg-primary/20 text-primary rounded-full">
                  {event.tasks.length} Tasks
                </span>
              </div>
            </CardContent>
          </Card>
        ))}

        {events.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No events scheduled</h3>
            <p className="text-sm text-muted-foreground mt-1">Create your first event to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
