import { getRatings, createRating } from "@/app/actions/ratings";
import { getMembers } from "@/app/actions/members";
import { getTasks } from "@/app/actions/tasks";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star, MessageSquare, Target, User, Plus } from "lucide-react";

export default async function RatingsPage() {
  const ratings = await getRatings();
  const members = await getMembers();
  const tasks = await getTasks();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Performance & Ratings</h1>
          <p className="text-muted-foreground mt-1">
            HR benchmarking, overall feedback, and event performance tracking.
          </p>
        </div>
        
        {/* New Rating Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Log Performance
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Log Performance Rating</DialogTitle>
              <DialogDescription>
                Provide HR-style benchmarking and feedback for a member.
              </DialogDescription>
            </DialogHeader>
            <form action={createRating} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="subjectId">Member (Trainee / Core)</Label>
                <select id="subjectId" name="subjectId" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option value="">Select Member</option>
                  {members.map(m => (
                    <option key={m.id} value={m.id}>{m.fullName} ({m.role.replace("_", " ")})</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="taskId">Related Task (Optional)</Label>
                <select id="taskId" name="taskId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <option value="">General Feedback</option>
                  {tasks.map(t => (
                    <option key={t.id} value={t.id}>{t.title} {t.event ? `(${t.event.name})` : ""}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="score">Overall Score (1-5)</Label>
                <Input id="score" name="score" type="number" min="1" max="5" required placeholder="e.g. 4" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="feedback">Detailed Feedback</Label>
                <Textarea id="feedback" name="feedback" required placeholder="How did they perform? What needs improvement?" className="bg-background/50" />
              </div>

              <Button type="submit" className="w-full">Submit Rating</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {ratings.map((rating) => (
          <Card key={rating.id} className="glass-card flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{rating.subject.fullName}</CardTitle>
                    <span className="text-xs text-muted-foreground">{rating.subject.role.replace("_", " ")}</span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < rating.score ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30"}`} />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-3">
              <div className="text-sm bg-black/20 p-3 rounded-md text-muted-foreground italic relative">
                <MessageSquare className="absolute right-2 top-2 h-3 w-3 opacity-30" />
                "{rating.feedback}"
              </div>
              
              <div className="mt-auto space-y-1">
                {rating.task && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Target className="mr-2 h-3 w-3 text-primary" />
                    Task: {rating.task.title}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-white/5">
                  <span>By: {rating.giver.fullName}</span>
                  <span>{rating.createdAt.toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {ratings.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <Star className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No ratings logged</h3>
            <p className="text-sm text-muted-foreground mt-1">Start benchmarking employee performance.</p>
          </div>
        )}
      </div>
    </div>
  );
}
