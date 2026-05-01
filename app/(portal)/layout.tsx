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
    <div className="min-h-screen bg-surface flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="font-bold text-lg text-primary tracking-tight">LEADS Portal</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-border space-y-1">
          <Link
            href="/settings/account"
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
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
        <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6 shrink-0">
          <div className="md:hidden font-bold text-lg text-primary">LEADS</div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              AD
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          {children}
        </div>
      </main>
    </div>
  );
}
