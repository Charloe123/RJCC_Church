import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Plus, Search, Mail, Phone } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { AddAdvancedMemberModal } from "../components/add-advanced-member-modal";

const members = [
  { id: 1, name: "John Adeyemi", email: "john.a@email.com", phone: "+234 801 234 5678", status: "Active", branch: "Main Branch" },
  { id: 2, name: "Grace Okafor", email: "grace.o@email.com", phone: "+234 802 345 6789", status: "Active", branch: "North Branch" },
  { id: 3, name: "David Mensah", email: "david.m@email.com", phone: "+234 803 456 7890", status: "Active", branch: "Main Branch" },
  { id: 4, name: "Sarah Williams", email: "sarah.w@email.com", phone: "+234 804 567 8901", status: "Inactive", branch: "South Branch" },
  { id: 5, name: "Emmanuel Nwosu", email: "emmanuel.n@email.com", phone: "+234 805 678 9012", status: "Active", branch: "East Branch" },
];

export function Members() {
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1>Members</h1>
          <p className="text-muted-foreground mt-1">
            Advanced membership management with demographics
          </p>
        </div>
        <Button
          className="bg-black text-white hover:bg-black/90"
          onClick={() => setAddMemberOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search members by name, email, or phone..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Members ({members.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
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
        </CardContent>
      </Card>

      <AddAdvancedMemberModal open={addMemberOpen} onOpenChange={setAddMemberOpen} />
    </div>
  );
}
