import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, UserPlus, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const attendanceData = [
  { month: "Jan", count: 450 },
  { month: "Feb", count: 480 },
  { month: "Mar", count: 520 },
  { month: "Apr", count: 490 },
  { month: "May", count: 550 },
];

const givingData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 55000 },
  { month: "May", amount: 62000 },
];

const branchData = [
  { name: "Main Branch", value: 350 },
  { name: "North Branch", value: 180 },
  { name: "South Branch", value: 120 },
  { name: "East Branch", value: 90 },
];

const COLORS = ["#000000", "#1A1A1A", "#666666", "#C0C0C0"];

export function Dashboard() {
  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome to Resurrected Jesus Christ Church Management System
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Believers</CardTitle>
            <UserPlus className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Attendance</CardTitle>
            <Calendar className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">550</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per service
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Giving</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$62,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              +13% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={{ fill: "#000000", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Giving Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Giving Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={givingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="month" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="amount" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Branch Distribution and Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Branch Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Branch Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={branchData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {branchData.map((entry, index) => (
                    <Cell key={`branch-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "var(--card)", 
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="bg-black text-white rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-2xl font-bold">18</div>
                <div className="text-xs">MAY</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Sunday Service</h4>
                <p className="text-sm text-muted-foreground">Main Auditorium • 9:00 AM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="bg-black text-white rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-2xl font-bold">21</div>
                <div className="text-xs">MAY</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Youth Revival</h4>
                <p className="text-sm text-muted-foreground">Youth Center • 6:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
              <div className="bg-black text-white rounded-lg p-3 text-center min-w-[60px]">
                <div className="text-2xl font-bold">25</div>
                <div className="text-xs">MAY</div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium">Prayer Crusade</h4>
                <p className="text-sm text-muted-foreground">City Square • 5:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
