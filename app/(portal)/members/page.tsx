import { getMembers, createMember } from "@/app/actions/members";
import { getCommittees } from "@/app/actions/committees";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, Plus, Shield, Mail } from "lucide-react";

export default async function MembersPage() {
  const members = await getMembers();
  const committees = await getCommittees();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members Directory</h1>
          <p className="text-muted-foreground mt-1">
            Manage roles, designations, and view the organizational structure.
          </p>
        </div>
        
        {/* New Member Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
              <DialogDescription>
                Onboard a new member into the portal and set their permissions.
              </DialogDescription>
            </DialogHeader>
            <form action={createMember} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" required placeholder="e.g. Aditi Sharma" className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" required placeholder="aditi@msruas.ac.in" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="designation">Designation (Optional)</Label>
                <Input id="designation" name="designation" placeholder="e.g. Design Lead" className="bg-background/50" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Access Level</Label>
                  <select id="role" name="role" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="student_member">Trainee / Member</option>
                    <option value="faculty_admin">Core Committee</option>
                    <option value="super_admin">Professor / Super Admin</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="committeeId">Committee</Label>
                  <select id="committeeId" name="committeeId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="">None</option>
                    {committees.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button type="submit" className="w-full">Onboard Member</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <Card key={member.id} className="glass-card flex flex-col hover:border-primary/50 transition-colors">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 overflow-hidden">
                  {member.profilePicture ? (
                    <img src={member.profilePicture} alt={member.fullName} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-bold text-primary">{member.fullName.charAt(0)}</span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <CardTitle className="text-lg truncate">{member.fullName}</CardTitle>
                  <CardDescription className="truncate">
                    {member.designation || member.role.replace("_", " ")}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-2 mt-2">
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md">
                  <Mail className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground bg-black/20 p-2 rounded-md">
                  <Shield className="mr-2 h-3 w-3 text-primary shrink-0" />
                  <span className="truncate capitalize">{member.committee?.name || "No Committee"}</span>
                  <span className="ml-auto text-[10px] font-bold px-2 py-0.5 bg-primary/20 text-primary rounded-sm uppercase">
                    {member.role.replace("_", " ")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
