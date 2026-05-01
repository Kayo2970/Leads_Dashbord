"use client"

import * as React from "react"
import { getCommittees, createCommittee, assignMemberToCommittee, removeMemberFromCommittee } from "@/app/actions/committees"
import { getMembers } from "@/app/actions/members"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Plus, UserPlus, X, Shield, ChevronDown, Award, Users2, Workflow, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CommitteesPage() {
  const [committees, setCommittees] = React.useState<any[]>([])
  const [members, setMembers] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function load() {
      const c = await getCommittees()
      const m = await getMembers()
      setCommittees(c)
      setMembers(m)
      setLoading(false)
    }
    load()
  }, [])

  const advisory = committees.filter(c => c.type === "ADVISORY")
  const core = committees.filter(c => c.type === "CORE")
  const divisions = committees.filter(c => c.type === "DIVISION")

  if (loading) return <div className="flex items-center justify-center h-96 text-muted-foreground animate-pulse font-bold tracking-widest uppercase text-xs">Loading Hierarchy...</div>

  return (
    <div className="space-y-12 max-w-6xl mx-auto pb-20 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent italic">ORGANIZATION STRUCTURE</h1>
          <p className="text-muted-foreground mt-2 font-medium">
            LEADS Next Gen Centre | Dynamic Leadership Directory
          </p>
        </motion.div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="border-primary/20 hover:bg-primary/10 rounded-full px-6 bg-primary/5">
              <Plus className="mr-2 h-4 w-4" />
              Add Unit
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

      {/* 1st Tier: Advisory */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
          <div className="flex items-center gap-3 px-6 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md">
            <Award className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-black tracking-widest text-primary uppercase">Advisory & Mentorship</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {advisory.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} members={members} />
          ))}
        </div>
      </section>

      {/* 2nd Tier: Core */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
          <div className="flex items-center gap-3 px-6 py-2 bg-secondary/10 rounded-full border border-secondary/20 backdrop-blur-md">
            <Shield className="h-5 w-5 text-secondary-foreground" />
            <h2 className="text-sm font-black tracking-widest uppercase">Core Executive Council</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {core.map((committee) => (
            <CommitteeCard key={committee.id} committee={committee} members={members} />
          ))}
        </div>
      </section>

      {/* 3rd Tier: Divisions (Dynamic Columns) */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
          <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
            <Workflow className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-sm font-black tracking-widest uppercase text-muted-foreground">Functional Divisions</h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
        {/* Masonry-style layout using columns-3 */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {divisions.map((committee) => (
            <div key={committee.id} className="break-inside-avoid mb-6">
              <CommitteeCard committee={committee} members={members} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function CommitteeCard({ committee, members }: { committee: any, members: any }) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  
  const heads = committee.users.filter((u: any) => u.role !== 'student_member')
  const trainees = committee.users.filter((u: any) => u.role === 'student_member')

  return (
    <motion.div layout transition={{ type: "spring", stiffness: 300, damping: 30 }}>
      <Card className={cn(
        "glass-card border-white/5 transition-all duration-500 overflow-hidden shadow-2xl relative group",
        isExpanded ? "ring-2 ring-primary/30" : "hover:border-primary/20"
      )}>
        <CardHeader className="pb-4 pt-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black tracking-tight group-hover:text-primary transition-colors leading-tight">
                {committee.name}
              </CardTitle>
              <CardDescription className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest opacity-60">
                {committee.type} Unit
              </CardDescription>
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 bg-primary/5 rounded-full hover:bg-primary/20 transition-colors text-primary"
            >
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6 pb-6">
          {/* Heads Section (Always Visible) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-primary tracking-widest flex items-center">
                <Shield className="mr-1.5 h-3 w-3" /> Dept Heads
              </span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-5 w-5 rounded-full hover:bg-primary/20 hover:text-primary">
                    <UserPlus className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-white/10">
                  <DialogHeader><DialogTitle>Assign to {committee.name}</DialogTitle></DialogHeader>
                  <form action={assignMemberToCommittee} className="space-y-4 mt-4">
                    <input type="hidden" name="committeeId" value={committee.id} />
                    <select name="userId" className="flex h-10 w-full rounded-md border bg-background/50 px-3 text-sm">
                      {members.map((m: any) => <option key={m.id} value={m.id}>{m.fullName}</option>)}
                    </select>
                    <Button type="submit" className="w-full">Assign</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="grid gap-2">
              {heads.map((user: any) => (
                <div key={user.id} className="flex items-center justify-between p-2 rounded-xl bg-primary/5 border border-primary/10">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="h-7 w-7 rounded-lg bg-primary/20 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20">
                      {user.fullName[0]}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-black truncate text-primary uppercase">{user.fullName}</p>
                      <p className="text-[9px] text-muted-foreground/80 font-bold truncate tracking-tight">{user.designation}</p>
                    </div>
                  </div>
                  <form action={removeMemberFromCommittee}>
                    <input type="hidden" name="committeeId" value={committee.id} />
                    <input type="hidden" name="userId" value={user.id} />
                    <button type="submit" className="p-1 text-muted-foreground hover:text-destructive transition-colors">
                      <X className="h-3 w-3" />
                    </button>
                  </form>
                </div>
              ))}
              {heads.length === 0 && <p className="text-[10px] text-muted-foreground italic text-center py-2">No HODs assigned.</p>}
            </div>
          </div>

          {/* Trainees Section (Collapsible) */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden space-y-3"
              >
                <div className="pt-2 border-t border-white/5">
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest flex items-center mb-3">
                    <Users2 className="mr-1.5 h-3 w-3" /> Trainee Associates ({trainees.length})
                  </span>
                  
                  <div className="grid gap-1.5">
                    {trainees.map((user: any) => (
                      <div key={user.id} className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5 hover:bg-white/5 group/trainee">
                        <div className="flex items-center gap-3">
                          <ChevronRight className="h-2 w-2 text-primary" />
                          <p className="text-[11px] font-bold text-muted-foreground group-hover/trainee:text-foreground transition-colors">{user.fullName}</p>
                        </div>
                        <form action={removeMemberFromCommittee}>
                          <input type="hidden" name="committeeId" value={committee.id} />
                          <input type="hidden" name="userId" value={user.id} />
                          <button type="submit" className="p-1 text-muted-foreground/30 hover:text-destructive opacity-0 group-hover/trainee:opacity-100 transition-all">
                            <X className="h-3 w-3" />
                          </button>
                        </form>
                      </div>
                    ))}
                    {trainees.length === 0 && <p className="text-[10px] text-muted-foreground italic py-2">No trainees assigned.</p>}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mini Footer (Collapsed State Info) */}
          {!isExpanded && trainees.length > 0 && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="w-full pt-3 border-t border-white/5 flex items-center justify-center gap-2 group/expand"
            >
              <div className="flex -space-x-1.5 overflow-hidden">
                {trainees.slice(0, 3).map((t: any) => (
                  <div key={t.id} className="h-4 w-4 rounded-full border border-background bg-muted text-[6px] flex items-center justify-center font-bold">
                    {t.fullName[0]}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-muted-foreground group-hover/expand:text-primary transition-colors uppercase tracking-tighter">
                Show {trainees.length} Trainees
              </span>
            </button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
