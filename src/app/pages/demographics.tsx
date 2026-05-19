import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Users, TrendingUp, Heart, Briefcase } from "lucide-react";

const genderData = [
  { name: "Male", value: 684 },
  { name: "Female", value: 564 },
];

const maritalData = [
  { name: "Single", value: 480 },
  { name: "Married", value: 618 },
  { name: "Divorced", value: 98 },
  { name: "Widowed", value: 52 },
];

const ageDistribution = [
  { age: "0-12", count: 256 },
  { age: "13-17", count: 184 },
  { age: "18-25", count: 312 },
  { age: "26-35", count: 398 },
  { age: "36-50", count: 256 },
  { age: "51+", count: 142 },
];

const employmentData = [
  { status: "Employed", count: 892 },
  { status: "Self-employed", count: 186 },
  { status: "Student", count: 98 },
  { status: "Unemployed", count: 52 },
  { status: "Retired", count: 20 },
];

const branchData = [
  { branch: "Main", count: 620 },
  { branch: "North", count: 298 },
  { branch: "South", count: 186 },
  { branch: "East", count: 144 },
];

const growthTrend = [
  { month: "Jan", members: 1120 },
  { month: "Feb", members: 1156 },
  { month: "Mar", members: 1189 },
  { month: "Apr", members: 1214 },
  { month: "May", members: 1248 },
];

const COLORS = ["#000000", "#1A1A1A", "#4A4A4A", "#666666", "#999999"];

export function Demographics() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1>Demographics & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive member demographics and church analytics
        </p>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Gender Ratio</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">55% M / 45% F</div>
            <p className="text-xs text-muted-foreground mt-1">
              Fairly balanced distribution
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Marriage Rate</CardTitle>
            <Heart className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">49.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              618 married members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Employment Rate</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">71.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              892 employed members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2.8%</div>
            <p className="text-xs text-muted-foreground mt-1">
              +34 members this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gender Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Gender Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`gender-${entry.name}`} fill={COLORS[index]} />
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

        {/* Marital Status */}
        <Card>
          <CardHeader>
            <CardTitle>Marital Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={maritalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="name" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="value" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Age Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="age" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="count" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Employment Status */}
        <Card>
          <CardHeader>
            <CardTitle>Employment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status }) => status}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {employmentData.map((entry, index) => (
                    <Cell key={`employment-${entry.status}`} fill={COLORS[index % COLORS.length]} />
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
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Membership Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={growthTrend}>
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
                  dataKey="members"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={{ fill: "#000000", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Branch Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Members by Branch</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={branchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#C0C0C0" />
                <XAxis dataKey="branch" stroke="#666666" />
                <YAxis stroke="#666666" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="count" fill="#000000" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Demographic Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">👥 Largest Age Group</h4>
              <p className="text-sm text-muted-foreground">
                26-35 years old with 398 members (31.9%)
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">🏢 Most Common Status</h4>
              <p className="text-sm text-muted-foreground">
                Employed workers represent 71.5% of adult members
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">👶 Youth Population</h4>
              <p className="text-sm text-muted-foreground">
                440 members under 18 years (35.3% of total)
              </p>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <h4 className="font-medium mb-2">📈 Growth Trend</h4>
              <p className="text-sm text-muted-foreground">
                Steady 2-3% monthly growth for past 5 months
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
