import { getTasks, createTask } from "@/app/actions/tasks";
import { getEvents } from "@/app/actions/events";
import { getMembers } from "@/app/actions/members";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, CalendarDays, User, Plus } from "lucide-react";

export default async function TasksPage() {
  const tasks = await getTasks();
  const events = await getEvents();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Assign and track tasks across committees and members.
          </p>
        </div>
        
        {/* New Task Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Assign Task
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Assign New Task</DialogTitle>
              <DialogDescription>
                Create a task, link it to an event, and assign it to a member.
              </DialogDescription>
            </DialogHeader>
            <form action={createTask} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" name="title" required placeholder="e.g. Design Banners" className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="eventId">Link to Event</Label>
                <select id="eventId" name="eventId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">No Event (General Task)</option>
                  {events.map(e => (
                    <option key={e.id} value={e.id}>{e.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">Assign To Member</Label>
                <select id="assignedTo" name="assignedTo" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                  <option value="">Unassigned</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.role.replace("_", " ")})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input id="deadline" name="deadline" type="datetime-local" required className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Details / Instructions</Label>
                <Textarea id="description" name="description" placeholder="What exactly needs to be done?" className="bg-background/50" />
              </div>

              <Button type="submit" className="w-full">Assign Task</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="glass-card flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{task.title}</CardTitle>
                <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                  task.status === "completed" ? "bg-green-500/20 text-green-400" :
                  task.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                  "bg-yellow-500/20 text-yellow-400"
                }`}>
                  {task.status.replace("_", " ")}
                </span>
              </div>
              <CardDescription className="line-clamp-2 mt-2">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end space-y-3">
              {task.event && (
                <div className="flex items-center text-sm text-muted-foreground bg-primary/10 p-2 rounded-md">
                  <CalendarDays className="mr-2 h-4 w-4 text-primary" />
                  <span className="truncate">{task.event.name}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <User className="mr-2 h-4 w-4 text-primary" />
                  <span className="truncate max-w-[120px]">{task.assignee?.fullName || "Unassigned"}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Due: {task.deadline?.toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <CheckSquare className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No tasks assigned</h3>
            <p className="text-sm text-muted-foreground mt-1">Create your first task to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
