import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Bell, Shield, Database, Mail } from "lucide-react";
import { UsherSidebar } from '../components/UsherSidebar';
import { MobileBottomNav } from '../components/mobile-bottom-nav';

export default function UsherSettings() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
<div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} pt-16 lg:pt-0`}>
       <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="settings" basePath="usher" />
       
       <div className="flex-1 p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
         {/* Header */}
         <div>
           <h1 className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight">Settings</h1>
           <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
             Manage your church management system settings
           </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
           {/* Left Column: Church Info & Notifications */}
           <div className="space-y-4 sm:space-y-6">
             <Card>
               <CardHeader>
                 <CardTitle className="text-sm sm:text-base">Church Information</CardTitle>
                 <CardDescription className="text-xs sm:text-sm">
                   Update your church's basic information
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-3 sm:space-y-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="church-name" className="text-xs sm:text-sm">Church Name</Label>
                     <Input
                       id="church-name"
                       defaultValue="Resurrected Jesus Christ Church"
                       className="h-9 sm:h-10 text-xs sm:text-sm"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="church-email" className="text-xs sm:text-sm">Email Address</Label>
                     <Input
                       id="church-email"
                       type="email"
                       defaultValue="info@rjcc.org"
                       className="h-9 sm:h-10 text-xs sm:text-sm"
                     />
                   </div>
                 </div>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                   <div className="space-y-2">
                     <Label htmlFor="church-phone" className="text-xs sm:text-sm">Phone Number</Label>
                     <Input
                       id="church-phone"
                       defaultValue="+234 800 000 0000"
                       className="h-9 sm:h-10 text-xs sm:text-sm"
                     />
                   </div>
                   <div className="space-y-2">
                     <Label htmlFor="church-website" className="text-xs sm:text-sm">Website</Label>
                     <Input
                       id="church-website"
                       defaultValue="https://rjcc.org"
                       className="h-9 sm:h-10 text-xs sm:text-sm"
                     />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <Label htmlFor="church-address" className="text-xs sm:text-sm">Address</Label>
                   <Input
                     id="church-address"
                     defaultValue="123 Church Street, Lagos, Nigeria"
                     className="h-9 sm:h-10 text-xs sm:text-sm"
                   />
                 </div>
                 <Button className="bg-black text-white hover:bg-black/90 h-9 sm:h-10 text-xs sm:text-sm">
                   Save Changes
                 </Button>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <div className="flex items-center gap-2">
                   <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                   <CardTitle className="text-sm sm:text-base">Notifications</CardTitle>
                 </div>
                 <CardDescription className="text-xs sm:text-sm">
                   Configure notification preferences
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4 sm:space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Email Notifications</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Receive email updates about important events
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">WhatsApp Integration</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Send automated messages via WhatsApp
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">New Believer Alerts</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Get notified when new believers are registered
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Attendance Reports</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Weekly attendance summary emails
                     </p>
                   </div>
                   <Switch />
                 </div>
               </CardContent>
             </Card>
           </div>

           {/* Right Column: Security & Data Management */}
           <div className="space-y-4 sm:space-y-6">
             <Card>
               <CardHeader>
                 <div className="flex items-center gap-2">
                   <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                   <CardTitle className="text-sm sm:text-base">Security</CardTitle>
                 </div>
                 <CardDescription className="text-xs sm:text-sm">
                   Manage security and access settings
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4 sm:space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Two-Factor Authentication</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Add an extra layer of security
                     </p>
                   </div>
                   <Switch />
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Biometric Authentication</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Use fingerprint or face recognition
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="space-y-2">
                   <Label className="text-xs sm:text-sm">Session Timeout</Label>
                   <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                     Automatically log out after inactivity
                   </p>
                   <select className="w-full sm:w-48 h-9 sm:h-10 px-3 py-2 border border-border rounded-lg bg-background text-xs sm:text-sm">
                     <option>15 minutes</option>
                     <option>30 minutes</option>
                     <option>1 hour</option>
                     <option>Never</option>
                   </select>
                 </div>
               </CardContent>
             </Card>

             <Card>
               <CardHeader>
                 <div className="flex items-center gap-2">
                   <Database className="w-4 h-4 sm:w-5 sm:h-5" />
                   <CardTitle className="text-sm sm:text-base">Data Management</CardTitle>
                 </div>
                 <CardDescription className="text-xs sm:text-sm">
                   Manage data synchronization and backups
                 </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4 sm:space-y-6">
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Offline Mode</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Enable offline data storage and sync
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="flex items-center justify-between">
                   <div className="space-y-0.5">
                     <Label className="text-xs sm:text-sm">Auto Backup</Label>
                     <p className="text-xs sm:text-sm text-muted-foreground">
                       Automatically backup data daily
                     </p>
                   </div>
                   <Switch defaultChecked />
                 </div>
                 <Separator />
                 <div className="space-y-2">
                   <Label className="text-xs sm:text-sm">Last Backup</Label>
                   <p className="text-xs sm:text-sm text-muted-foreground">
                     May 17, 2026 at 2:30 AM
                   </p>
                   <Button variant="outline" className="mt-2 h-9 sm:h-10 text-xs sm:text-sm">
                     Backup Now
                   </Button>
                 </div>
               </CardContent>
             </Card>
           </div>
         </div>

         {/* Branch Management - Full Width on Mobile */}
         <Card>
           <CardHeader>
             <CardTitle className="text-sm sm:text-base">Branch Management</CardTitle>
             <CardDescription className="text-xs sm:text-sm">
               Configure multi-campus settings
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-3">
             {["Main Branch", "North Branch", "South Branch", "East Branch"].map((branch) => (
               <div
                 key={branch}
                 className="flex items-center justify-between p-3 border border-border rounded-lg"
               >
                 <span className="text-xs sm:text-sm">{branch}</span>
                 <Button variant="outline" size="sm" className="text-xs">
                   Configure
                 </Button>
               </div>
             ))}
             <Button className="bg-black text-white hover:bg-black/90 w-full h-9 sm:h-10 text-xs sm:text-sm">
               Add New Branch
             </Button>
           </CardContent>
         </Card>
         <MobileBottomNav />
       </div>
     </div>
   );
 }