import { getTasks, createTask, updateTask } from "@/app/actions/tasks";
import { getEvents } from "@/app/actions/events";
import { getMembers } from "@/app/actions/members";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, CalendarDays, User, Plus, Pencil, SortAsc, Filter, ListTodo } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TasksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentSort = (params.sort as string) || "deadline_asc";
  const currentFilter = (params.filter as string) || "all";

  const tasks = await getTasks({ sort: currentSort, filter: currentFilter });
  const events = await getEvents();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground mt-1">
            Assign and track tasks across committees and members. ({tasks.length} total)
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
            <Link 
              href={`/tasks?sort=${currentSort}&filter=all`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "all" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </Link>
            <Link 
              href={`/tasks?sort=${currentSort}&filter=pending`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "pending" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              Pending
            </Link>
            <Link 
              href={`/tasks?sort=${currentSort}&filter=in_progress`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "in_progress" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              Active
            </Link>
            <Link 
              href={`/tasks?sort=${currentSort}&filter=completed`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "completed" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              Done
            </Link>
          </div>

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
                  <select id="eventId" name="eventId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="">No Event (General Task)</option>
                    {events.map(e => (
                      <option key={e.id} value={e.id}>{e.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assignedTo">Assign To Member</Label>
                  <select id="assignedTo" name="assignedTo" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="">Unassigned</option>
                    {members.map(m => (
                      <option key={m.id} value={m.id}>{m.fullName} ({m.role.split('_')[0]})</option>
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
      </div>

      <div className="flex items-center gap-4 py-2 border-b border-white/5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter whitespace-nowrap">Sort By:</span>
        <Link 
          href={`/tasks?sort=deadline_asc&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "deadline_asc" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <CalendarDays className="h-3 w-3" />
          Earliest Deadline
        </Link>
        <Link 
          href={`/tasks?sort=deadline_desc&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "deadline_desc" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <CalendarDays className="h-3 w-3 rotate-180" />
          Latest Deadline
        </Link>
        <Link 
          href={`/tasks?sort=title&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "title" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <SortAsc className="h-3 w-3" />
          Title (A-Z)
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="glass-card flex flex-col hover:border-primary/50 transition-colors group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">{task.title}</CardTitle>
                  <div className="flex gap-2">
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      task.status === "completed" ? "bg-green-500/20 text-green-400" :
                      task.status === "in_progress" ? "bg-blue-500/20 text-blue-400" :
                      "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Edit Task Details</DialogTitle>
                      <DialogDescription>Update the title, status, or assignee for this task.</DialogDescription>
                    </DialogHeader>
                    <form action={updateTask.bind(null, task.id)} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Task Title</Label>
                        <Input id="title" name="title" defaultValue={task.title} required className="bg-background/50" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="status">Status</Label>
                          <select id="status" name="status" defaultValue={task.status} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assignedTo">Reassign To</Label>
                          <select id="assignedTo" name="assignedTo" defaultValue={task.assignedTo || ""} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                            <option value="">Unassigned</option>
                            {members.map(m => (
                              <option key={m.id} value={m.id}>{m.fullName}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="deadline">Deadline</Label>
                        <Input id="deadline" name="deadline" type="datetime-local" defaultValue={task.deadline ? new Date(task.deadline.getTime() - task.deadline.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ""} required className="bg-background/50" />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description">Details</Label>
                        <Textarea id="description" name="description" defaultValue={task.description || ""} className="bg-background/50" />
                      </div>

                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription className="line-clamp-2 mt-2 text-xs">{task.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-end space-y-3">
              {task.event && (
                <div className="flex items-center text-xs text-muted-foreground bg-primary/10 p-2 rounded-md border border-primary/10">
                  <CalendarDays className="mr-2 h-3.5 w-3.5 text-primary" />
                  <span className="truncate">{task.event.name}</span>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <div className="flex items-center text-xs text-muted-foreground">
                  <User className="mr-1.5 h-3.5 w-3.5 text-primary" />
                  <span className="truncate max-w-[100px]">{task.assignee?.fullName || "Unassigned"}</span>
                </div>
                <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">
                  Due: {task.deadline ? new Date(task.deadline).toLocaleDateString() : "TBD"}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="col-span-full py-20 text-center glass-card rounded-xl border-dashed border-white/20">
            <ListTodo className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-bold text-muted-foreground">No tasks found</h3>
            <p className="text-sm text-muted-foreground mt-2">Try resetting your filters or assigning a new task.</p>
            <Button variant="link" className="mt-4" asChild>
              <Link href="/tasks">Reset Filters</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
