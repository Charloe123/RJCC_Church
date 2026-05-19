import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Calendar, MapPin, Users, Clock } from "lucide-react";
import { Badge } from "../components/ui/badge";

const upcomingEvents = [
  {
    id: 1,
    title: "Sunday Service",
    date: "May 18, 2026",
    time: "9:00 AM",
    location: "Main Auditorium",
    attendees: 550,
    status: "Upcoming",
  },
  {
    id: 2,
    title: "Youth Revival",
    date: "May 21, 2026",
    time: "6:00 PM",
    location: "Youth Center",
    attendees: 180,
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Prayer Crusade",
    date: "May 25, 2026",
    time: "5:00 PM",
    location: "City Square",
    attendees: 320,
    status: "Upcoming",
  },
  {
    id: 4,
    title: "Leadership Training",
    date: "May 28, 2026",
    time: "2:00 PM",
    location: "Conference Room",
    attendees: 45,
    status: "Upcoming",
  },
];

const pastEvents = [
  {
    id: 5,
    title: "Easter Celebration",
    date: "April 20, 2026",
    attendees: 850,
    status: "Completed",
  },
  {
    id: 6,
    title: "Women's Conference",
    date: "April 15, 2026",
    attendees: 320,
    status: "Completed",
  },
];

export function Events() {
  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Events</h1>
          <p className="text-muted-foreground mt-1">
            Manage church events and programs
          </p>
        </div>
        <Button className="bg-black text-white hover:bg-black/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Events scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total events
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,095</div>
            <p className="text-xs text-muted-foreground mt-1">
              Expected attendees
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="p-6 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-black text-white rounded-lg p-3 text-center min-w-[70px]">
                        <div className="text-xl font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-xs uppercase">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {event.time}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {event.attendees} expected
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{event.status}</Badge>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Past Events */}
      <Card>
        <CardHeader>
          <CardTitle>Past Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.date} • {event.attendees} attendees
                  </p>
                </div>
                <Badge>{event.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
