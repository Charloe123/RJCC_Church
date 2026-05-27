import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Heart, CreditCard, Banknote, Smartphone, DollarSign } from "lucide-react";
import { UsherSidebar } from '../components/UsherSidebar';
import { MobileBottomNav } from '../components/mobile-bottom-nav';

const donationTypes = [
  { id: "tithe", label: "Tithe", icon: Heart },
  { id: "offering", label: "Offering", icon: Banknote },
  { id: "special", label: "Special Giving", icon: DollarSign },
];

const mobileMoneyOptions = [
  { id: "ecocash", label: "EcoCash" },
  { id: "innbucks", label: "InnBucks" },
  { id: "omari", label: "Omari" },
  { id: "onemoney", label: "OneMoney" },
];

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, etc." },
  { id: "bank", label: "Bank Transfer", icon: Banknote, description: "All major banks" },
  { id: "mobile", label: "Mobile Money", icon: Smartphone, description: "EcoCash, InnBucks, Omari, OneMoney", hasSubmenu: true },
];

export default function Donate() {
  const [darkMode, setDarkMode] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedType, setSelectedType] = useState("tithe");
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [selectedMobileMoney, setSelectedMobileMoney] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Donation submitted:', { amount, selectedType, selectedMethod, selectedMobileMoney, name, email });
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-slate-50'} pt-16 lg:pt-0`}>
      <UsherSidebar darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} active="home" basePath="member" />
      
      <div className="flex-1 p-6 lg:p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Make a Donation</h1>
          <p className="text-muted-foreground mt-1">
            Support the ministry with your generous giving
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Donation Type</CardTitle>
              <CardDescription>Select the type of giving</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {donationTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                        selectedType === type.id
                          ? 'border-black bg-black/5'
                          : 'border-border hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-medium">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amount</CardTitle>
              <CardDescription>Enter your donation amount</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 text-lg"
                  required
                />
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {[10, 25, 50, 100].map((val) => (
                  <Button
                    key={val}
                    type="button"
                    variant="outline"
                    onClick={() => setAmount(val.toString())}
                  >
                    ${val}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Choose how you want to pay</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setSelectedMethod(method.id)}
                      className={`p-4 border rounded-lg flex items-center gap-3 transition-all ${
                        selectedMethod === method.id
                          ? 'border-black bg-black/5'
                          : 'border-border hover:bg-secondary/50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <div className="text-left">
                        <div className="font-medium">{method.label}</div>
                        <div className="text-xs text-muted-foreground">{method.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedMethod === "mobile" && (
                <div className="pl-4 border-l-2 border-border space-y-2">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Select Mobile Money Provider:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {mobileMoneyOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedMobileMoney(option.id)}
                        className={`p-3 border rounded-lg transition-all ${
                          selectedMobileMoney === option.id
                            ? 'border-black bg-black/5'
                            : 'border-border hover:bg-secondary/50'
                        }`}
                      >
                        <span className="text-sm font-medium">{option.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Enter your details for receipt</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full bg-black text-white hover:bg-black/90 py-6 text-lg">
            <Heart className="w-5 h-5 mr-2" />
            Donate Now
          </Button>
        </form>
        <MobileBottomNav />
      </div>
    </div>
  );
}