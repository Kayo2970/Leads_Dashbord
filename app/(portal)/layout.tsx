import { ReactNode } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  CalendarDays, 
  CheckSquare, 
  Star, 
  Users, 
  Shield, 
  FileText, 
  Bell, 
  Settings,
  LogOut
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { MobileNav } from "@/components/mobile-nav";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/events", icon: CalendarDays, label: "Events" },
    { href: "/tasks", icon: CheckSquare, label: "Tasks" },
    { href: "/ratings", icon: Star, label: "Ratings" },
    { href: "/members", icon: Users, label: "Members" },
    { href: "/committees", icon: Shield, label: "Committees" },
    { href: "/reports", icon: FileText, label: "Reports" },
    { href: "/announcements", icon: Bell, label: "Announcements" },
  ];

  return (
    <div className="min-h-screen bg-transparent flex relative z-10">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r-0 border-r-white/5 hidden md:flex flex-col m-4 mr-0 rounded-r-none backdrop-blur-2xl bg-card/40">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <span className="font-bold text-lg text-primary tracking-tight">LEADS Portal</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-1">
          <Link
            href="/settings/account"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 glass-card border-b-0 border-b-white/5 flex items-center justify-between px-4 md:px-6 shrink-0 m-2 md:m-4 mb-0 rounded-b-none backdrop-blur-2xl bg-card/40">
          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="md:hidden font-black text-xl text-primary tracking-tighter italic uppercase">LEADS</div>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-3 md:gap-4">
            <ThemeToggle />
            <Link href="/profile">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs border border-primary/30 overflow-hidden hover:ring-2 ring-primary/50 transition-all cursor-pointer">
                {/* Normally we'd render profilePic or initials here */}
                SM
              </div>
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto flex flex-col custom-scrollbar">
          <div className="flex-1 p-4 md:p-6">
            {children}
          </div>
          
          {/* Footer */}
          <footer className="px-6 py-4 border-t border-white/5 backdrop-blur-md bg-black/20">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] uppercase tracking-widest font-bold">
              <div className="text-muted-foreground">
                © 2026 <span className="text-primary">LEADS Next Gen Centre</span>. All rights reserved.
              </div>
              <div className="text-muted-foreground text-center md:text-right">
                Designed & Developed by <span className="text-primary hover:underline cursor-default">Kayomarz Pavri</span>
                <br className="md:hidden" />
                <span className="hidden md:inline mx-2 text-white/20">|</span>
                Head of Design & Social Media
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}
