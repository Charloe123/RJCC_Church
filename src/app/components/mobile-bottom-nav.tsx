import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  Settings,
  QrCode
} from "lucide-react";

export function MobileBottomNav() {
  const location = useLocation();
  const isUsher = location.pathname.includes('/usher');
  const basePath = isUsher ? '/app/usher' : '/app/member';

  const memberNavItems = [
    { path: `${basePath}`, label: "Home", icon: LayoutDashboard },
    { path: `${basePath}/donate`, label: "Donate", icon: DollarSign },
    { path: `${basePath}/settings`, label: "Settings", icon: Settings },
  ];

  const usherNavItems = [
    { path: `${basePath}`, label: "Home", icon: LayoutDashboard },
    { path: `${basePath}/members`, label: "Members", icon: Users },
    { path: `${basePath}/check-in`, label: "Check-In", icon: QrCode },
    { path: `${basePath}/settings`, label: "Settings", icon: Settings },
  ];

  const navItems = isUsher ? usherNavItems : memberNavItems;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-[#1A1A1A] z-50 safe-area-inset-bottom">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors ${
                isActive
                  ? "text-white"
                  : "text-[#666666] active:text-white"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
