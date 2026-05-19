import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, DollarSign, TrendingUp, CreditCard } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const monthlyData = [
  { month: "Jan", amount: 45000 },
  { month: "Feb", amount: 52000 },
  { month: "Mar", amount: 48000 },
  { month: "Apr", amount: 55000 },
  { month: "May", amount: 62000 },
];

const categoryData = [
  { category: "Tithes", amount: 42000 },
  { category: "Offerings", amount: 15000 },
  { category: "Special Giving", amount: 5000 },
];

const recentGiving = [
  { id: 1, date: "May 17, 2026", type: "Tithe", amount: 12500, method: "Bank Transfer" },
  { id: 2, date: "May 17, 2026", type: "Offering", amount: 3200, method: "Cash" },
  { id: 3, date: "May 14, 2026", type: "Special Giving", amount: 5000, method: "Mobile Money" },
  { id: 4, date: "May 10, 2026", type: "Tithe", amount: 8900, method: "Bank Transfer" },
];

export function Giving() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Giving</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage church finances and giving
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" />
          Record Giving
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$62,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total giving received
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+13%</div>
            <p className="text-xs text-muted-foreground mt-1">
              From last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Contributors</CardTitle>
            <CreditCard className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active givers this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Giving Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
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
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#000000" 
                  strokeWidth={2}
                  dot={{ fill: "#000000", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Giving Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="category" stroke="#666666" />
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

      {/* Recent Giving */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Giving</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentGiving.map((giving) => (
              <div
                key={giving.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{giving.type}</h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span>{giving.date}</span>
                    <span>•</span>
                    <span>{giving.method}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-2xl font-bold">${giving.amount.toLocaleString()}</div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Receipt
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
