import { getCommittees, createCommittee } from "@/app/actions/committees";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, CheckSquare, Plus } from "lucide-react";

export default async function CommitteesPage() {
  const committees = await getCommittees();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Committees</h1>
          <p className="text-muted-foreground mt-1">
            View and manage organizational committees and their members.
          </p>
        </div>

        {/* New Committee Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Committee
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Committee</DialogTitle>
              <DialogDescription>
                Add a new functional committee to the LEADS structure.
              </DialogDescription>
            </DialogHeader>
            <form action={createCommittee} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Committee Name</Label>
                <Input id="name" name="name" required placeholder="e.g. Logistics & Operations" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="What is this committee responsible for?" className="bg-background/50" />
              </div>
              <Button type="submit" className="w-full">Create Committee</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {committees.map((committee) => (
          <Card key={committee.id} className="glass-card overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>{committee.name}</CardTitle>
                  <CardDescription className="line-clamp-1">{committee.description || "Official LEADS Committee"}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="font-medium">{committee.users?.length || 0} Members</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckSquare className="h-4 w-4 text-primary" />
                  <span className="font-medium">{committee.tasks?.length || 0} Assigned Tasks</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Committee Members</h4>
                <div className="space-y-2">
                  {committee.users?.map((user) => (
                    <div key={user.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-white/5 border border-white/5">
                      <span className="font-medium">{user.fullName}</span>
                      <span className="text-[10px] uppercase px-2 py-0.5 bg-primary/20 text-primary rounded-sm font-bold">
                        {user.role.replace("_", " ")}
                      </span>
                    </div>
                  ))}
                  {(!committee.users || committee.users.length === 0) && (
                    <p className="text-xs text-muted-foreground italic">No members assigned yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {committees.length === 0 && (
          <div className="col-span-full py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <Shield className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No committees found</h3>
            <p className="text-sm text-muted-foreground mt-1">Create your first committee to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
