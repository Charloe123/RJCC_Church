import React, { useState } from 'react';
import { User, Heart, Briefcase, Users, Calendar, X } from 'lucide-react';
import AdvancedMemberRegistration from './advanced-member-registration';
import { db } from '../../firebase/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'sonner';

interface NewMemberRegistrationPopupProps {
  onClose: () => void;
}

export default function NewMemberRegistrationPopup({ onClose }: NewMemberRegistrationPopupProps) {
  const [activeTab, setActiveTab] = useState('Personal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvancedPopup, setShowAdvancedPopup] = useState(false);

  const tabs = [
    { id: 'Personal', label: 'Personal', icon: User },
    { id: 'Marital', label: 'Marital', icon: Heart },
    { id: 'Employment', label: 'Employment', icon: Briefcase },
    { id: 'Children', label: 'Children', icon: Users },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'Employment') {
      setShowAdvancedPopup(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Collect form data (in a real app, you'd use form state or a form library)
      // For now, we'll create a basic member object with placeholder data
      const memberData = {
        fullName: "New Member", // Would come from form state
        gender: "Male",         // Would come from form state
        dateOfBirth: Timestamp.fromDate(new Date()), // Would come from form state
        nationalId: "",         // Would come from form state
        phoneNumber: "",        // Would come from form state
        alternativePhone: "",   // Would come from form state
        email: "",              // Would come from form state
        city: "",               // Would come from form state
        physicalAddress: "",    // Would come from form state
        branch: "Main Branch",  // Would come from form state
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      // Save to Firestore
      if (db) {
        const docRef = await addDoc(collection(db, "members"), memberData);
        toast.success("Member registered successfully!", {
          description: `Member ID: ${docRef.id}`
        });
      } else {
        // Fallback to demo mode if Firebase not configured
        toast.success("Member registration submitted successfully! (Demo mode)");
      }
      
      setIsSubmitting(false);
      onClose();
    } catch (error: any) {
      console.error("Error registering member:", error);
      toast.error("Failed to register member. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      
      {/* Popup Container */}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative border border-gray-100 max-h-[calc(100vh-4rem)] overflow-y-auto">
        
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition" onClick={onClose}>
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Register New Member</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Complete member profile with family and employment details
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-gray-100 p-1 rounded-xl flex space-x-1 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Form Content (Conditional rendering can be added based on activeTab) */}
        {!showAdvancedPopup && activeTab === 'Personal' && (
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65em_auto] bg-[right_12px_center] bg-no-repeat pr-10">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition text-gray-400"
                    placeholder="mm/dd/yyyy"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  National ID / Passport
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Alternative Phone
                </label>
                <input
                  type="tel"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              </div>
            </div>

            {/* Row 5 - Full Width Physical Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Physical Address
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>

            {/* Row 6 - Full Width Branch Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Branch/Campus <span className="text-red-500">*</span>
              </label>
              <select className="w-full px-3 py-2 bg-gray-50 border border-transparent rounded-lg focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65em_auto] bg-[right_12px_center] bg-no-repeat pr-10">
                <option value="Main Branch">Main Branch</option>
                <option value="East Branch">East Branch</option>
                <option value="West Branch">West Branch</option>
                <option value="North Branch">North Branch</option>
              </select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-6 rounded-lg transition active:scale-[0.98]"
              >
                Register Member
              </button>
            </div>
          </form>
        )}
      </div>
      {showAdvancedPopup && <AdvancedMemberRegistration onClose={() => setShowAdvancedPopup(false)} />}
    </div>
  );
}