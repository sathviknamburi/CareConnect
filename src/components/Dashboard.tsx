"use client";

import React, { useState, useEffect } from "react";
import { Users, FileText, Activity, AlertCircle, Database, Trash2, Calendar, ClipboardList, CheckCircle, Search, Filter, ShieldCheck, UserPlus, RefreshCw, X } from "lucide-react";
import { PatientRequest, VolunteerRegistration } from "@/types";

interface DashboardProps {
  refreshTrigger: number;
  triggerRefresh: () => void;
}

export default function Dashboard({ refreshTrigger, triggerRefresh }: DashboardProps) {
  const [requests, setRequests] = useState<PatientRequest[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerRegistration[]>([]);
  
  const [activeTab, setActiveTab] = useState<"patients" | "volunteers">("patients");
  
  // Collapsible / Modal state
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [expandedVolunteerId, setExpandedVolunteerId] = useState<string | null>(null);

  const selectedRequest = requests.find((r) => r.id === selectedRequestId);
  const volunteerAssigned = selectedRequest
    ? volunteers.find((v) => v.id === selectedRequest.assignedVolunteerId)
    : undefined;

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  
  // Volunteer specific filters
  const [skillFilter, setSkillFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");

  // Load data from LocalStorage
  const loadData = () => {
    const patientsData = localStorage.getItem("careconnect_patient_requests");
    const volunteersData = localStorage.getItem("careconnect_volunteer_registrations");
    
    setRequests(patientsData ? JSON.parse(patientsData) : []);
    setVolunteers(volunteersData ? JSON.parse(volunteersData) : []);
  };

  useEffect(() => {
    loadData();
  }, [refreshTrigger]);

  // Seed Mock Data
  const seedMockData = () => {
    const mockPatients: PatientRequest[] = [
      {
        id: "PAT-843029",
        fullName: "Sarah Connor",
        age: 42,
        gender: "Female",
        phoneNumber: "+15550192",
        email: "sarah.c@example.com",
        healthConcern: "Requires ongoing therapeutic joint diagnostics following chronic shoulder fracture and severe pain.",
        supportNeeded: "Diagnostics",
        additionalNotes: "Prefers morning calls.",
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        priority: "High",
        status: "Pending",
        aiSummary: "Urgent alert: 42yo patient Sarah reports symptoms containing pain / fracture. Critical care intake is requested.",
        aiRecommendation: "Immediate routing to a certified volunteer physician and rapid diagnostic coordination.",
      },
      {
        id: "PAT-374920",
        fullName: "David Miller",
        age: 67,
        gender: "Male",
        phoneNumber: "+15550183",
        email: "david.m@example.com",
        healthConcern: "Hypertension patient needing monthly essential prescription refills (Amlodipine & Losartan).",
        supportNeeded: "Medicines",
        additionalNotes: "Financial support needed for high drug costs.",
        createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
        priority: "Low",
        status: "Pending",
        aiSummary: "Routine request: 67yo patient David requests basic support for medicines.",
        aiRecommendation: "Standard administrative review and routine follow-up callback.",
      },
      {
        id: "PAT-129038",
        fullName: "Amina Al-Mansoor",
        age: 31,
        gender: "Female",
        phoneNumber: "+15550144",
        email: "amina.am@example.com",
        healthConcern: "Severe pediatric asthma treatment guidance and medicine dispenser requested for her toddler.",
        supportNeeded: "Medical Assistance",
        additionalNotes: "Speaks Arabic and English.",
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        priority: "High",
        status: "Assigned",
        assignedVolunteerId: "VOL-104928",
        aiSummary: "Urgent alert: 31yo patient Amina reports symptoms containing severe / asthma. Critical care intake is requested.",
        aiRecommendation: "Immediate routing to a certified volunteer physician.",
      },
      {
        id: "PAT-903842",
        fullName: "Liam O'Connor",
        age: 55,
        gender: "Male",
        phoneNumber: "+15550255",
        email: "liam.oc@example.com",
        healthConcern: "Post-surgery rehabilitative diagnostics funding requested for lumbar spinal decompression.",
        supportNeeded: "Financial Aid",
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
        priority: "Medium",
        status: "Resolved",
        aiSummary: "Standard triage: 55yo patient Liam reports sub-acute issues including diagnostics / funding.",
        aiRecommendation: "Schedule general consultation and check funding grants.",
      },
      {
        id: "PAT-671239",
        fullName: "Roberto Garcia",
        age: 49,
        gender: "Male",
        phoneNumber: "+15550266",
        email: "roberto.g@example.com",
        healthConcern: "Requires dental surgeon referral and medicine refills for acute tooth infection.",
        supportNeeded: "Medical Assistance",
        additionalNotes: "Has no transport to clinics.",
        createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
        priority: "Medium",
        status: "Pending",
        aiSummary: "Standard triage: 49yo patient Roberto reports sub-acute issues including infection.",
        aiRecommendation: "Schedule consultation within 24-48 hours.",
      },
    ];

    const mockVolunteers: VolunteerRegistration[] = [
      {
        id: "VOL-104928",
        fullName: "Dr. Elizabeth Vance",
        email: "elizabeth.v@careconnect.org",
        phoneNumber: "+15550100",
        city: "Boston",
        skills: ["Medical Support (MD/RN)", "Patient Care & Guiding"],
        availability: "Weekends",
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: "VOL-394029",
        fullName: "Marcus Johnson",
        email: "marcus.j@example.com",
        phoneNumber: "+15550122",
        city: "Chicago",
        skills: ["Event Management", "Logistics & Transport"],
        availability: "Both",
        createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
      },
      {
        id: "VOL-583920",
        fullName: "Sophia Chang",
        email: "sophia.c@example.com",
        phoneNumber: "+15550133",
        city: "San Francisco",
        skills: ["Mental Health Counseling", "Translating & Language Assistance"],
        availability: "Weekdays",
        createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
      },
    ];

    localStorage.setItem("careconnect_patient_requests", JSON.stringify(mockPatients));
    localStorage.setItem("careconnect_volunteer_registrations", JSON.stringify(mockVolunteers));
    loadData();
    triggerRefresh();
  };

  // Clear Database
  const clearDatabase = () => {
    if (confirm("Are you sure you want to clear all requests and volunteer registrations?")) {
      localStorage.removeItem("careconnect_patient_requests");
      localStorage.removeItem("careconnect_volunteer_registrations");
      loadData();
      triggerRefresh();
    }
  };

  // Modify request status (Mark Resolved / Mark Pending)
  const handleToggleResolve = (id: string, currentStatus: PatientRequest["status"]) => {
    const updated = requests.map((req) => {
      if (req.id === id) {
        const nextStatus = currentStatus === "Resolved" ? "Pending" : "Resolved";
        return { ...req, status: nextStatus };
      }
      return req;
    });
    localStorage.setItem("careconnect_patient_requests", JSON.stringify(updated));
    loadData();
    triggerRefresh();
  };

  // Delete Request
  const handleDeleteRequest = (id: string) => {
    if (confirm(`Are you sure you want to delete request ${id}?`)) {
      const filtered = requests.filter((req) => req.id !== id);
      localStorage.setItem("careconnect_patient_requests", JSON.stringify(filtered));
      loadData();
      triggerRefresh();
    }
  };

  // Assign Volunteer to Request
  const handleAssignVolunteer = (requestId: string, volunteerId: string) => {
    const updated = requests.map((req) => {
      if (req.id === requestId) {
        if (!volunteerId) {
          // Unassign
          const { assignedVolunteerId, ...rest } = req;
          return { ...rest, status: "Pending" as const };
        } else {
          return {
            ...req,
            assignedVolunteerId: volunteerId,
            status: "Assigned" as const,
          };
        }
      }
      return req;
    });
    localStorage.setItem("careconnect_patient_requests", JSON.stringify(updated));
    loadData();
    triggerRefresh();
  };

  // Get dynamic dashboard stats
  const getMetrics = () => {
    const totalRequestsCount = requests.length;
    const totalVolunteersCount = volunteers.length;
    const resolvedRequestsCount = requests.filter((r) => r.status === "Resolved").length;
    const highPriorityRequestsCount = requests.filter((r) => r.priority === "High" && r.status !== "Resolved").length;

    return {
      totalRequestsCount,
      totalVolunteersCount,
      resolvedRequestsCount,
      highPriorityRequestsCount,
    };
  };

  const {
    totalRequestsCount,
    totalVolunteersCount,
    resolvedRequestsCount,
    highPriorityRequestsCount,
  } = getMetrics();

  // Dynamic summary generation
  const generateSummaryText = () => {
    if (requests.length === 0 && volunteers.length === 0) {
      return "The CareConnect platform registry is currently empty. Submit patient or volunteer forms to populate statistics.";
    }

    const pending = requests.filter((r) => r.status === "Pending").length;
    const assigned = requests.filter((r) => r.status === "Assigned").length;
    const high = requests.filter((r) => r.priority === "High" && r.status !== "Resolved").length;

    let text = `Currently, CareConnect has intaked ${requests.length} patient cases and registered ${volunteers.length} community volunteers. `;
    
    if (requests.length > 0) {
      text += `Out of these, ${resolvedRequestsCount} are fully resolved, ${assigned} are assigned to active clinicians, and ${pending} remain pending review. `;
      if (high > 0) {
        text += `Critical alert: There are ${high} high-priority cases requiring urgent routing.`;
      } else {
        text += "No critical triage backlogs reported.";
      }
    }

    return text;
  };

  // Filter Logic - Patients
  const filteredRequests = requests.filter((req) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      req.id.toLowerCase().includes(query) ||
      req.fullName.toLowerCase().includes(query) ||
      req.healthConcern.toLowerCase().includes(query) ||
      req.email.toLowerCase().includes(query) ||
      req.phoneNumber.includes(query);

    const matchesPriority = priorityFilter === "All" || req.priority === priorityFilter;
    const matchesStatus = statusFilter === "All" || req.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || req.supportNeeded === categoryFilter;

    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  // Filter Logic - Volunteers
  const filteredVolunteers = volunteers.filter((vol) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      vol.id.toLowerCase().includes(query) ||
      vol.fullName.toLowerCase().includes(query) ||
      vol.city.toLowerCase().includes(query) ||
      vol.email.toLowerCase().includes(query) ||
      vol.skills.some((s) => s.toLowerCase().includes(query));

    const matchesSkill =
      skillFilter === "All" || vol.skills.some((s) => s.startsWith(skillFilter));
    const matchesCity = cityFilter === "All" || vol.city.toLowerCase() === cityFilter.toLowerCase();

    return matchesSearch && matchesSkill && matchesCity;
  });

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setPriorityFilter("All");
    setStatusFilter("All");
    setCategoryFilter("All");
    setSkillFilter("All");
    setCityFilter("All");
  };

  // Get distinct cities for filters
  const getUniqueCities = () => {
    const cities = volunteers.map((v) => v.city.trim());
    return Array.from(new Set(cities));
  };

  const uniqueCities = getUniqueCities();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans transition-all duration-300">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200/50 dark:border-slate-800 pb-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">NGO Workstation Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Match patients, assign volunteer resources, and triage medical cases.</p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <button
            id="db-seed-btn"
            onClick={seedMockData}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-teal-500/10 hover:bg-teal-500/25 text-teal-600 dark:text-teal-400 text-xs font-bold border border-teal-500/20 transition-all cursor-pointer"
          >
            <Database className="h-3.5 w-3.5" />
            Seed Sample Data
          </button>
          <button
            id="db-clear-btn"
            onClick={clearDatabase}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/25 text-red-600 dark:text-red-400 text-xs font-bold border border-red-500/20 transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Reset Registers
          </button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 flex-shrink-0">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Intaked Requests</span>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalRequestsCount}</h4>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 flex-shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">High Priority Cases</span>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{highPriorityRequestsCount}</h4>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 flex-shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Active Volunteers</span>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{totalVolunteersCount}</h4>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 flex-shrink-0">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Resolved Cases</span>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">{resolvedRequestsCount}</h4>
          </div>
        </div>
      </div>

      {/* NLP Summary Block */}
      <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200/50 dark:border-slate-800 flex items-start gap-3.5">
        <div className="p-2 bg-teal-500 text-white rounded-xl shadow-sm flex-shrink-0">
          <ClipboardList className="h-4.5 w-4.5" />
        </div>
        <div>
          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">AI NLP Activity Assessment</span>
          <p className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold mt-1 italic">
            "{generateSummaryText()}"
          </p>
        </div>
      </div>

      {/* Filters & Workspace Container */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl overflow-hidden">
        
        {/* Workspace Tab Switcher */}
        <div className="flex justify-between items-center px-6 pt-5 pb-1 bg-slate-50 dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/60">
          <div className="flex gap-4">
            <button
              id="tab-patients-btn"
              onClick={() => { setActiveTab("patients"); resetFilters(); }}
              className={`px-4 py-3 text-sm font-extrabold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "patients"
                  ? "border-teal-500 text-teal-600 dark:text-teal-400"
                  : "border-transparent text-slate-450 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <FileText className="h-4 w-4" />
              Patient Intakes ({filteredRequests.length})
            </button>
            <button
              id="tab-volunteers-btn"
              onClick={() => { setActiveTab("volunteers"); resetFilters(); }}
              className={`px-4 py-3 text-sm font-extrabold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === "volunteers"
                  ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                  : "border-transparent text-slate-450 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              <Users className="h-4 w-4" />
              Volunteer Registry ({filteredVolunteers.length})
            </button>
          </div>

          <button
            onClick={resetFilters}
            className="text-xs font-bold text-slate-500 hover:text-teal-500 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Clear Filters
          </button>
        </div>

        {/* Dynamic Filter Controls Panel */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-900/20 border-b border-slate-100 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          
          {/* 1. Keyword Search */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Search className="h-3 w-3" /> Keyword Search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search names, ID, symptoms..."
              className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-slate-900 dark:text-white"
            />
          </div>

          {activeTab === "patients" ? (
            /* Patient Specific Filters */
            <>
              {/* 2. Priority Filter */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Priority Level
                </span>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="All">All Priorities</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>

              {/* 3. Status Filter */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Case Status
                </span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Assigned">Active Assigned</option>
                  <option value="Resolved">Resolved Cases</option>
                </select>
              </div>

              {/* 4. Category Filter */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Support Category
                </span>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="All">All Categories</option>
                  <option value="Medical Assistance">Medical Assistance</option>
                  <option value="Financial Aid">Financial Aid</option>
                  <option value="Diagnostics">Diagnostics</option>
                  <option value="Medicines">Medicines</option>
                  <option value="Other">Other Aid</option>
                </select>
              </div>
            </>
          ) : (
            /* Volunteer Specific Filters */
            <>
              {/* 2. Skill Filter */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Skillset Specialty
                </span>
                <select
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="All">All Specialties</option>
                  <option value="Medical Support">Medical Physicians / nurses</option>
                  <option value="Patient Care">Patient guidance</option>
                  <option value="Mental Health">Counseling Specialists</option>
                  <option value="Logistics">Logistics & Supply</option>
                  <option value="Event Management">Event Organizers</option>
                  <option value="Administrative">Admin & Type support</option>
                </select>
              </div>

              {/* 3. City Filter */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                  <Filter className="h-3 w-3" /> Filter by City
                </span>
                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                >
                  <option value="All">All Cities</option>
                  {uniqueCities.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Spacing placeholder */}
              <div className="hidden lg:block"></div>
            </>
          )}

        </div>

        {/* Data Grid lists */}
        <div className="p-6">
          {activeTab === "patients" ? (
            /* Patients List */
            filteredRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <AlertCircle className="h-10 w-10 mx-auto opacity-40 text-slate-500" />
                <p className="text-sm font-semibold">No patient requests match selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-hidden border border-slate-100 dark:border-slate-700/60 rounded-2xl shadow-inner">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60 font-bold">
                        <th className="p-4">Ref ID</th>
                        <th className="p-4">Patient Name</th>
                        <th className="p-4 hidden sm:table-cell">Gender & Age</th>
                        <th className="p-4">Priority</th>
                        <th className="p-4">Triage Status</th>
                        <th className="p-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                      {filteredRequests.map((req) => {
                        return (
                          <React.Fragment key={req.id}>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors text-slate-700 dark:text-slate-200">
                              <td className="p-4 font-mono font-bold text-teal-600 dark:text-teal-400">{req.id}</td>
                              <td className="p-4 font-bold">{req.fullName}</td>
                              <td className="p-4 hidden sm:table-cell">{req.gender}, {req.age} yrs</td>
                              <td className="p-4">
                                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                                  req.priority === "High"
                                    ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400"
                                    : req.priority === "Medium"
                                    ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400"
                                    : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                                }`}>
                                  {req.priority}
                                </span>
                              </td>
                              <td className="p-4">
                                <span className={`inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full ${
                                  req.status === "Resolved"
                                    ? "bg-emerald-500/10 text-emerald-650 dark:bg-emerald-500/20 dark:text-emerald-400"
                                    : req.status === "Assigned"
                                    ? "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                                    : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-350"
                                }`}>
                                  {req.status}
                                </span>
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  id={`btn-expand-${req.id}`}
                                  onClick={() => setSelectedRequestId(req.id)}
                                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                                >
                                  View Triage
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          ) : (
            /* Volunteers List */
            filteredVolunteers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 space-y-2">
                <AlertCircle className="h-10 w-10 mx-auto opacity-40 text-slate-500" />
                <p className="text-sm font-semibold">No volunteers match selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="overflow-hidden border border-slate-100 dark:border-slate-700/60 rounded-2xl shadow-inner">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 dark:bg-slate-900/40 text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-700/60 font-bold">
                        <th className="p-4">Reg ID</th>
                        <th className="p-4">Volunteer Name</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Availability</th>
                        <th className="p-4 hidden sm:table-cell">Primary Specialty</th>
                        <th className="p-4 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                      {filteredVolunteers.map((vol) => {
                        const isExpanded = expandedVolunteerId === vol.id;
                        return (
                          <React.Fragment key={vol.id}>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors text-slate-700 dark:text-slate-200">
                              <td className="p-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">{vol.id}</td>
                              <td className="p-4 font-bold">{vol.fullName}</td>
                              <td className="p-4 font-semibold">{vol.city}</td>
                              <td className="p-4">
                                <span className="inline-block px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10">
                                  {vol.availability}
                                </span>
                              </td>
                              <td className="p-4 hidden sm:table-cell text-slate-500 dark:text-slate-400 font-medium">
                                {vol.skills[0].split(" (")[0]}
                              </td>
                              <td className="p-4 text-right">
                                <button
                                  id={`btn-expand-vol-${vol.id}`}
                                  onClick={() => setExpandedVolunteerId(isExpanded ? null : vol.id)}
                                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                                >
                                  {isExpanded ? "Hide Drawer" : "View Skills"}
                                </button>
                              </td>
                            </tr>
                            
                            {/* Expanded Details Drawer */}
                            {isExpanded && (
                              <tr className="bg-slate-50/40 dark:bg-slate-900/10 text-xs">
                                <td colSpan={6} className="p-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                                    <div className="space-y-3">
                                      <h6 className="font-bold text-slate-800 dark:text-slate-150 border-b border-slate-100 dark:border-slate-700 pb-1.5 flex items-center gap-1.5">
                                        <Users className="h-4 w-4 text-indigo-500" />
                                        Volunteer Skills Profile
                                      </h6>
                                      <div className="flex flex-wrap gap-1.5 pt-1">
                                        {vol.skills.map((skill) => (
                                          <span
                                            key={skill}
                                            className="px-2.5 py-1.5 rounded-xl bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10 font-bold text-[10px] uppercase"
                                          >
                                            {skill}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <h6 className="font-bold text-slate-800 dark:text-slate-150 border-b border-slate-100 dark:border-slate-700 pb-1.5 flex items-center gap-1.5">
                                        <Calendar className="h-4 w-4 text-indigo-500" />
                                        Contact Information & Logistics
                                      </h6>
                                      <div className="space-y-1.5 text-slate-600 dark:text-slate-350">
                                        <p><span className="text-slate-400 font-normal">Location:</span> <span className="font-semibold">{vol.city}</span></p>
                                        <p><span className="text-slate-400 font-normal">Phone Number:</span> <span className="font-semibold">{vol.phoneNumber}</span></p>
                                        <p><span className="text-slate-400 font-normal">Email:</span> <span className="font-semibold">{vol.email}</span></p>
                                        <p><span className="text-slate-400 font-normal">Availability:</span> <span className="font-semibold">{vol.availability}</span></p>
                                        <p><span className="text-slate-400 font-normal">Registered:</span> <span className="font-mono">{formatDate(vol.createdAt)}</span></p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Patient Triage Details Modal Overlay */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in font-sans">
          <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-150 dark:border-slate-700 shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex-shrink-0 px-6 py-5 bg-gradient-to-r from-teal-505 to-indigo-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <ClipboardList className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Support Request Details</h3>
                  <span className="text-xs text-teal-100">Reference ID: {selectedRequest.id}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRequestId(null)}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer text-white"
                aria-label="Close details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed">
                
                {/* Left side: Contact & Description */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Contact Information</h4>
                    <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <p><span className="text-slate-400">Patient Name:</span> <strong className="text-slate-900 dark:text-white">{selectedRequest.fullName}</strong></p>
                      <p><span className="text-slate-400">Age & Gender:</span> <span className="font-semibold">{selectedRequest.age} years, {selectedRequest.gender}</span></p>
                      <p><span className="text-slate-400">Phone Number:</span> <span className="font-semibold">{selectedRequest.phoneNumber}</span></p>
                      <p><span className="text-slate-400">Email Address:</span> <span className="font-semibold">{selectedRequest.email}</span></p>
                      <p><span className="text-slate-400">Intaked Time:</span> <span className="font-mono text-xs">{formatDate(selectedRequest.createdAt)}</span></p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Case Description</h4>
                    <p className="text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {selectedRequest.healthConcern}
                    </p>
                    {selectedRequest.additionalNotes && (
                      <p className="text-xs text-slate-400 italic font-medium">"* Notes: {selectedRequest.additionalNotes}"</p>
                    )}
                  </div>
                </div>

                {/* Right side: AI Summary & Clinical Matcher */}
                <div className="space-y-4">
                  
                  {/* AI Summary Card */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/60 space-y-3.5 shadow-inner">
                    <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-455 font-bold border-b border-slate-100 dark:border-slate-800 pb-2 text-xs">
                      <Activity className="h-4 w-4" />
                      <span>AI Triage Diagnostics</span>
                      <span className={`ml-auto inline-block px-2.5 py-0.5 text-[9px] font-extrabold rounded-full ${
                        selectedRequest.priority === "High"
                          ? "bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border border-red-500/10"
                          : selectedRequest.priority === "Medium"
                          ? "bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border border-amber-500/10"
                          : "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border border-emerald-500/10"
                      }`}>
                        {selectedRequest.priority} Priority
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Extracted Summary</span>
                      <p className="text-slate-600 dark:text-slate-350 text-xs font-semibold leading-relaxed">
                        "{selectedRequest.aiSummary}"
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Action Route</span>
                      <p className="text-teal-600 dark:text-teal-400 text-xs font-bold leading-relaxed">
                        {selectedRequest.aiRecommendation}
                      </p>
                    </div>
                  </div>

                  {/* Smart Matcher Dropdown */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/50 dark:border-slate-700/60 space-y-3 shadow-inner">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <UserPlus className="h-4 w-4 text-indigo-500" />
                      Smart Clinical Matcher
                    </h4>

                    {selectedRequest.status === "Assigned" && volunteerAssigned ? (
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                          Assigned coordinator: <strong className="text-slate-900 dark:text-white">{volunteerAssigned.fullName}</strong><br />
                          <span className="text-[10px] text-slate-400 font-semibold">{volunteerAssigned.skills[0].split(" (")[0]} • {volunteerAssigned.city}</span>
                        </p>
                        <button
                          onClick={() => handleAssignVolunteer(selectedRequest.id, "")}
                          className="text-[10px] font-bold text-red-500 hover:underline cursor-pointer"
                        >
                          Unassign Coordinator
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2.5">
                        <select
                          onChange={(e) => handleAssignVolunteer(selectedRequest.id, e.target.value)}
                          defaultValue=""
                          className="w-full text-xs px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none text-slate-900 dark:text-white"
                        >
                          <option value="" disabled>Select Volunteer to Match...</option>
                          {volunteers.map((vol) => (
                            <option key={vol.id} value={vol.id}>
                              {vol.fullName} ({vol.city} - {vol.skills[0].split(" (")[0]})
                            </option>
                          ))}
                        </select>
                        <p className="text-[10px] text-slate-400">Match based on city/expertise options.</p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex-shrink-0 px-6 py-4 bg-slate-50 dark:bg-slate-900 border-t border-slate-150 dark:border-slate-700 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleResolve(selectedRequest.id, selectedRequest.status)}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold border transition-colors cursor-pointer ${
                    selectedRequest.status === "Resolved"
                      ? "bg-slate-200 border-slate-305 text-slate-705 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                      : "bg-emerald-500 hover:bg-emerald-600 border-transparent text-white shadow-md shadow-emerald-500/15"
                  }`}
                >
                  {selectedRequest.status === "Resolved" ? "Re-open Case" : "Mark Resolved"}
                </button>
                <button
                  onClick={() => { handleDeleteRequest(selectedRequest.id); setSelectedRequestId(null); }}
                  className="px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all cursor-pointer"
                >
                  Delete Case
                </button>
              </div>
              <button
                onClick={() => setSelectedRequestId(null)}
                className="px-4 py-2 rounded-full bg-slate-105 dark:bg-slate-750 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
