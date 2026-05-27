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
import UsherDashboard from "./pages/usher-dashboard";
import UsherSettings from "./pages/usher-settings";
import MemberSettings from "./pages/member-settings";
import UsherLogin from "./pages/usher-login";
import Donate from "./pages/donate";
import QRCodeCheckIn from "./pages/qr-code-check-in";
import StaffLogin from "./pages/staff-login";
import { UsherSidebar } from "./components/UsherSidebar";
import { db } from "../firebase/firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { Mail, Phone } from "lucide-react";
import { Badge } from "./components/ui/badge";

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
    element: <RootLayout><ProtectedRoute><Donate /></ProtectedRoute></RootLayout>,
    path: "/app/member/donate",
  },
  {
    element: <RootLayout><ProtectedRoute><MemberSettings /></ProtectedRoute></RootLayout>,
    path: "/app/member/settings",
  },
  {
    element: <RootLayout><ProtectedRoute><MemberMembersView /></ProtectedRoute></RootLayout>,
    path: "/app/member/members",
  },
  {
    element: <RootLayout><UsherLogin /></RootLayout>,
    path: "/usher-login",
  },
  {
    element: <RootLayout><ProtectedRoute><UsherDashboard /></ProtectedRoute></RootLayout>,
    path: "/app/usher",
  },
  {
    element: <RootLayout><ProtectedRoute><QRCodeCheckIn /></ProtectedRoute></RootLayout>,
    path: "/app/usher/check-in",
  },
  {
    element: <RootLayout><ProtectedRoute><UsherMembersView /></ProtectedRoute></RootLayout>,
    path: "/app/usher/members",
  },
  {
    element: <RootLayout><ProtectedRoute><UsherSettings /></ProtectedRoute></RootLayout>,
    path: "/app/usher/settings",
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

// Helper component for usher members view
function UsherMembersView() {
  const [darkMode, setDarkMode] = React.useState(false);
  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} pt-16 lg:pt-0`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="members" basePath="usher" />
      <div className="flex-1 overflow-y-auto">
        <Members />
      </div>
    </div>
  );
}

// View-only members list for member dashboard
function MemberMembersView() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [members, setMembers] = React.useState<any[]>([
    { id: "1", name: "John Adeyemi", email: "john@rjcc.org", phone: "+234 800 123 4567", status: "Active", branch: "Main Branch" },
    { id: "2", name: "Grace Okafor", email: "grace@rjcc.org", phone: "+234 800 234 5678", status: "Active", branch: "North Branch" },
    { id: "3", name: "David Mensah", email: "david@rjcc.org", phone: "+234 800 345 6789", status: "Active", branch: "Main Branch" },
    { id: "4", name: "Sarah Williams", email: "sarah@rjcc.org", phone: "+234 800 456 7890", status: "Inactive", branch: "South Branch" },
    { id: "5", name: "Emmanuel Nwosu", email: "emmanuel@rjcc.org", phone: "+234 800 567 8901", status: "Active", branch: "East Branch" },
  ]);

  React.useEffect(() => {
    if (!db) return;
    const membersCollection = collection(db, "members");
    const unsubscribe = onSnapshot(membersCollection, (snapshot) => {
      const membersList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMembers(membersList);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} pt-16 lg:pt-0`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="members" basePath="member" />
      <div className="flex-1 overflow-y-auto p-6 lg:p-8">
        <div className="mb-6">
          <h1>Members</h1>
          <p className="text-muted-foreground mt-1">View church members</p>
        </div>
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-medium">{member.name}</h4>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {member.email}
                  </div>
                  <div className="hidden sm:block">•</div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    {member.phone}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={member.status === "Active" ? "default" : "secondary"}>
                  {member.status}
                </Badge>
                <span className="text-sm text-muted-foreground min-w-[100px]">
                  {member.branch}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}