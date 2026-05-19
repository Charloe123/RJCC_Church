import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

interface AddNewBelieverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddNewBelieverModal({ open, onOpenChange }: AddNewBelieverModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    event: "",
    prayerRequest: "",
    assignedTo: "Unassigned",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate saving
    toast.success("New believer registered!", {
      description: `${formData.name} has been added to follow-up list.`,
    });

    // Reset form
    setFormData({
      name: "",
      phone: "",
      address: "",
      event: "",
      prayerRequest: "",
      assignedTo: "Unassigned",
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Register New Believer</DialogTitle>
          <DialogDescription>
            Add a new believer from crusade or evangelism event
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+234 800 000 0000"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter residential address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">Event Attended</Label>
            <select
              id="event"
              value={formData.event}
              onChange={(e) => setFormData({ ...formData, event: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              required
            >
              <option value="">Select event</option>
              <option>Prayer Crusade</option>
              <option>Sunday Service</option>
              <option>Youth Revival</option>
              <option>Community Outreach</option>
              <option>Conference</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prayerRequest">Prayer Request</Label>
            <Textarea
              id="prayerRequest"
              value={formData.prayerRequest}
              onChange={(e) => setFormData({ ...formData, prayerRequest: e.target.value })}
              placeholder="Any prayer requests or notes..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="assignedTo">Assign Follow-up To</Label>
            <select
              id="assignedTo"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background"
            >
              <option>Unassigned</option>
              <option>Pastor John</option>
              <option>Sister Grace</option>
              <option>Pastor David</option>
              <option>Sister Sarah</option>
            </select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-black/90">
              Register Believer
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
