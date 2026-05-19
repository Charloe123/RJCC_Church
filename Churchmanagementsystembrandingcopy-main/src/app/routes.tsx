import { createBrowserRouter, Navigate } from "react-router";
import { AuthProvider } from "./context/auth-context";
import { Layout } from "./components/layout";
import { ProtectedRoute } from "./components/protected-route";
import { Login } from "./pages/login";
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

function RootLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export const router = createBrowserRouter([
  {
    element: <RootLayout><Login /></RootLayout>,
    path: "/login",
  },
  {
    element: <RootLayout><ProtectedRoute><Layout /></ProtectedRoute></RootLayout>,
    path: "/",
    children: [
      { index: true, element: <Dashboard /> },
      { path: "members", element: <Members /> },
      { path: "demographics", element: <Demographics /> },
      { path: "new-believers", element: <NewBelievers /> },
      { path: "attendance", element: <Attendance /> },
      { path: "giving", element: <Giving /> },
      { path: "events", element: <Events /> },
      { path: "communication", element: <Communication /> },
      { path: "reports", element: <Reports /> },
      { path: "settings", element: <Settings /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
