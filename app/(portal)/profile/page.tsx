import { getProfile, updateProfile } from "@/app/actions/profile";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Camera } from "lucide-react";

export default async function ProfilePage() {
  const profile = await getProfile();

  if (!profile) return <div>User not found</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-muted-foreground mt-1">
          Customize your profile, designations, and account details.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and details.</CardDescription>
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

              <div className="space-y-2">
                <Label htmlFor="designation">Designation / Tagline</Label>
                <Input id="designation" name="designation" defaultValue={profile.designation || ""} placeholder="e.g. Lead Coordinator, Logistics Head" className="bg-background/50" />
              </div>

              <div className="space-y-2">
                <Label>System Role</Label>
                <div className="px-3 py-2 bg-background/20 rounded-md border border-white/5 text-sm capitalize text-muted-foreground">
                  {profile.role.replace("_", " ")}
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
