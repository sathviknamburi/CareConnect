"use client";

import React, { useState, useEffect } from "react";
import { HeartPulse, Menu, X, Sun, Moon } from "lucide-react";

interface NavbarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function Navbar({ activeSection, setActiveSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Initialize Theme from System or LocalStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Monitor Scroll for Glassmorphism Styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Patient Support", href: "#patient-support", id: "patient-support" },
    { name: "Volunteer Registration", href: "#volunteer", id: "volunteer" },
    { name: "Dashboard", href: "#dashboard", id: "dashboard" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md border-b border-slate-200/50 dark:border-slate-800/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => handleLinkClick("home")}>
            <div className="p-2 rounded-lg bg-teal-500 text-white flex items-center justify-center mr-2 shadow-md shadow-teal-500/20">
              <HeartPulse className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-indigo-600 dark:from-teal-400 dark:to-indigo-400 font-sans tracking-tight">
              CareConnect
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    id={`nav-link-${link.id}`}
                    onClick={() => handleLinkClick(link.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-500/25"
                        : "text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
            </button>
          </div>

          {/* Mobile hamburger menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-amber-400" /> : <Moon className="h-5 w-5 text-indigo-600" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          isOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-lg">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  isActive
                    ? "bg-teal-500 text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-teal-600 dark:hover:text-teal-400"
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
