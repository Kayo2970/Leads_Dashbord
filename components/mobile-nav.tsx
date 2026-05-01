"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  LogOut,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setIsOpen(true)}
        className="h-10 w-10 text-primary"
      >
        <Menu className="h-6 w-6" />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[280px] glass-card rounded-none border-r border-white/10 z-[101] flex flex-col shadow-2xl"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
                <span className="font-black text-xl text-primary tracking-tighter italic uppercase">LEADS PORTAL</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-primary")} />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-white/10 space-y-2">
                <Link
                  href="/settings/account"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"
                >
                  <Settings className="h-5 w-5 text-primary" />
                  Settings
                </Link>
                <Link
                  href="/"
                  className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Sign Out
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
