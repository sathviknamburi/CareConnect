import React from "react";
import { HeartPulse, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick("home")}>
              <div className="p-2 rounded-lg bg-teal-500 text-white flex items-center justify-center mr-2 shadow-md shadow-teal-500/20">
                <HeartPulse className="h-5 w-5" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                CareConnect
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering communities by connecting volunteer healthcare specialists with vulnerable patients who need medical aid, medicines, and diagnostics.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all duration-200" aria-label="Twitter">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all duration-200" aria-label="Facebook">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all duration-200" aria-label="Instagram">
                <svg className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all duration-200" aria-label="LinkedIn">
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleLinkClick("home")} className="hover:text-teal-400 transition-colors text-left">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("patient-support")} className="hover:text-teal-400 transition-colors text-left">
                  Request Patient Support
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("volunteer")} className="hover:text-teal-400 transition-colors text-left">
                  Volunteer Registration
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("dashboard")} className="hover:text-teal-400 transition-colors text-left">
                  Admin Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("contact")} className="hover:text-teal-400 transition-colors text-left">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide">Our Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Free Medical Consultation</li>
              <li>Essential Medicines Supply</li>
              <li>Diagnostic Lab Tests Sponsorship</li>
              <li>Community Health Camps</li>
              <li>Mental Health Counseling</li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-base tracking-wide">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-400 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  123 Healing Touch Way, Suite 400<br />
                  Metro City, MC 560001
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 text-teal-400 mr-2 flex-shrink-0" />
                <a href="tel:+18005550199" className="hover:text-teal-400 transition-colors">
                  +1 (800) 555-0199
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 text-teal-400 mr-2 flex-shrink-0" />
                <a href="mailto:support@careconnectngo.org" className="hover:text-teal-400 transition-colors">
                  support@careconnectngo.org
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {currentYear} CareConnect NGO. All rights reserved. Registered under NGO trust section 80G.</p>
        </div>
      </div>
    </footer>
  );
}
