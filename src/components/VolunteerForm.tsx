"use client";

import React, { useState } from "react";
import { UserCheck, Sparkles, AlertCircle, Check, RotateCcw } from "lucide-react";
import { VolunteerRegistration } from "@/types";

interface VolunteerFormProps {
  onSubmitSuccess?: () => void;
}

export default function VolunteerForm({ onSubmitSuccess }: VolunteerFormProps) {
  const availableSkills = [
    "Medical Support (MD/RN)",
    "Patient Care & Guiding",
    "Mental Health Counseling",
    "Event Management",
    "Administrative & Typing",
    "Logistics & Transport",
    "Marketing & PR",
    "Translating & Language Assistance",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    availability: "" as VolunteerRegistration["availability"] | "",
  });

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      let updated;
      if (prev.includes(skill)) {
        updated = prev.filter((s) => s !== skill);
      } else {
        updated = [...prev, skill];
      }
      
      // Clear skills error if selected
      if (errors.skills && updated.length > 0) {
        setErrors((errs) => {
          const copy = { ...errs };
          delete copy.skills;
          return copy;
        });
      }
      return updated;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    const phoneRegex = /^[+]?[0-9]{8,15}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number (8-15 digits)";
    }
    
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.availability) newErrors.availability = "Availability selection is required";
    if (selectedSkills.length === 0) newErrors.skills = "Please select at least one skill";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newVolunteer: VolunteerRegistration = {
      id: `VOL-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phoneNumber.trim(),
      city: formData.city.trim(),
      skills: selectedSkills,
      availability: formData.availability as VolunteerRegistration["availability"],
      createdAt: new Date().toISOString(),
    };

    // Store in LocalStorage
    const existing = localStorage.getItem("careconnect_volunteer_registrations");
    const volunteers = existing ? JSON.parse(existing) : [];
    volunteers.unshift(newVolunteer);
    localStorage.setItem("careconnect_volunteer_registrations", JSON.stringify(volunteers));

    setIsSubmitted(true);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      city: "",
      availability: "",
    });
    setSelectedSkills([]);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl text-center space-y-6 transition-all duration-300 animate-fade-in">
        <div className="mx-auto w-20 h-20 bg-indigo-50 dark:bg-indigo-950/30 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-400">
          <Sparkles className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Welcome to CareConnect!
          </h3>
          <p className="text-slate-500 dark:text-slate-400">
            Thank you for registering as a volunteer. Your profile has been saved successfully in our local register database.
          </p>
        </div>

        <div className="text-sm text-slate-600 dark:text-slate-350 bg-indigo-500/5 rounded-2xl p-5 border border-indigo-500/10 max-w-md mx-auto leading-relaxed">
          Our volunteer coordinators review entries daily. We will contact you soon on <span className="font-semibold">{formData.phoneNumber}</span> to invite you to our next training and orientation program.
        </div>

        <div className="pt-4">
          <button
            id="volunteer-form-reset-btn"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            Register Another Person
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl transition-all duration-300">
      
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          <UserCheck className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Volunteer Registration</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Join our medical camps and help us expand healthcare accessibility.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6" id="volunteer-registration-form">
        
        {/* Row 1: Full Name & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="volunteer-fullName"
              value={formData.fullName}
              onChange={handleTextChange}
              placeholder="e.g., Jane Smith"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.fullName ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.fullName && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              name="email"
              id="volunteer-email"
              value={formData.email}
              onChange={handleTextChange}
              placeholder="e.g., jane.smith@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.email && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Phone & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="volunteer-phoneNumber"
              value={formData.phoneNumber}
              onChange={handleTextChange}
              placeholder="e.g., +15559876"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.phoneNumber ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.phoneNumber && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.phoneNumber}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">City</label>
            <input
              type="text"
              name="city"
              id="volunteer-city"
              value={formData.city}
              onChange={handleTextChange}
              placeholder="e.g., Chicago"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.city ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.city && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.city}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Availability */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Availability</label>
          <select
            name="availability"
            id="volunteer-availability"
            value={formData.availability}
            onChange={handleTextChange}
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
              errors.availability ? "border-red-500" : "border-slate-200 dark:border-slate-700"
            } focus:outline-none focus:ring-2 focus:ring-indigo-500/25 dark:focus:ring-indigo-500/20 transition-all text-slate-900 dark:text-white`}
          >
            <option value="">Select Availability</option>
            <option value="Weekdays">Weekdays (Mon - Fri)</option>
            <option value="Weekends">Weekends (Sat - Sun)</option>
            <option value="Both">Both (Flexible Schedule)</option>
          </select>
          {errors.availability && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.availability}
            </span>
          )}
        </div>

        {/* Skills Selection (Chips / Checkboxes) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Skills & Areas of Interest</label>
            <span className="text-xs text-slate-400">Select all that apply</span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {availableSkills.map((skill) => {
              const isSelected = selectedSkills.includes(skill);
              return (
                <button
                  type="button"
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? "bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                      : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <span>{skill}</span>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {errors.skills && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-medium mt-1">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.skills}
            </span>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            id="volunteer-submit-btn"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-indigo-500 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-200 active:scale-[0.99]"
          >
            <UserCheck className="h-5 w-5" />
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
}
