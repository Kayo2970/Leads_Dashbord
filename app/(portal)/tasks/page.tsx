import { getTasks, createTask, updateTaskStatus, deleteTask, updateTaskAssigneeRole, removeTaskAssignee } from "@/app/actions/tasks";
import { getEvents } from "@/app/actions/events";
import { getMembers } from "@/app/actions/members";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, CalendarDays, User, Plus, Pencil, SortAsc, Filter, ListTodo, Users, Trash2, Shield, Crown, UserMinus } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TasksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentSort = (params.sort as string) || "createdAt";
  const currentFilter = (params.filter as string) || "all";

  const tasks = await getTasks({ sort: currentSort, filter: currentFilter });
  const events = await getEvents();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter uppercase italic">Tasks Management</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Multi-member assignments & leadership controls. ({tasks.length} active)
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
            {["all", "pending", "in_progress", "completed"].map((f) => (
              <Link 
                key={f}
                href={`/tasks?sort=${currentSort}&filter=${f}`}
                className={cn(
                  "px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all",
                  currentFilter === f ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {f.replace("_", " ")}
              </Link>
            ))}
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-full shadow-xl shadow-primary/10">
                <Plus className="mr-2 h-4 w-4" />
                Assign Task
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/10 sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase italic tracking-tighter">New Task Assignment</DialogTitle>
                <DialogDescription className="text-xs font-medium">Link to an event and assign multiple team members with roles.</DialogDescription>
              </DialogHeader>
              <form action={createTask} className="space-y-6 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-[10px] uppercase font-black text-primary">Task Title</Label>
                      <Input id="title" name="title" required placeholder="e.g. Design Banners" className="bg-background/50 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventId" className="text-[10px] uppercase font-black text-primary">Link to Event</Label>
                      <select id="eventId" name="eventId" className="flex h-10 w-full rounded-md border bg-background/50 px-3 py-2 text-sm">
                        <option value="">General Task (Global)</option>
                        {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline" className="text-[10px] uppercase font-black text-primary">Deadline</Label>
                      <Input id="deadline" name="deadline" type="datetime-local" required className="bg-background/50 h-10" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority" className="text-[10px] uppercase font-black text-primary">Priority</Label>
                      <select id="priority" name="priority" className="flex h-10 w-full rounded-md border bg-background/50 px-3 py-2 text-sm">
                        <option value="low">Low</option>
                        <option value="medium" selected>Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-[10px] uppercase font-black text-primary">Assign Team (Select Multiple)</Label>
                    <div className="h-[250px] overflow-y-auto rounded-xl border border-white/5 bg-black/20 p-2 space-y-1 custom-scrollbar">
                      {members.map(m => (
                        <label key={m.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
                          <input type="checkbox" name="assigneeIds" value={m.id} className="h-4 w-4 rounded border-white/20 bg-transparent text-primary focus:ring-primary" />
                          <div className="flex items-center gap-2 overflow-hidden">
                             <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[8px] font-bold shrink-0">{m.fullName[0]}</div>
                             <span className="text-xs font-bold truncate group-hover:text-primary transition-colors">{m.fullName}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                    <p className="text-[10px] text-muted-foreground italic">Tip: You can assign specific roles like 'Lead' after creating the task.</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-[10px] uppercase font-black text-primary">Instructions</Label>
                  <Textarea id="description" name="description" placeholder="Full details for the team..." className="bg-background/50 min-h-[100px]" />
                </div>

                <Button type="submit" className="w-full h-12 font-black uppercase tracking-widest italic">Initialize Task</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tasks.map((task) => (
          <Card key={task.id} className="glass-card flex flex-col hover:border-primary/50 transition-all duration-300 group relative overflow-hidden shadow-2xl">
            <div className={cn(
              "absolute top-0 right-0 w-32 h-1",
              task.priority === "high" ? "bg-destructive shadow-[0_0_15px_rgba(239,68,68,0.5)]" :
              task.priority === "medium" ? "bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" :
              "bg-primary/40"
            )} />

            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-xl font-black uppercase italic tracking-tighter group-hover:text-primary transition-colors">
                    {task.title}
                  </CardTitle>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border",
                      task.status === "completed" ? "bg-green-500/10 text-green-400 border-green-500/20" :
                      task.status === "in_progress" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    )}>
                      {task.status.replace("_", " ")}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60">
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full">
                        <Users className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-white/10">
                       <DialogHeader>
                          <DialogTitle className="uppercase italic font-black">Team Control: {task.title}</DialogTitle>
                          <DialogDescription>Assign roles and manage task visibility.</DialogDescription>
                       </DialogHeader>
                       <div className="space-y-4 mt-4">
                          {task.assignees.map((as: any) => (
                            <div key={as.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                               <div className="flex items-center gap-3">
                                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-black">{as.user.fullName[0]}</div>
                                  <div>
                                     <p className="text-xs font-black uppercase">{as.user.fullName}</p>
                                     <p className="text-[9px] font-bold text-muted-foreground uppercase">{as.role}</p>
                                  </div>
                               </div>
                               <div className="flex gap-2">
                                  <form action={updateTaskAssigneeRole.bind(null, as.id, as.role === "LEAD" ? "MEMBER" : "LEAD")}>
                                     <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full hover:text-primary">
                                        {as.role === "LEAD" ? <Crown className="h-3.5 w-3.5 text-primary" /> : <Shield className="h-3.5 w-3.5" />}
                                     </Button>
                                  </form>
                                  <form action={removeTaskAssignee.bind(null, as.id)}>
                                     <Button size="icon" variant="ghost" className="h-7 w-7 rounded-full hover:text-destructive">
                                        <UserMinus className="h-3.5 w-3.5" />
                                     </Button>
                                  </form>
                               </div>
                            </div>
                          ))}
                          {task.assignees.length === 0 && <p className="text-center py-4 text-xs italic text-muted-foreground">No assignees yet.</p>}
                       </div>
                    </DialogContent>
                  </Dialog>

                  <form action={deleteTask.bind(null, task.id)}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive rounded-full">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
              <CardDescription className="line-clamp-2 mt-3 text-[11px] font-medium leading-relaxed italic opacity-80">{task.description}</CardDescription>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col justify-end space-y-4 pt-4">
              <div className="flex flex-col gap-2">
                {task.event && (
                  <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 p-2 rounded-lg border border-primary/10">
                    <CalendarDays className="mr-2 h-3.5 w-3.5" />
                    <span className="truncate">{task.event.name}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex -space-x-2 overflow-hidden">
                    {task.assignees.slice(0, 5).map((as: any) => (
                      <div key={as.id} className={cn(
                        "h-7 w-7 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-black",
                        as.role === "LEAD" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      )} title={as.user.fullName}>
                        {as.user.fullName[0]}
                      </div>
                    ))}
                    {task.assignees.length > 5 && (
                      <div className="h-7 w-7 rounded-full border-2 border-background bg-black/40 flex items-center justify-center text-[8px] font-bold">
                        +{task.assignees.length - 5}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Deadline</p>
                    <p className="text-[11px] font-black text-foreground uppercase tracking-tighter">
                      {task.deadline ? new Date(task.deadline).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : "No Date"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                 <form action={updateTaskStatus.bind(null, task.id, "pending")} className="w-full">
                    <button className={cn("w-full py-1.5 text-[8px] font-black uppercase tracking-tighter rounded-l-md border border-white/5 transition-all", task.status === "pending" ? "bg-yellow-500/20 text-yellow-500" : "hover:bg-white/5")}>Pending</button>
                 </form>
                 <form action={updateTaskStatus.bind(null, task.id, "in_progress")} className="w-full">
                    <button className={cn("w-full py-1.5 text-[8px] font-black uppercase tracking-tighter border-y border-white/5 transition-all", task.status === "in_progress" ? "bg-blue-500/20 text-blue-500" : "hover:bg-white/5")}>Active</button>
                 </form>
                 <form action={updateTaskStatus.bind(null, task.id, "completed")} className="w-full">
                    <button className={cn("w-full py-1.5 text-[8px] font-black uppercase tracking-tighter rounded-r-md border border-white/5 transition-all", task.status === "completed" ? "bg-green-500/20 text-green-500" : "hover:bg-white/5")}>Done</button>
                 </form>
              </div>
            </CardContent>
          </Card>
        ))}

        {tasks.length === 0 && (
          <div className="col-span-full py-24 text-center glass-card rounded-3xl border-dashed border-white/10">
            <ListTodo className="mx-auto h-20 w-20 text-muted-foreground/10 mb-6" />
            <h3 className="text-2xl font-black uppercase italic text-muted-foreground">Clean Slate</h3>
            <p className="text-sm text-muted-foreground mt-2 font-medium italic">No tasks match your current view.</p>
          </div>
        )}
      </div>
    </div>
  );
}
