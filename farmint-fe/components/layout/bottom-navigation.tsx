"use client";

import { Home, Search, Plus, BarChart3, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Explore",
    href: "/discover",
    icon: Search,
  },
  {
    name: "Create",
    href: "/create",
    icon: Plus,
  },
  {
    name: "Stats",
    href: "/stats",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border-medium z-50">
      <nav className="flex justify-around items-center py-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <button
              key={item.name}
              className="flex flex-col items-center justify-center py-1 px-2 w-full"
              onClick={() => router.push(item.href)}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-primary-600/20 text-primary-400"
                    : "text-text-tertiary hover:text-text-secondary"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mb-1",
                    isActive && "animate-pulse-slow"
                  )}
                />
                <span className="text-body-xs font-medium">{item.name}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}