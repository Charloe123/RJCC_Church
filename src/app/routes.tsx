import React from 'react';
import { createBrowserRouter, Navigate } from "react-router";
import { AuthProvider } from "./context/auth-context";
import { Layout } from "./components/layout";
import { ProtectedRoute } from "./components/protected-route";
import LoginTypeSelection from "./pages/login";
import { MemberLogin } from "./pages/member-login";
import { AdminLogin } from "./pages/admin-login";
import { Dashboard } from "./pages/dashboard";
import { Members } from "./pages/members";
import { Demographics } from "./pages/demographics";
import { NewBelievers } from "./pages/new-believers";
import { Attendance } from "./pages/attendance";
import { Giving } from "./pages/giving";
import { Events } from "./pages/events";
import { Communication } from "./pages/communication";
import { Reports } from "./pages/reports";
import { Settings } from "./pages/settings";
import MemberDashboard from "./pages/member-dashboard";
import { UsherSettings as MemberSettings } from "./pages/usher-settings";
import QRCodeCheckIn from "./pages/qr-code-check-in";
import StaffLogin from "./pages/staff-login";
import { UsherSidebar } from "./components/UsherSidebar";

function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout><LoginTypeSelection /></RootLayout>,
    path: "/",
  },
  {
    element: <RootLayout><StaffLogin /></RootLayout>,
    path: "/staff-login",
  },
  {
    element: <RootLayout><MemberLogin /></RootLayout>,
    path: "/login/member",
  },
  {
    element: <RootLayout><AdminLogin /></RootLayout>,
    path: "/login/admin",
  },
  {
    element: <RootLayout><ProtectedRoute><Layout /></ProtectedRoute></RootLayout>,
    path: "/app",
    children: [
      { path: "admin", element: <Dashboard /> },
      { path: "members", element: <Members /> },
      { path: "demographics", element: <Demographics /> },
      { path: "new-believers", element: <NewBelievers /> },
      { path: "attendance", element: <Attendance /> },
      { path: "giving", element: <Giving /> },
      { path: "events", element: <Events /> },
      { path: "communication", element: <Communication /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
      { index: true, element: <Navigate to="/app/admin" replace /> },
    ],
  },
  {
    element: <RootLayout><ProtectedRoute><MemberDashboard /></ProtectedRoute></RootLayout>,
    path: "/app/member",
  },
  {
    element: <RootLayout><ProtectedRoute><MemberMembersView /></ProtectedRoute></RootLayout>,
    path: "/app/member/members",
  },
  {
    element: <RootLayout><ProtectedRoute><QRCodeCheckIn /></ProtectedRoute></RootLayout>,
    path: "/app/member/check-in",
  },
  {
    element: <RootLayout><ProtectedRoute><MemberSettings /></ProtectedRoute></RootLayout>,
    path: "/app/member/settings",
  },
  {
    path: "/login",
    element: <Navigate to="/" replace />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

// Helper component to show the Members list with the Member Sidebar
function MemberMembersView() {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="members" />
      <div className="flex-1 overflow-y-auto">
        <Members />
      </div>
    </div>
  );
}