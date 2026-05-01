"use client"

import * as React from "react"
import { getCommittees, assignMemberToCommittee, removeMemberFromCommittee } from "@/app/actions/committees"
import { getMembers } from "@/app/actions/members"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Users, Plus, UserPlus, X, ChevronDown, Award, Users2, Shield, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CommitteesPage() {
  const [committees, setCommittees] = React.useState<any[]>([])
  const [members, setMembers] = React.useState<any[]>([])
  const [search, setSearch] = React.useState("")
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function load() {
      const [c, m] = await Promise.all([getCommittees(), getMembers()])
      setCommittees(c)
      setMembers(m)
      setLoading(false)
    }
    load()
  }, [])

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

      {/* Flattened Masonry-style Layout */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {filteredCommittees.map((committee) => (
          <div key={committee.id} className="break-inside-avoid">
            <CommitteeCard committee={committee} members={members} />
          </div>
        ))}
      </div>

      {filteredCommittees.length === 0 && (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <Users className="mx-auto h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground font-bold italic tracking-widest uppercase text-xs">No matching departments found</p>
        </div>
      )}
    </div>
  )
}

function CommitteeCard({ committee, members }: { committee: any, members: any }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  // Sorting: Heads first, then Trainees (Already handled by action, but ensuring UI clarity)
  const heads = committee.users.filter((u: any) => u.role !== 'student_member')
  const trainees = committee.users.filter((u: any) => u.role === 'student_member')

  return (
    <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Card className={cn(
        "glass-card border-white/5 transition-all duration-500 overflow-hidden shadow-2xl relative group",
        isExpanded ? "ring-2 ring-primary/30" : "hover:border-primary/20"
      )}>
        {/* Dynamic header stripe based on size */}
        <div className={cn(
          "h-1 w-full bg-gradient-to-r",
          committee.users.length > 10 ? "from-primary via-teal-500 to-primary" : "from-primary/40 to-transparent"
        )} />
        
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg font-black tracking-tight group-hover:text-primary transition-colors leading-tight uppercase">
                {committee.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">{committee.users.length} Personnel</span>
                 {committee.type === 'ADVISORY' && <Award className="h-3 w-3 text-primary" />}
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full hover:bg-primary/20 hover:text-primary text-muted-foreground">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card border-white/10">
                <DialogHeader>
                  <DialogTitle>Add Member to {committee.name}</DialogTitle>
                </DialogHeader>
                <form action={assignMemberToCommittee} className="space-y-4 mt-4">
                  <input type="hidden" name="committeeId" value={committee.id} />
                  <select name="userId" className="flex h-10 w-full rounded-md border bg-background/50 px-3 text-sm">
                    {members.map((m: any) => <option key={m.id} value={m.id}>{m.fullName}</option>)}
                  </select>
                  <Input name="designation" placeholder="Role within this committee (optional)" className="bg-background/50" />
                  <Button type="submit" className="w-full">Assign Member</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 pb-6">
          {/* Member List */}
          <div className="space-y-2">
            {committee.users.map((user: any) => (
              <div key={user.id} className="flex items-center justify-between p-1.5 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all group/member">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative h-9 w-9 shrink-0">
                    {user.profilePicture ? (
                      <img 
                        src={user.profilePicture} 
                        alt={user.fullName}
                        className="h-full w-full rounded-full object-cover border border-white/10 shadow-sm"
                        onError={(e) => {
                          (e.target as any).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName)}&background=random&color=fff`
                        }}
                      />
                    ) : (
                      <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20 uppercase">
                        {user.fullName.split(' ').map((n: any) => n[0]).join('')}
                      </div>
                    )}
                    {user.role !== 'student_member' && (
                      <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5 border border-background shadow-lg">
                        <Award className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className={cn(
                      "text-[11px] font-black truncate leading-none uppercase tracking-tighter",
                      user.role !== 'student_member' ? "text-primary" : "text-foreground"
                    )}>
                      {user.fullName}
                    </p>
                    <p className="text-[9px] text-muted-foreground/80 font-bold truncate tracking-tighter mt-1 uppercase italic">
                      {user.designation || user.role.replace("_", " ")}
                    </p>
                  </div>
                </div>
                
                <form action={removeMemberFromCommittee}>
                  <input type="hidden" name="committeeId" value={committee.id} />
                  <input type="hidden" name="userId" value={user.id} />
                  <button type="submit" className="p-1 text-muted-foreground/30 hover:text-destructive opacity-0 group-hover/member:opacity-100 transition-all">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            ))}
            
            {committee.users.length === 0 && (
              <p className="text-[10px] text-muted-foreground italic text-center py-6 border border-dashed border-white/5 rounded-2xl">
                No active personnel assigned.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
