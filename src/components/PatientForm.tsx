"use client";

import React, { useState } from "react";
import { CheckCircle, Heart, FileText, AlertCircle, ArrowLeft, Cpu, ShieldCheck, Activity, Loader2 } from "lucide-react";
import { PatientRequest } from "@/types";

interface PatientFormProps {
  onSubmitSuccess?: () => void;
  setActiveTab?: (tab: string) => void;
}

export default function PatientForm({ onSubmitSuccess, setActiveTab }: PatientFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    healthConcern: "",
    supportNeeded: "" as PatientRequest["supportNeeded"] | "",
    additionalNotes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showTriageModal, setShowTriageModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Triage state determined by rules
  const [triageResult, setTriageResult] = useState({
    id: "",
    priority: "Low" as PatientRequest["priority"],
    aiSummary: "",
    aiRecommendation: "",
    keywordsFound: [] as string[],
  });

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    
    const ageNum = parseInt(formData.age);
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(ageNum) || ageNum <= 0 || ageNum > 125) {
      newErrors.age = "Please enter a valid age";
    }
    
    if (!formData.gender) newErrors.gender = "Gender selection is required";
    
    const phoneRegex = /^[+]?[0-9]{8,15}$/;
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number (8-15 digits)";
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.healthConcern.trim()) newErrors.healthConcern = "Please describe your health concern";
    if (formData.healthConcern.trim().length < 10) newErrors.healthConcern = "Description must be at least 10 characters";
    if (!formData.supportNeeded) newErrors.supportNeeded = "Please select the type of support needed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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

  // Rule-based NLP Scanner for Triage Priority
  const runTriageScanner = () => {
    const text = formData.healthConcern.toLowerCase();
    
    const highKeywords = ["emergency", "critical", "breathing", "severe", "chest", "fracture", "unconscious", "bleeding", "fever", "shivering", "stroke", "accident", "acute", "hospital"];
    const medKeywords = ["pain", "swelling", "infection", "injury", "diabetes", "diagnose", "scan", "mri", "vision", "stomach", "cough", "pressure"];
    
    let priority: 'High' | 'Medium' | 'Low' = "Low";
    const foundKeywords: string[] = [];

    for (const kw of highKeywords) {
      if (text.includes(kw)) {
        priority = "High";
        foundKeywords.push(kw);
      }
    }

    if (priority === "Low") {
      for (const kw of medKeywords) {
        if (text.includes(kw)) {
          priority = "Medium";
          foundKeywords.push(kw);
        }
      }
    }

    if (foundKeywords.length === 0) {
      foundKeywords.push("routine request");
    }

    // Generate dynamic summary text
    let summaryText = "";
    let recText = "";
    const nameFirst = formData.fullName.split(" ")[0];

    if (priority === "High") {
      summaryText = `Urgent alert: ${formData.age}yo patient ${nameFirst} reports symptoms containing ${foundKeywords.slice(0, 2).join(" / ")}. Critical care intake is requested.`;
      recText = "Immediate routing to a certified volunteer physician and rapid diagnostic coordination.";
    } else if (priority === "Medium") {
      summaryText = `Standard triage: ${formData.age}yo patient ${nameFirst} reports sub-acute issues including ${foundKeywords.slice(0, 2).join(" / ")}.`;
      recText = "Schedule general consultation within 24-48 hours and check pharmacy medicine availability.";
    } else {
      summaryText = `Routine request: ${formData.age}yo patient ${nameFirst} requests basic support for ${formData.supportNeeded.toLowerCase()}.`;
      recText = "Standard administrative review and routine follow-up callback.";
    }

    const ref = `PAT-${Math.floor(100000 + Math.random() * 900000)}`;

    setTriageResult({
      id: ref,
      priority,
      aiSummary: summaryText,
      aiRecommendation: recText,
      keywordsFound: foundKeywords,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsAnalyzing(true);

    // Simulate AI model triage scanning latency
    setTimeout(() => {
      runTriageScanner();
      setIsAnalyzing(false);
      setShowTriageModal(true);
    }, 1500);
  };

  const confirmTriageSubmission = () => {
    const newRequest: PatientRequest = {
      id: triageResult.id,
      fullName: formData.fullName.trim(),
      age: parseInt(formData.age),
      gender: formData.gender,
      phoneNumber: formData.phoneNumber.trim(),
      email: formData.email.trim(),
      healthConcern: formData.healthConcern.trim(),
      supportNeeded: formData.supportNeeded as PatientRequest["supportNeeded"],
      additionalNotes: formData.additionalNotes.trim() || undefined,
      createdAt: new Date().toISOString(),
      priority: triageResult.priority,
      status: "Pending",
      aiSummary: triageResult.aiSummary,
      aiRecommendation: triageResult.aiRecommendation,
    };

    // Store in LocalStorage
    const existing = localStorage.getItem("careconnect_patient_requests");
    const requests = existing ? JSON.parse(existing) : [];
    requests.unshift(newRequest);
    localStorage.setItem("careconnect_patient_requests", JSON.stringify(requests));

    setShowTriageModal(false);
    setIsSubmitted(true);
    
    if (onSubmitSuccess) {
      onSubmitSuccess();
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      age: "",
      gender: "",
      phoneNumber: "",
      email: "",
      healthConcern: "",
      supportNeeded: "",
      additionalNotes: "",
    });
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 p-8 md:p-12 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl text-center space-y-6 transition-all duration-300 animate-fade-in">
        <div className="mx-auto w-20 h-20 bg-teal-50 dark:bg-teal-950/30 rounded-full flex items-center justify-center text-teal-500 dark:text-teal-400">
          <CheckCircle className="h-12 w-12" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
            Thank You, {formData.fullName.split(" ")[0]}!
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Your request has been routed to our NGO dashboard. Our matching system is connecting clinical volunteers in your area.
          </p>
        </div>

        <div className="inline-block px-6 py-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-600 dark:text-teal-400 font-mono font-medium">
          Reference ID: <span className="font-bold">{triageResult.id}</span>
        </div>

        <div className="text-[11px] text-slate-400 dark:text-slate-500 max-w-sm mx-auto">
          Please keep this Reference ID handy. An intake receipt has been dispatched to <span className="font-medium">{formData.email}</span>.
        </div>

        <div className="pt-4 flex justify-center gap-3">
          <button
            id="patient-form-reset-btn"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Submit Another Request
          </button>
          {setActiveTab && (
            <button
              id="patient-form-dashboard-btn"
              onClick={() => setActiveTab("dashboard")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500 hover:bg-teal-650 text-white text-sm font-semibold transition-colors duration-200 cursor-pointer"
            >
              Go to NGO Dashboard
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 p-6 md:p-10 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl transition-all duration-300 relative">
      
      {/* Loading Overlay */}
      {isAnalyzing && (
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-800/80 z-20 flex flex-col items-center justify-center rounded-3xl backdrop-blur-sm">
          <Loader2 className="h-12 w-12 text-teal-500 animate-spin" />
          <h3 className="mt-4 font-bold text-slate-950 dark:text-white text-lg">CareConnect AI Triage Engine</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 px-6 text-center">
            Scanning description for clinical keywords and determining priority routing pathway...
          </p>
        </div>
      )}

      <div className="flex items-center gap-3 mb-8">
        <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400">
          <Heart className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white font-sans">Patient Support Application</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Supported by simulated NLP keyword sorting to prioritize urgent cases.</p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6" id="patient-support-form">
        
        {/* Row 1: Full Name & Age */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="patient-fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.fullName ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.fullName && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.fullName}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Age</label>
            <input
              type="number"
              name="age"
              id="patient-age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 28"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.age ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.age && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.age}
              </span>
            )}
          </div>
        </div>

        {/* Row 2: Gender & Support Needed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Gender</label>
            <select
              name="gender"
              id="patient-gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.gender ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.gender}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Support Needed</label>
            <select
              name="supportNeeded"
              id="patient-supportNeeded"
              value={formData.supportNeeded}
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.supportNeeded ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            >
              <option value="">Select Category</option>
              <option value="Medical Assistance">Medical Assistance (Doctor Visit)</option>
              <option value="Financial Aid">Financial Aid (Treatment Sponsor)</option>
              <option value="Diagnostics">Diagnostics (MRI, CT, Lab Tests)</option>
              <option value="Medicines">Medicines (Pharmacy Supplies)</option>
              <option value="Other">Other Healthcare Aid</option>
            </select>
            {errors.supportNeeded && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.supportNeeded}
              </span>
            )}
          </div>
        </div>

        {/* Row 3: Phone & Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              id="patient-phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., +15551234"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.phoneNumber ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.phoneNumber && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.phoneNumber}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <input
              type="email"
              name="email"
              id="patient-email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., john@example.com"
              className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
                errors.email ? "border-red-500" : "border-slate-200 dark:border-slate-700"
              } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white`}
            />
            {errors.email && (
              <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
                <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
              </span>
            )}
          </div>
        </div>

        {/* Row 4: Health Concern description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Health Concern / Case Description</label>
          <textarea
            name="healthConcern"
            id="patient-healthConcern"
            rows={4}
            value={formData.healthConcern}
            onChange={handleChange}
            placeholder="Type descriptive symptoms here (e.g. high fever, shivering, joint fracture, heart issues) to allow our AI to prioritize triage correctly..."
            className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border ${
              errors.healthConcern ? "border-red-500" : "border-slate-200 dark:border-slate-700"
            } focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white resize-none`}
          />
          {errors.healthConcern && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
              <AlertCircle className="h-3.5 w-3.5" /> {errors.healthConcern}
            </span>
          )}
        </div>

        {/* Row 5: Additional Notes */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Additional Notes <span className="text-xs text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            name="additionalNotes"
            id="patient-additionalNotes"
            rows={2}
            value={formData.additionalNotes}
            onChange={handleChange}
            placeholder="e.g., preferred contact times, transport constraints..."
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:focus:ring-teal-500/20 transition-all text-slate-900 dark:text-white resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            id="patient-submit-btn"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-lg shadow-teal-500/20 transition-all duration-200 active:scale-[0.99] cursor-pointer"
          >
            <Cpu className="h-5 w-5" />
            Analyze & Submit Case
          </button>
        </div>
      </form>

      {/* AI Triage Assessment Modal */}
      {showTriageModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex-shrink-0 px-6 py-5 bg-gradient-to-r from-teal-500 to-teal-600 text-white flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <Cpu className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg">CareConnect AI Triage Analysis</h3>
                <span className="text-xs text-teal-100">Automated Intake Scanning System</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              
              {/* Triage Priority Indicators */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-4">
                <div>
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Triage Level</span>
                  <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 mt-1 rounded-full text-xs font-extrabold ${
                    triageResult.priority === "High"
                      ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/20"
                      : triageResult.priority === "Medium"
                      ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/20"
                  }`}>
                    <Activity className="h-3.5 w-3.5" />
                    {triageResult.priority} Priority
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-semibold uppercase tracking-wider">Reference ID</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-100 text-sm block mt-1">
                    {triageResult.id}
                  </span>
                </div>
              </div>

              {/* Patient Profile Summary */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Target Patient</span>
                <p className="font-bold text-slate-900 dark:text-white text-base">
                  {formData.fullName} ({formData.gender}, {formData.age} Years Old)
                </p>
              </div>

              {/* AI Generated NLP Summary */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Extracted Symptoms Summary</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 leading-relaxed font-medium">
                  "{triageResult.aiSummary}"
                </p>
              </div>

              {/* Action Pathway recommendation */}
              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Recommended Pathway</span>
                <p className="text-slate-600 dark:text-slate-300 text-xs bg-teal-500/5 dark:bg-teal-500/10 p-4 rounded-2xl border border-teal-500/10 leading-relaxed font-semibold flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span>{triageResult.aiRecommendation}</span>
                </p>
              </div>

              {/* Keywords matched */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Identified Symptoms Tokens</span>
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {triageResult.keywordsFound.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 text-[10px] rounded-lg bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-350 font-bold uppercase font-mono">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex-shrink-0 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-700 flex items-center justify-end gap-3">
              <button
                id="btn-cancel-triage"
                onClick={() => setShowTriageModal(false)}
                className="px-4 py-2.5 rounded-full text-xs font-semibold hover:bg-slate-200/50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors cursor-pointer"
              >
                Go Back & Edit
              </button>
              <button
                id="btn-confirm-triage"
                onClick={confirmTriageSubmission}
                className="px-5 py-2.5 rounded-full text-xs font-bold bg-teal-500 text-white hover:bg-teal-650 shadow-md shadow-teal-500/20 active:scale-[0.98] transition-all cursor-pointer"
              >
                Confirm & Submit Request
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
