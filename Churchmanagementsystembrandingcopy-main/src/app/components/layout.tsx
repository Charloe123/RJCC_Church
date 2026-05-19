import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  UserPlus,
  Calendar,
  DollarSign,
  CalendarDays,
  MessageSquare,
  FileText,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  User as UserIcon
} from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { OfflineIndicator } from "./offline-indicator";
import { MobileBottomNav } from "./mobile-bottom-nav";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/members", label: "Members", icon: Users },
  { path: "/demographics", label: "Demographics", icon: BarChart3 },
  { path: "/new-believers", label: "New Believers", icon: UserPlus },
  { path: "/attendance", label: "Attendance", icon: Calendar },
  { path: "/giving", label: "Giving", icon: DollarSign },
  { path: "/events", label: "Events", icon: CalendarDays },
  { path: "/communication", label: "Communication", icon: MessageSquare },
  { path: "/reports", label: "Reports", icon: FileText },
  { path: "/settings", label: "Settings", icon: SettingsIcon },
];

export function Layout() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-black text-white border-r border-[#1A1A1A]">
        <div className="p-6 border-b border-[#1A1A1A]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="font-bold text-black">✝</span>
            </div>
            <div>
              <h1 className="font-semibold">RJCC</h1>
              <p className="text-xs text-[#C0C0C0]">Church Management</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-[#C0C0C0] hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1A1A1A] space-y-2">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1A1A1A]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-[#C0C0C0] truncate capitalize">{user?.role || 'Member'}</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C0C0C0] hover:bg-[#1A1A1A] hover:text-white transition-colors w-full"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-5 h-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C0C0C0] hover:bg-destructive hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside 
        className={`fixed top-0 left-0 bottom-0 w-64 bg-black text-white border-r border-[#1A1A1A] z-50 lg:hidden transform transition-transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <span className="font-bold text-black">✝</span>
            </div>
            <div>
              <h1 className="font-semibold">RJCC</h1>
              <p className="text-xs text-[#C0C0C0]">Church Management</p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-white text-black"
                    : "text-[#C0C0C0] hover:bg-[#1A1A1A] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#1A1A1A] space-y-2">
          {/* User Profile */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#1A1A1A]">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <UserIcon className="w-5 h-5 text-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
              <p className="text-xs text-[#C0C0C0] truncate capitalize">{user?.role || 'Member'}</p>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C0C0C0] hover:bg-[#1A1A1A] hover:text-white transition-colors w-full"
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-5 h-5" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-5 h-5" />
                <span>Dark Mode</span>
              </>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C0C0C0] hover:bg-destructive hover:text-white transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-background">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <span className="font-bold text-white text-sm">✝</span>
            </div>
            <span className="font-semibold">RJCC</span>
          </div>
          <div className="w-6" /> {/* Spacer for centering */}
        </header>

        <div className="flex-1 overflow-y-auto pb-20 lg:pb-0">
          <Outlet />
        </div>
      </main>

      <MobileBottomNav />
      <OfflineIndicator />
    </div>
  );
}
