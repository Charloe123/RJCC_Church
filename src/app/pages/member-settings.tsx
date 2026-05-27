import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";
import { Bell, Shield, Database } from "lucide-react";
import { UsherSidebar } from '../components/UsherSidebar';

export default function MemberSettings() {
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-slate-50">
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="settings" basePath="member" />
      
      <div className="flex-1 p-6 lg:p-8 space-y-6">
        <div>
          <h1>Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your church management system settings
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Church Information</CardTitle>
            <CardDescription>
              Update your church's basic information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="church-name">Church Name</Label>
                <Input
                  id="church-name"
                  defaultValue="Resurrected Jesus Christ Church"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="church-email">Email Address</Label>
                <Input
                  id="church-email"
                  type="email"
                  defaultValue="info@rjcc.org"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="church-phone">Phone Number</Label>
                <Input
                  id="church-phone"
                  defaultValue="+234 800 000 0000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="church-website">Website</Label>
                <Input
                  id="church-website"
                  defaultValue="https://rjcc.org"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="church-address">Address</Label>
              <Input
                id="church-address"
                defaultValue="123 Church Street, Lagos, Nigeria"
              />
            </div>
            <Button className="bg-black text-white hover:bg-black/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notifications</CardTitle>
            </div>
            <CardDescription>
              Configure notification preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive email updates about important events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>WhatsApp Integration</Label>
                <p className="text-sm text-muted-foreground">
                  Send automated messages via WhatsApp
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>New Believer Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when new believers are registered
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Attendance Reports</Label>
                <p className="text-sm text-muted-foreground">
                  Weekly attendance summary emails
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>
              Manage security and access settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Biometric Authentication</Label>
                <p className="text-sm text-muted-foreground">
                  Use fingerprint or face recognition
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Session Timeout</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Automatically log out after inactivity
              </p>
              <select className="w-full md:w-48 px-3 py-2 border border-border rounded-lg bg-background">
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
              <Database className="w-5 h-5" />
              <CardTitle>Data Management</CardTitle>
            </div>
            <CardDescription>
              Manage data synchronization and backups
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Offline Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable offline data storage and sync
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically backup data daily
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Last Backup</Label>
              <p className="text-sm text-muted-foreground">
                May 17, 2026 at 2:30 AM
              </p>
              <Button variant="outline" className="mt-2">
                Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}