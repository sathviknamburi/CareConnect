"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, HelpCircle, Heart, Star, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import PatientForm from "@/components/PatientForm";
import VolunteerForm from "@/components/VolunteerForm";
import Dashboard from "@/components/Dashboard";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", msg: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.msg.trim()) return;
    setContactSuccess(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", msg: "" });
      setContactSuccess(false);
    }, 4000);
  };

  const testimonials = [
    {
      quote: "CareConnect sponsored my father's diagnostic tests when we were completely out of options. Their team was incredibly prompt and treated us like family.",
      author: "Elena Rostova",
      role: "Patient Family Representative",
      rating: 5,
    },
    {
      quote: "Volunteering with the CareConnect pediatric camps has allowed me to utilize my medical expertise to make a tangible, raw difference in remote villages.",
      author: "Dr. Ryan Reynolds",
      role: "Volunteer Pediatrician",
      rating: 5,
    },
    {
      quote: "The transparency is what sold me. Seeing their real-time volunteer count and patient requests through the public dashboard shows they are organized and active.",
      author: "Clarissa Vance",
      role: "NGO Donor & Advocate",
      rating: 5,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sticky Navigation */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Main Page Layout */}
      <main className="flex-grow">
        
        {/* 1. Home Tab Panels */}
        {activeSection === "home" && (
          <>
            <Hero setActiveTab={setActiveSection} />
            <Stats />
            
            {/* Impact & Mission details */}
            <section className="py-20 bg-slate-100 dark:bg-slate-900/60 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">Our Impact Blueprint</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    We believe healthcare is a fundamental human right. Here is how we make support delivery automated, professional, and accessible.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 rounded-xl flex items-center justify-center">
                        <HeartHandshake className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Direct Medical Aid</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Sponsoring vital doctor consults, medications, and laboratory tests for families facing sudden medical emergencies.
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-bold text-teal-500">100% direct-to-patient aid</div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-xl flex items-center justify-center">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Diagnostic Sponsorship</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Connecting patients with local laboratories to perform crucial X-Rays, MRIs, and biopsy scans without financial stress.
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-bold text-indigo-500">Quick 24h approval times</div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-sm flex flex-col justify-between h-full hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">Mobile Health Camps</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        Mobilizing teams of volunteer nurses, general physicians, and counselors directly to outlying urban and rural communities.
                      </p>
                    </div>
                    <div className="pt-4 text-xs font-bold text-emerald-500">Over 320 drives completed</div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                  <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">Voices of Hope & Service</h2>
                  <p className="text-slate-500 dark:text-slate-400">
                    Read inspiring stories from the patients we've helped, the physicians who donate their skills, and the community members who advocate for our mission.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {testimonials.map((t, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex gap-1 text-amber-400">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-slate-600 dark:text-slate-350 text-sm leading-relaxed italic">
                          "{t.quote}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 flex items-center justify-center font-bold text-sm">
                          {t.author.charAt(0)}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.author}</h4>
                          <span className="text-xs text-slate-400">{t.role}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* 2. Patient Support Form Tab */}
        {activeSection === "patient-support" && (
          <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[60vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <PatientForm onSubmitSuccess={triggerRefresh} setActiveTab={setActiveSection} />
            </div>
          </section>
        )}

        {/* 3. Volunteer Registration Form Tab */}
        {activeSection === "volunteer" && (
          <section className="py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 min-h-[60vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <VolunteerForm onSubmitSuccess={triggerRefresh} />
            </div>
          </section>
        )}

        {/* 4. Admin Dashboard Tab */}
        {activeSection === "dashboard" && (
          <section className="py-20 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200/40 dark:border-slate-800/40 transition-colors duration-300 min-h-[70vh]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Dashboard refreshTrigger={refreshTrigger} triggerRefresh={triggerRefresh} />
            </div>
          </section>
        )}

        {/* 5. Contact Tab */}
        {activeSection === "contact" && (
          <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300 min-h-[70vh] flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                {/* Contact Information */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-sans">Get in Touch</h2>
                    <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
                      Have questions about our donation matching program, health clinic schedules, or eligibility rules? Speak to our support coordinators.
                    </p>
                  </div>

                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 rounded-xl">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">NGO Headquarters</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          123 Healing Touch Way, Suite 400<br />
                          Metro City, MC 560001
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 rounded-xl">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Call Helpline</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Toll-Free: +1 (800) 555-0199<br />
                          Office: +1 (555) 0182-9900
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-xl">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Support Emails</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          General: support@careconnectngo.org<br />
                          Volunteers: coordinator@careconnectngo.org
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Contact Form */}
                <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-md">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Send Us a Message</h3>
                  
                  {contactSuccess ? (
                    <div className="bg-teal-500/10 border border-teal-500/20 p-6 rounded-2xl text-center space-y-3">
                      <Heart className="h-8 w-8 text-teal-500 mx-auto fill-current" />
                      <h4 className="font-bold text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Thank you for contacting CareConnect. We will reply to your registered email address soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-form">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-500">Full Name</label>
                          <input
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="e.g., John Doe"
                            className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-500">Email Address</label>
                          <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="e.g., john@example.com"
                            className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 text-slate-900 dark:text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500">Message Description</label>
                        <textarea
                          required
                          rows={4}
                          value={contactForm.msg}
                          onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                          placeholder="Write your query or question here..."
                          className="w-full px-4 py-2.5 text-sm rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 text-slate-900 dark:text-white resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        id="contact-submit-btn"
                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-semibold shadow-md shadow-teal-500/10 transition-colors cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>

              </div>
            </div>
          </section>
        )}

      </main>

      {/* Floating AI Chatbot Assistant */}
      <Chatbot />

      {/* Footer Info */}
      <Footer />
      
    </div>
  );
}
