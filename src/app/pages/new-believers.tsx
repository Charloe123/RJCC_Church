import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, UserCheck, Phone, Calendar } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { AddNewBelieverModal } from "../components/add-new-believer-modal";

const newBelievers = [
  { id: 1, name: "Chioma Eze", phone: "+234 806 123 4567", dateJoined: "May 15, 2026", status: "Following Up", assignedTo: "Pastor John" },
  { id: 2, name: "Kwame Asante", phone: "+234 807 234 5678", dateJoined: "May 14, 2026", status: "Baptized", assignedTo: "Sister Grace" },
  { id: 3, name: "Amara Johnson", phone: "+234 808 345 6789", dateJoined: "May 12, 2026", status: "Following Up", assignedTo: "Pastor David" },
  { id: 4, name: "Ibrahim Musa", phone: "+234 809 456 7890", dateJoined: "May 10, 2026", status: "New", assignedTo: "Unassigned" },
  { id: 5, name: "Faith Okonkwo", phone: "+234 810 567 8901", dateJoined: "May 8, 2026", status: "Following Up", assignedTo: "Sister Sarah" },
];

export function NewBelievers() {
  const [addBelieverOpen, setAddBelieverOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>New Believers</h1>
          <p className="text-muted-foreground mt-1">
            Track and follow up with new believers
          </p>
        </div>
        <Button
          className="bg-black text-white hover:bg-black/90"
          onClick={() => setAddBelieverOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Believer
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="text-xs text-muted-foreground mt-1">
              New believers registered
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Following Up</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">52</div>
            <p className="text-xs text-muted-foreground mt-1">
              Active follow-ups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Baptized</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground mt-1">
              Completed baptism
            </p>
          </CardContent>
        </Card>
      </div>

      {/* New Believers List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent New Believers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newBelievers.map((believer) => (
              <div
                key={believer.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5" />
                    <h4 className="font-medium">{believer.name}</h4>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {believer.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {believer.dateJoined}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <Badge 
                    variant={
                      believer.status === "Baptized" ? "default" : 
                      believer.status === "Following Up" ? "secondary" : 
                      "outline"
                    }
                  >
                    {believer.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground min-w-[120px]">
                    Assigned: {believer.assignedTo}
                  </span>
                  <Button variant="outline" size="sm">
                    Follow Up
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddNewBelieverModal open={addBelieverOpen} onOpenChange={setAddBelieverOpen} />
    </div>
  );
}
