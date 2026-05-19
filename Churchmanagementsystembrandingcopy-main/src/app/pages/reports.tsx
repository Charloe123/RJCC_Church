import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Download, FileText, Calendar, TrendingUp } from "lucide-react";

const reports = [
  {
    id: 1,
    title: "Monthly Attendance Report",
    description: "Detailed attendance statistics for May 2026",
    date: "May 17, 2026",
    type: "Attendance",
  },
  {
    id: 2,
    title: "Giving & Finance Report",
    description: "Financial overview and giving trends for May 2026",
    date: "May 17, 2026",
    type: "Finance",
  },
  {
    id: 3,
    title: "New Believers Follow-up",
    description: "New believers statistics and follow-up status",
    date: "May 15, 2026",
    type: "Members",
  },
  {
    id: 4,
    title: "Branch Performance",
    description: "Comparative analysis of all church branches",
    date: "May 10, 2026",
    type: "Analytics",
  },
];

const quickStats = [
  { label: "Total Members", value: "1,248", change: "+12%" },
  { label: "Avg. Attendance", value: "550", change: "+8%" },
  { label: "Monthly Giving", value: "$62,000", change: "+13%" },
  { label: "New Believers", value: "84", change: "+18%" },
];

export function Reports() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Reports</h1>
          <p className="text-muted-foreground mt-1">
            Generate and view church reports and analytics
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          <FileText className="w-4 h-4 mr-2" />
          Generate Custom Report
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{stat.change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Calendar className="w-5 h-5" />
              Attendance Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Weekly, monthly, and yearly attendance statistics with trends and insights
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5" />
              Financial Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Comprehensive financial reports including giving, expenses, and budgets
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5" />
              Member Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Member demographics, engagement levels, and growth statistics
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:bg-secondary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Download className="w-5 h-5" />
              Custom Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create custom reports with specific date ranges and metrics
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium">{report.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {report.type}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {report.date}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
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
