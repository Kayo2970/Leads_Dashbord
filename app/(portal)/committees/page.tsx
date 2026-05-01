import { getCommittees, createCommittee, assignMemberToCommittee, removeMemberFromCommittee } from "@/app/actions/committees";
import { getMembers } from "@/app/actions/members";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Users, CheckSquare, Plus, X, UserPlus } from "lucide-react";

export default async function CommitteesPage() {
  const committees = await getCommittees();
  const members = await getMembers();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Committees</h1>
          <p className="text-muted-foreground mt-1">
            View and manage organizational committees and their members.
          </p>
        </div>

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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{committee.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{committee.description || "Official Committee"}</CardDescription>
                  </div>
                </div>
                
                {/* Add Member to this Committee */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="glass-card border-white/10 sm:max-w-[400px]">
                    <DialogHeader>
                      <DialogTitle>Add to {committee.name}</DialogTitle>
                      <DialogDescription>Select a member to join this committee.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-2 mt-4 max-h-[300px] overflow-y-auto pr-2">
                      {members.filter(m => m.committeeId !== committee.id).map(m => (
                        <form key={m.id} action={assignMemberToCommittee.bind(null, committee.id, m.id)}>
                          <button type="submit" className="w-full flex items-center justify-between p-2 rounded-md hover:bg-white/5 border border-transparent hover:border-white/10 transition-all text-sm group">
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px]">
                                {m.fullName.charAt(0)}
                              </div>
                              <span className="font-medium">{m.fullName}</span>
                            </div>
                            <Plus className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                          </button>
                        </form>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
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
                  <span className="font-medium">{committee.tasks?.length || 0} Tasks</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Committee Members</h4>
                <div className="space-y-2">
                  {committee.users?.map((user) => (
                    <div key={user.id} className="flex items-center justify-between text-sm p-2 rounded-md bg-white/5 border border-white/5 group">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] text-primary">
                          {user.fullName.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium block">{user.fullName}</span>
                          <span className="text-[9px] text-muted-foreground uppercase">{user.designation || "Member"}</span>
                        </div>
                      </div>
                      <form action={removeMemberFromCommittee.bind(null, user.id)}>
                        <Button type="submit" variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-all">
                          <X className="h-3 w-3" />
                        </Button>
                      </form>
                    </div>
                  ))}
                  {(!committee.users || committee.users.length === 0) && (
                    <p className="text-xs text-muted-foreground italic text-center py-4">No members assigned yet.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
