import { getMembers, createMember, updateMember } from "@/app/actions/members";
import { getCommittees } from "@/app/actions/committees";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, User, Shield, Pencil, Mail, Briefcase, Filter, SortAsc, LayoutGrid, ListFilter } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function MembersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentSort = (params.sort as string) || "name_asc";
  const currentFilter = (params.filter as string) || "all";

  const members = await getMembers({ sort: currentSort, filter: currentFilter });
  const committees = await getCommittees();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members and their assignments. ({members.length} total)
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Dropdown (Simplified with Links for now) */}
          <div className="flex items-center gap-1 bg-black/20 p-1 rounded-lg border border-white/5">
            <Link 
              href={`/members?sort=${currentSort}&filter=all`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "all" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              All
            </Link>
            <Link 
              href={`/members?sort=${currentSort}&filter=super_admin`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "super_admin" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              Admins
            </Link>
            <Link 
              href={`/members?sort=${currentSort}&filter=student_member`}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${currentFilter === "student_member" ? "bg-primary text-primary-foreground shadow-lg" : "text-muted-foreground hover:text-foreground"}`}
            >
              Trainees
            </Link>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Onboard
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Onboard New Member</DialogTitle>
                <DialogDescription>Add a new member to the portal.</DialogDescription>
              </DialogHeader>
              <form action={createMember} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" name="fullName" required placeholder="e.g. Aditi Sharma" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">University Email</Label>
                  <Input id="email" name="email" type="email" required placeholder="name@msruas.ac.in" className="bg-background/50" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role Level</Label>
                    <select id="role" name="role" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                      <option value="student_member">Trainee / Student</option>
                      <option value="faculty_admin">Core Committee</option>
                      <option value="super_admin">Professor / Admin</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="committeeId">Primary Committee</Label>
                    <select id="committeeId" name="committeeId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                      <option value="">None</option>
                      {committees.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" name="designation" placeholder="e.g. Event Head" className="bg-background/50" />
                </div>
                <Button type="submit" className="w-full">Create Member</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center gap-4 py-2 border-b border-white/5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-black text-muted-foreground tracking-tighter whitespace-nowrap">Sort By:</span>
        <Link 
          href={`/members?sort=name_asc&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "name_asc" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <SortAsc className="h-3 w-3" />
          Name (A-Z)
        </Link>
        <Link 
          href={`/members?sort=name_desc&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "name_desc" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <SortAsc className="h-3 w-3 rotate-180" />
          Name (Z-A)
        </Link>
        <Link 
          href={`/members?sort=role&filter=${currentFilter}`}
          className={`flex items-center gap-1.5 text-xs font-bold transition-colors ${currentSort === "role" ? "text-primary underline decoration-2 underline-offset-4" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Shield className="h-3 w-3" />
          Role Priority
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id} className="glass-card hover:border-primary/50 transition-colors group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-10 w-10 shrink-0 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/20">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="overflow-hidden">
                  <CardTitle className="text-base truncate group-hover:text-primary transition-colors">{member.fullName}</CardTitle>
                  <CardDescription className="text-xs truncate">{member.email}</CardDescription>
                </div>
              </div>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Member Details</DialogTitle>
                    <DialogDescription>Update info for {member.fullName}</DialogDescription>
                  </DialogHeader>
                  <form action={updateMember.bind(null, member.id)} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" name="fullName" defaultValue={member.fullName} required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" defaultValue={member.email} type="email" required className="bg-background/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Access Level</Label>
                      <select id="role" name="role" defaultValue={member.role} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                        <option value="student_member">Student</option>
                        <option value="faculty_admin">Faculty/Core</option>
                        <option value="super_admin">Super Admin</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation</Label>
                      <Input id="designation" name="designation" defaultValue={member.designation || ""} className="bg-background/50" />
                    </div>
                    <Button type="submit" className="w-full">Save Changes</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-2">
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md border border-white/5">
                  <Shield className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{member.designation || "Member"}</span>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-sm uppercase tracking-wider">
                    {member.role.split('_')[0]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 bg-black/20 p-2 rounded-md border border-white/5 min-h-[40px]">
                  <Briefcase className="mr-2 h-3 w-3 text-primary shrink-0 self-center" />
                  {member.committees.map(c => (
                    <span key={c.id} className="text-[9px] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-muted-foreground font-bold">
                      {c.name}
                    </span>
                  ))}
                  {member.committees.length === 0 && (
                    <span className="text-[9px] text-muted-foreground italic self-center">No committees</span>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md border border-white/5">
                  <Mail className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {members.length === 0 && (
        <div className="py-20 text-center glass-card rounded-xl border-dashed border-white/20">
          <ListFilter className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-bold text-muted-foreground">No members match your criteria</h3>
          <p className="text-sm text-muted-foreground mt-2">Try clearing your filters or adding a new member.</p>
          <Button variant="link" className="mt-4" asChild>
            <Link href="/members">Reset Filters</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
