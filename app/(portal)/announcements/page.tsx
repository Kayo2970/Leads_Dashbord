import { getAnnouncements, createAnnouncement } from "@/app/actions/announcements";
import { getCommittees } from "@/app/actions/committees";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone, Plus, Calendar, User, Shield } from "lucide-react";

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();
  const committees = await getCommittees();

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
          <p className="text-muted-foreground mt-1">
            Broadcast updates to all members or specific committees.
          </p>
        </div>
        
        {/* New Announcement Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-card border-white/10 sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
              <DialogDescription>
                Send a broadcast message to the portal.
              </DialogDescription>
            </DialogHeader>
            <form action={createAnnouncement} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Headline</Label>
                <Input id="title" name="title" required placeholder="e.g. Meeting Rescheduled" className="bg-background/50" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Audience</Label>
                  <select id="target" name="target" required className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="all">Everyone (All Levels)</option>
                    <option value="committee">Specific Committee</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="committeeId">Target Committee</Label>
                  <select id="committeeId" name="committeeId" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                    <option value="">None (Global)</option>
                    {committees.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Message Body</Label>
                <Textarea id="body" name="body" required placeholder="Type your announcement here..." className="bg-background/50 h-32" />
              </div>

              <Button type="submit" className="w-full">Broadcast Announcement</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {announcements.map((announcement) => (
          <Card key={announcement.id} className="glass-card border-l-4 border-l-primary">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Megaphone className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      {announcement.target === "all" ? "Global Broadcast" : `${announcement.committee?.name} ONLY`}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {announcement.createdAt.toLocaleDateString()}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">{announcement.body}</p>
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <User className="h-3 w-3 text-primary" />
                  <span>Posted by {announcement.creator.fullName}</span>
                </div>
                {announcement.committee && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-primary" />
                    <span>{announcement.committee.name}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {announcements.length === 0 && (
          <div className="py-12 text-center border border-dashed border-white/20 rounded-xl glass-card">
            <Megaphone className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
            <h3 className="text-lg font-medium">No announcements yet</h3>
            <p className="text-sm text-muted-foreground mt-1">Global updates will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
