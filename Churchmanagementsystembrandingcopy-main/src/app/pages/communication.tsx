import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, Send, Mail, MessageSquare, Phone } from "lucide-react";
import { Badge } from "../components/ui/badge";

const recentMessages = [
  {
    id: 1,
    type: "SMS",
    title: "Sunday Service Reminder",
    recipients: 1248,
    status: "Sent",
    date: "May 17, 2026",
  },
  {
    id: 2,
    type: "Email",
    title: "Monthly Newsletter",
    recipients: 980,
    status: "Sent",
    date: "May 15, 2026",
  },
  {
    id: 3,
    type: "SMS",
    title: "Youth Event Invitation",
    recipients: 180,
    status: "Scheduled",
    date: "May 19, 2026",
  },
];

export function Communication() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div>
        <h1>Communication</h1>
        <p className="text-muted-foreground mt-1">
          Send messages and announcements to members
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">SMS Sent</CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,420</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
            <Mail className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,150</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Phone className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Email engagement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Send Message Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send New Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="message-type">Message Type</Label>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button variant="outline" className="flex-1">
                <MessageSquare className="w-4 h-4 mr-2" />
                SMS
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="recipients">Recipients</Label>
            <Input id="recipients" placeholder="Select member groups or individuals..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" placeholder="Enter message subject..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={6}
            />
          </div>

          <div className="flex gap-3">
            <Button className="bg-black text-white hover:bg-black/90">
              <Send className="w-4 h-4 mr-2" />
              Send Now
            </Button>
            <Button variant="outline">
              Schedule for Later
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Messages */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentMessages.map((message) => (
              <div
                key={message.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    {message.type === "SMS" ? (
                      <MessageSquare className="w-5 h-5" />
                    ) : (
                      <Mail className="w-5 h-5" />
                    )}
                    <h4 className="font-medium">{message.title}</h4>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                    <span>{message.recipients} recipients</span>
                    <span>•</span>
                    <span>{message.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={message.status === "Sent" ? "default" : "outline"}
                  >
                    {message.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View
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
