import { getProfile, updateProfile } from "@/app/actions/profile";
import { getCommittees } from "@/app/actions/committees";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera, Shield } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getProfile();
  const committees = await getCommittees();

  if (!profile) return <div>User not found</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your profile, designations, and committee affiliations.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and system details.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-6">
            <div className="flex items-center gap-6 pb-6 border-b border-white/10">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center border-2 border-primary/30 relative overflow-hidden group">
                {profile.profilePicture ? (
                  <img src={profile.profilePicture} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <User className="h-10 w-10 text-primary" />
                )}
                <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center cursor-pointer transition-all">
                  <Camera className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <Label htmlFor="profilePicture">Profile Picture URL</Label>
                <Input 
                  id="profilePicture" 
                  name="profilePicture" 
                  defaultValue={profile.profilePicture || ""} 
                  placeholder="https://example.com/avatar.jpg" 
                  className="bg-background/50" 
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" name="fullName" defaultValue={profile.fullName} required className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address (Read-only)</Label>
                <Input id="email" value={profile.email} disabled className="bg-background/20 text-muted-foreground" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation</Label>
                  <Input id="designation" name="designation" defaultValue={profile.designation || ""} placeholder="e.g. Lead Coordinator" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committeeId">Your Committee</Label>
                  <select 
                    id="committeeId" 
                    name="committeeId" 
                    defaultValue={profile.committeeId || ""} 
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm"
                  >
                    <option value="">None</option>
                    {committees.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>System Access Level</Label>
                <div className="flex items-center gap-2 px-3 py-2 bg-background/20 rounded-md border border-white/5 text-sm capitalize text-muted-foreground">
                  <Shield className="h-4 w-4 text-primary" />
                  {profile.role.replace("_", " ")}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">Update Profile & Sync Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
