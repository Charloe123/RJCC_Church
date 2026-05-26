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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import { User, Heart, Briefcase, Users } from "lucide-react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase";

interface AddAdvancedMemberModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddAdvancedMemberModal({ open, onOpenChange }: AddAdvancedMemberModalProps) {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    gender: "Male",
    dateOfBirth: "",
    nationalId: "",
    phone: "",
    altPhone: "",
    email: "",
    address: "",
    city: "",
    branch: "Main Branch",

    // Marital Information
    maritalStatus: "Single",
    spouseName: "",
    spousePhone: "",
    spouseMemberId: "",
    isSpouseMember: "No",

    // Employment Information
    employmentStatus: "Employed",
    companyName: "",
    jobTitle: "",
    industry: "",
  });

  const [children, setChildren] = useState<Array<{
    name: string;
    gender: string;
    dob: string;
    school: string;
    phone: string;
  }>>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (db) {
        await addDoc(collection(db, "members"), {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          status: "Active",
          branch: formData.branch,
          gender: formData.gender,
          dateOfBirth: formData.dateOfBirth,
          nationalId: formData.nationalId,
          altPhone: formData.altPhone,
          address: formData.address,
          city: formData.city,
          maritalStatus: formData.maritalStatus,
          spouseName: formData.spouseName,
          spousePhone: formData.spousePhone,
          spouseMemberId: formData.spouseMemberId,
          employmentStatus: formData.employmentStatus,
          companyName: formData.companyName,
          jobTitle: formData.jobTitle,
          industry: formData.industry,
          children: children,
          createdAt: new Date().toISOString(),
        });
        toast.success("Member registered successfully!", {
          description: `${formData.fullName} has been added to the database.`,
        });
      } else {
        toast.success("Member registered successfully!", {
          description: `${formData.fullName} has been added (local mode).`,
        });
      }

// Reset form
      setFormData({
        fullName: "",
        gender: "Male",
        dateOfBirth: "",
        nationalId: "",
        phone: "",
        altPhone: "",
        email: "",
        address: "",
        city: "",
        branch: "Main Branch",
        maritalStatus: "Single",
        spouseName: "",
        spousePhone: "",
        spouseMemberId: "",
        isSpouseMember: "No",
        employmentStatus: "Employed",
        companyName: "",
        jobTitle: "",
        industry: "",
      });
      setChildren([]);

      onOpenChange(false);
    } catch (error: any) {
      toast.error("Failed to register member", {
        description: error.message || "Please try again",
      });
    }
  };

  const addChild = () => {
    setChildren([...children, {
      name: "",
      gender: "Male",
      dob: "",
      school: "",
      phone: ""
    }]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Member Registration</DialogTitle>
          <DialogDescription>
            Complete member profile with family and employment details
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">
                <User className="w-4 h-4 mr-2" />
                Personal
              </TabsTrigger>
              <TabsTrigger value="marital">
                <Heart className="w-4 h-4 mr-2" />
                Marital
              </TabsTrigger>
              <TabsTrigger value="employment">
                <Briefcase className="w-4 h-4 mr-2" />
                Employment
              </TabsTrigger>
              <TabsTrigger value="family">
                <Users className="w-4 h-4 mr-2" />
                Children
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <select
                    id="gender"
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    required
                  >
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth *</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID / Passport</Label>
                  <Input
                    id="nationalId"
                    value={formData.nationalId}
                    onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="altPhone">Alternative Phone</Label>
                  <Input
                    id="altPhone"
                    value={formData.altPhone}
                    onChange={(e) => setFormData({ ...formData, altPhone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Physical Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="branch">Branch/Campus *</Label>
                <select
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  required
                >
                  <option>Main Branch</option>
                  <option>North Branch</option>
                  <option>South Branch</option>
                  <option>East Branch</option>
                </select>
              </div>
            </TabsContent>

            {/* Marital Information Tab */}
            <TabsContent value="marital" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status</Label>
                <select
                  id="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>

              {formData.maritalStatus === "Married" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-secondary/20">
                  <div className="space-y-2 md:col-span-2">
                    <h4 className="font-medium">Spouse Information</h4>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spouseName">Spouse Name</Label>
                    <Input
                      id="spouseName"
                      value={formData.spouseName}
                      onChange={(e) => setFormData({ ...formData, spouseName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="spousePhone">Spouse Phone</Label>
                    <Input
                      id="spousePhone"
                      value={formData.spousePhone}
                      onChange={(e) => setFormData({ ...formData, spousePhone: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="isSpouseMember">Is Spouse a Member?</Label>
                    <select
                      id="isSpouseMember"
                      value={formData.isSpouseMember}
                      onChange={(e) => setFormData({ ...formData, isSpouseMember: e.target.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>
                  </div>

                  {formData.isSpouseMember === "Yes" && (
                    <div className="space-y-2">
                      <Label htmlFor="spouseMemberId">Spouse Member ID</Label>
                      <Input
                        id="spouseMemberId"
                        value={formData.spouseMemberId}
                        onChange={(e) => setFormData({ ...formData, spouseMemberId: e.target.value })}
                        placeholder="Enter existing member ID"
                      />
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Employment Information Tab */}
            <TabsContent value="employment" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="employmentStatus">Employment Status</Label>
                <select
                  id="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                >
                  <option>Employed</option>
                  <option>Self-employed</option>
                  <option>Student</option>
                  <option>Unemployed</option>
                  <option>Retired</option>
                </select>
              </div>

              {(formData.employmentStatus === "Employed" || formData.employmentStatus === "Self-employed") && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    />
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Children Tab */}
            <TabsContent value="family" className="space-y-4 mt-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Children Information</h4>
                <Button type="button" variant="outline" size="sm" onClick={addChild}>
                  Add Child
                </Button>
              </div>

              {children.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>No children added yet</p>
                  <p className="text-sm">Click "Add Child" to register children</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {children.map((child, index) => (
                    <div key={index} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <h5 className="font-medium">Child {index + 1}</h5>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => setChildren(children.filter((_, i) => i !== index))}
                        >
                          Remove
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Input
                          placeholder="Child Name"
                          value={child.name}
                          onChange={(e) => {
                            const updated = [...children];
                            updated[index].name = e.target.value;
                            setChildren(updated);
                          }}
                        />

                        <select
                          value={child.gender}
                          onChange={(e) => {
                            const updated = [...children];
                            updated[index].gender = e.target.value;
                            setChildren(updated);
                          }}
                          className="px-3 py-2 border border-border rounded-lg bg-background"
                        >
                          <option>Male</option>
                          <option>Female</option>
                        </select>

                        <Input
                          type="date"
                          placeholder="Date of Birth"
                          value={child.dob}
                          onChange={(e) => {
                            const updated = [...children];
                            updated[index].dob = e.target.value;
                            setChildren(updated);
                          }}
                        />

                        <Input
                          placeholder="School"
                          value={child.school}
                          onChange={(e) => {
                            const updated = [...children];
                            updated[index].school = e.target.value;
                            setChildren(updated);
                          }}
                        />

                        <Input
                          placeholder="Phone (Optional)"
                          value={child.phone}
                          onChange={(e) => {
                            const updated = [...children];
                            updated[index].phone = e.target.value;
                            setChildren(updated);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-black text-white hover:bg-black/90">
              Register Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
