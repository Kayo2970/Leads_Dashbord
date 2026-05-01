import { getCommittees, createCommittee, assignMemberToCommittee, removeMemberFromCommittee } from "@/app/actions/committees";
import { getMembers } from "@/app/actions/members";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, UserPlus, X, Shield, LayoutGrid, ChevronDown, Award, Users2, Workflow } from "lucide-react";

export default async function CommitteesPage() {
  const committees = await getCommittees();
  const members = await getMembers();

  const advisory = committees.filter(c => c.type === "ADVISORY");
  const core = committees.filter(c => c.type === "CORE");
  const divisions = committees.filter(c => c.type === "DIVISION");

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organization Structure</h1>
          <p className="text-muted-foreground mt-1">
            Browse the LEADS Next Gen Centre hierarchy and committee assignments.
          </p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10">
              <Plus className="mr-2 h-4 w-4" />
              New Unit
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Committee</DialogTitle>
              <DialogDescription>Add a new unit to the organization structure.</DialogDescription>
            </DialogHeader>
            <form action={createCommittee} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="name">Committee Name</Label>
                <Input id="name" name="name" required placeholder="e.g. Technical Division" className="bg-background/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Category</Label>
                <select id="type" name="type" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                  <option value="DIVISION">Functional Division</option>
                  <option value="CORE">Core Committee</option>
                  <option value="ADVISORY">Advisory/Faculty</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" placeholder="Brief purpose of this committee" className="bg-background/50" />
              </div>
              <Button type="submit" className="w-full">Create Committee</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Advisory & Faculty Section (Expandable/Dropdown type header) */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-xl border border-primary/20">
          <Award className="h-6 w-6 text-primary" />
          <div>
            <h2 className="text-xl font-bold tracking-tight text-primary">Advisory & Faculty Committee</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Leadership & Mentorship</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
             <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-1 rounded tracking-tighter uppercase">{advisory.length} Units</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advisory.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} members={members} />
          ))}
        </div>
      </section>

      {/* Core Committee Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-secondary/10 rounded-xl border border-secondary/20">
          <Shield className="h-6 w-6 text-secondary-foreground" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">Core Executive Committee</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Management & Strategy</p>
          </div>
          <div className="ml-auto">
             <span className="text-[10px] font-black bg-secondary/20 text-secondary-foreground px-2 py-1 rounded tracking-tighter uppercase">{core.length} Units</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {core.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} members={members} />
          ))}
        </div>
      </section>

      {/* Divisions Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl border border-white/10">
          <Workflow className="h-6 w-6 text-muted-foreground" />
          <div>
            <h2 className="text-xl font-bold tracking-tight">Functional Divisions</h2>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">Operations & Trainees</p>
          </div>
          <div className="ml-auto">
             <span className="text-[10px] font-black bg-white/10 text-muted-foreground px-2 py-1 rounded tracking-tighter uppercase">{divisions.length} Units</span>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {divisions.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} members={members} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CommitteeCard({ committee, members }: { committee: any, members: any }) {
  return (
    <Card className="glass-card hover:border-primary/30 transition-all group border-white/5 shadow-xl">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{committee.name}</CardTitle>
            <CardDescription className="text-xs line-clamp-1">{committee.description || `Management of ${committee.name}`}</CardDescription>
          </div>
          <div className="p-2 bg-primary/10 rounded-lg group-hover:scale-110 transition-transform">
            <Users className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center">
              <Users2 className="mr-1.5 h-3 w-3" /> Members ({committee.users.length})
            </span>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full hover:bg-primary/20 hover:text-primary">
                  <UserPlus className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Assign Member to {committee.name}</DialogTitle>
                  <DialogDescription>Add a member to this functional unit.</DialogDescription>
                </DialogHeader>
                <form action={assignMemberToCommittee} className="space-y-4 mt-4">
                  <input type="hidden" name="committeeId" value={committee.id} />
                  <div className="space-y-2">
                    <Label htmlFor="userId">Select Member</Label>
                    <select id="userId" name="userId" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Choose a member...</option>
                      {members.map((m: any) => (
                        <option key={m.id} value={m.id}>{m.fullName} ({m.role.replace("_", " ")})</option>
                      ))}
                    </select>
                  </div>
                  <Button type="submit" className="w-full">Assign Member</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col gap-1.5 max-h-[220px] overflow-y-auto pr-2 no-scrollbar custom-scrollbar">
            {committee.users.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/5 transition-colors group/member">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    user.role === 'super_admin' ? 'bg-amber-500/20 text-amber-500' : 
                    user.role === 'faculty_admin' ? 'bg-blue-500/20 text-blue-500' : 'bg-primary/20 text-primary'
                  }`}>
                    {user.fullName.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold truncate leading-none">{user.fullName}</p>
                    <p className="text-[9px] text-muted-foreground truncate mt-1 uppercase tracking-tighter">
                      {user.designation || user.role.replace("_", " ")}
                    </p>
                  </div>
                </div>
                
                <form action={removeMemberFromCommittee}>
                  <input type="hidden" name="committeeId" value={committee.id} />
                  <input type="hidden" name="userId" value={user.id} />
                  <Button variant="ghost" size="icon" type="submit" className="h-6 w-6 opacity-0 group-hover/member:opacity-100 transition-opacity text-destructive hover:bg-destructive/10">
                    <X className="h-3 w-3" />
                  </Button>
                </form>
              </div>
            ))}
            {committee.users.length === 0 && (
              <p className="text-[10px] text-muted-foreground italic text-center py-4 bg-white/[0.02] rounded-lg border border-dashed border-white/5">
                No members assigned to this unit.
              </p>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-white/5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {committee.users.slice(0, 4).map((user: any) => (
              <div key={user.id} className="h-6 w-6 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[8px] font-bold">
                {user.fullName[0]}
              </div>
            ))}
            {committee.users.length > 4 && (
              <div className="h-6 w-6 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-[8px] font-bold text-primary">
                +{committee.users.length - 4}
              </div>
            )}
          </div>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            {committee.tasks.length} Active Tasks
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
