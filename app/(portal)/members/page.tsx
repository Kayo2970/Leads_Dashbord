import { getMembers, createMember, updateMember } from "@/app/actions/members";
import { getCommittees } from "@/app/actions/committees";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, User, Shield, Pencil, Mail } from "lucide-react";

export default async function MembersPage() {
  const members = await getMembers();
  const committees = await getCommittees();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-1">
            Manage your organization's team and committee assignments.
          </p>
        </div>
        
        {/* Onboard Member Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Onboard Member
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Onboard New Member</DialogTitle>
              <DialogDescription>
                Add a new member to the LEADS Portal. They can then log in with their email.
              </DialogDescription>
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
                  <Label htmlFor="committeeId">Committee</Label>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id} className="glass-card hover:border-primary/50 transition-colors">
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
                  <CardTitle className="text-base truncate">{member.fullName}</CardTitle>
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="role">Role</Label>
                        <select id="role" name="role" defaultValue={member.role} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                          <option value="student_member">Student</option>
                          <option value="faculty_admin">Faculty/Core</option>
                          <option value="super_admin">Super Admin</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="committeeId">Committee</Label>
                        <select id="committeeId" name="committeeId" defaultValue={member.committeeId || ""} className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm">
                          <option value="">None</option>
                          {committees.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>
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
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md">
                  <Shield className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{member.designation || "No Designation"}</span>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-sm uppercase">
                    {member.role.replace("_", " ")}
                  </span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md">
                  <Mail className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
