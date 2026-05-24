import React, { useState } from 'react';
import { User, Heart, Briefcase, Users, X } from 'lucide-react';

const AdvancedMemberRegistration = ({ onClose }: { onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState('Personal');
  const [personalInfo, setPersonalInfo] = useState({
    fullName: '',
    gender: 'Male',
    dob: '',
    nationalId: '',
    phone: '',
    altPhone: '',
    email: '',
    city: '',
    address: '',
    branch: 'Main Branch',
  });
  const [maritalStatus, setMaritalStatus] = useState('Single');
  const [employmentStatus, setEmploymentStatus] = useState('Employed');
  const [childrenList, setChildrenList] = useState<{ name: string; gender: string; dob: string }[]>([]);

  const tabs = [
    { name: 'Personal', icon: User },
    { name: 'Marital', icon: Heart },
    { name: 'Employment', icon: Briefcase },
    { name: 'Children', icon: Users },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-gray-100 p-6 relative max-h-[calc(100vh-4rem)] overflow-y-auto">
        <button
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Advanced Member Registration
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Complete member profile with family and employment details
          </p>
        </div>

        <div className="bg-gray-100/80 p-1.5 rounded-xl flex items-center justify-between mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`flex items-center justify-center gap-2 flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gray-900' : 'text-gray-500'}`} />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="min-h-[100px] mb-8">
          {activeTab === 'Personal' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={personalInfo.fullName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, fullName: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, gender: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="mm/dd/yyyy"
                    value={personalInfo.dob}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, dob: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    National ID / Passport
                  </label>
                  <input
                    type="text"
                    value={personalInfo.nationalId}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, nationalId: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Alternative Phone
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.altPhone}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, altPhone: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={personalInfo.city}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, city: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Physical Address
                  </label>
                  <input
                    type="text"
                    value={personalInfo.address}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Branch/Campus <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={personalInfo.branch}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, branch: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none"
                  >
                    <option value="Main Branch">Main Branch</option>
                    <option value="East Branch">East Branch</option>
                    <option value="West Branch">West Branch</option>
                    <option value="North Branch">North Branch</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Marital' && (
            <div className="space-y-2">
              <label htmlFor="marital-status" className="block text-sm font-semibold text-gray-900">
                Marital Status
              </label>
              <div className="relative">
                <select
                  id="marital-status"
                  value={maritalStatus}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all cursor-pointer"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Widowed">Widowed</option>
                </select>
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Employment' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Employment Status
                </label>
                <div className="relative">
                  <select
                    value={employmentStatus}
                    onChange={(e) => setEmploymentStatus(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none font-medium"
                  >
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Self-Employed">Self-Employed</option>
                    <option value="Student">Student</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1.5">
                  Industry
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
            </div>
          )}

          {activeTab === 'Children' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-base font-medium text-gray-900">Children Information</h4>
                <button
                  type="button"
                  onClick={() => setChildrenList((prev) => [...prev, { name: '', gender: 'Male', dob: '' }])}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Add Child
                </button>
              </div>

              {childrenList.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="mx-auto mb-3 w-12 h-12 opacity-50" />
                  <p className="mb-2 font-medium text-gray-900">No children added yet</p>
                  <p className="text-sm">Click "Add Child" to register children</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {childrenList.map((child, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-xl space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">Child {index + 1}</span>
                        <button
                          type="button"
                          onClick={() => setChildrenList((prev) => prev.filter((_, i) => i !== index))}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Child Name"
                          value={child.name}
                          onChange={(e) => {
                            const updated = [...childrenList];
                            updated[index] = { ...updated[index], name: e.target.value };
                            setChildrenList(updated);
                          }}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <select
                          value={child.gender}
                          onChange={(e) => {
                            const updated = [...childrenList];
                            updated[index] = { ...updated[index], gender: e.target.value };
                            setChildrenList(updated);
                          }}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        <input
                          type="date"
                          value={child.dob}
                          onChange={(e) => {
                            const updated = [...childrenList];
                            updated[index] = { ...updated[index], dob: e.target.value };
                            setChildrenList(updated);
                          }}
                          className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab !== 'Marital' && activeTab !== 'Employment' && activeTab !== 'Children' && (
            <div className="text-sm text-gray-400 italic py-4 text-center">
              {activeTab} form fields go here...
            </div>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors">
            Register Member
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedMemberRegistration;
