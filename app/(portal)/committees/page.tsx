"use client"

import * as React from "react"
import { getCommittees, assignMemberToCommittee, removeMemberFromCommittee } from "@/app/actions/committees"
import { getMembers, getMemberProfile } from "@/app/actions/members"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, UserPlus, X, ChevronDown, Award, Users2, Shield, Search, Briefcase, Calendar, CheckSquare, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CommitteesPage() {
  const [committees, setCommittees] = React.useState<any[]>([])
  const [members, setMembers] = React.useState<any[]>([])
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  const loadData = React.useCallback(async () => {
    const [c, m] = await Promise.all([getCommittees(), getMembers()])
    setCommittees(c)
    setMembers(m)
    setLoading(false)
  }, [])

  React.useEffect(() => {
    loadData()
  }, [loadData])

  const filteredCommittees = committees.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="flex items-center justify-center h-96 text-muted-foreground animate-pulse font-bold tracking-widest uppercase text-xs">Synchronizing Directory...</div>

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic uppercase">Committees & Departments</h1>
          <p className="text-muted-foreground mt-2 font-medium flex items-center gap-2">
             <Shield className="h-4 w-4 text-primary" /> LEADS Next Gen Centre Directory
          </p>
        </motion.div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search departments..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </div>
          <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">
            <Plus className="mr-2 h-4 w-4" />
            Add Unit
          </Button>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredCommittees.map((committee) => (
          <div key={committee.id} className="break-inside-avoid">
            <CommitteeCard committee={committee} members={members} />
          </div>
        ))}
      </div>
    </div>
  )
}

function CommitteeCard({ committee, members }: { committee: any, members: any }) {
  return (
    <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Card className={cn(
        "glass-card border-white/5 transition-all duration-500 overflow-hidden shadow-2xl relative group hover:border-white/20"
      )}>
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-base font-black tracking-tight group-hover:text-primary transition-colors leading-tight uppercase italic">
                {committee.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                 <span className="text-[9px] font-black text-muted-foreground/40 uppercase tracking-widest">{committee.users.length} Members</span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-white/5 text-muted-foreground">
                  <UserPlus className="h-3.5 w-3.5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/10">
                <DialogHeader><DialogTitle>Add to {committee.name}</DialogTitle></DialogHeader>
                <form action={async (fd) => {
                  await assignMemberToCommittee(committee.id, fd.get("userId") as string);
                  window.location.reload();
                }} className="space-y-4 mt-4">
                  <select name="userId" className="flex h-10 w-full rounded-md border bg-background/50 px-3 text-sm">
                    {members.map((m: any) => <option key={m.id} value={m.id}>{m.fullName}</option>)}
                  </select>
                  <Button type="submit" className="w-full">Assign Member</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-6">
          <div className="space-y-2">
            {committee.users.map((user: any) => (
              <MemberListItem key={user.id} user={user} committeeId={committee.id} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

function MemberListItem({ user, committeeId }: { user: any, committeeId: string }) {
  const [profile, setProfile] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  const handleOpenProfile = async () => {
    setLoading(true)
    const data = await getMemberProfile(user.id)
    setProfile(data)
    setLoading(false)
  }

  return (
    <Dialog onOpenChange={(open) => open && handleOpenProfile()}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.08] transition-all group/member cursor-pointer">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="relative h-9 w-9 shrink-0">
              <img 
                src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff`}
                alt={user.fullName}
                className="h-full w-full rounded-full object-cover border border-white/10 shadow-sm"
              />
              {user.role !== 'student_member' && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 border border-background shadow-lg">
                  <Award className="h-2 w-2 text-white" />
                </div>
              )}
            </div>
            <div className="overflow-hidden text-left">
              <p className={cn(
                "text-[10px] font-black truncate leading-none uppercase tracking-tighter transition-colors",
                user.role !== 'student_member' ? "text-primary/80" : "text-muted-foreground group-hover/member:text-foreground"
              )}>
                {user.fullName}
              </p>
              <p className="text-[8px] text-muted-foreground/50 font-bold truncate tracking-tighter mt-1 uppercase italic">
                {user.designation || user.role.replace("_", " ")}
              </p>
            </div>
          </div>
          
          <ChevronDown className="h-3 w-3 text-muted-foreground/30 group-hover/member:text-primary transition-colors" />
        </div>
      </DialogTrigger>
      
      <DialogContent className="glass-card border-white/10 sm:max-w-[500px] p-0 overflow-hidden">
        {loading ? (
          <div className="p-20 text-center animate-pulse font-black uppercase text-xs tracking-widest">Loading Profile...</div>
        ) : profile ? (
          <div className="flex flex-col">
            {/* Profile Header */}
            <div className="p-6 bg-gradient-to-br from-primary/20 via-transparent to-transparent border-b border-white/5">
              <div className="flex items-center gap-6">
                <img 
                  src={profile.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName)}&background=random&color=fff`}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-primary/20 shadow-2xl"
                />
                <div>
                  <h2 className="text-2xl font-black tracking-tighter uppercase italic text-primary">{profile.fullName}</h2>
                  <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{profile.designation}</p>
                  <p className="text-[10px] text-muted-foreground/60 mt-1">{profile.email}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto custom-scrollbar">
              {/* Committees Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-2">
                  <Briefcase className="h-3 w-3" /> Departments
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.committees.map((c: any) => (
                    <span key={c.id} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-tighter">
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Event Roles Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-2">
                  <Calendar className="h-3 w-3" /> Event Assignments
                </h3>
                <div className="grid gap-2">
                  {profile.eventAssignments.map((ea: any) => (
                    <div key={ea.id} className="p-3 rounded-xl bg-black/20 border border-white/5 flex justify-between items-center">
                      <span className="text-xs font-bold text-foreground">{ea.event.name}</span>
                      <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded italic">
                        {ea.designation || "Support"}
                      </span>
                    </div>
                  ))}
                  {profile.eventAssignments.length === 0 && <p className="text-[10px] text-muted-foreground italic">No specific event roles assigned.</p>}
                </div>
              </div>

              {/* Active Tasks Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60 flex items-center gap-2">
                  <CheckSquare className="h-3 w-3" /> Active Tasks
                </h3>
                <div className="grid gap-2">
                  {profile.assignedTasks.filter((t:any) => t.status !== 'completed').map((task: any) => (
                    <div key={task.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                      <div className="flex justify-between items-start">
                        <p className="text-xs font-bold">{task.title}</p>
                        <span className="text-[9px] font-black text-yellow-500 uppercase">{task.status}</span>
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-muted-foreground font-medium">
                        <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
                        <span className="italic">{task.event?.name || "General"}</span>
                      </div>
                    </div>
                  ))}
                  {profile.assignedTasks.length === 0 && <p className="text-[10px] text-muted-foreground italic">No pending tasks.</p>}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white/5 bg-black/20">
              <Button variant="ghost" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary" onClick={() => window.location.href=`/members`}>
                View Full Records <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
