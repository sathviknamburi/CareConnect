"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, HeartPulse, User } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I am the CareConnect Assistant. How can I help you today? Feel free to ask me questions about our healthcare support, volunteering, or donations.",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const faqData = [
    {
      keywords: ["request", "support", "patient", "need help", "get help", "medical aid"],
      answer: "You can request healthcare support by navigating to the 'Patient Support' tab at the top and filling out the patient request form. Once submitted, our medical board will review it and contact you within 24-48 hours.",
    },
    {
      keywords: ["volunteer", "free", "cost", "charge", "pay", "fee"],
      answer: "Yes, volunteer registration is completely free! We are a non-profit organization and appreciate your willingness to contribute your skills, empathy, and time.",
    },
    {
      keywords: ["service", "provide", "do", "offer", "activities", "program"],
      answer: "CareConnect provides free medical consultations, sponsors essential medicines, covers diagnostic lab tests (like scans, blood tests), and organizes community health camps in underserved regions.",
    },
    {
      keywords: ["donate", "donation", "give", "money", "fund", "contribute"],
      answer: "You can support our mission by donating! While we are currently setting up online gateways, you can contact our support team at donate@careconnectngo.org or call +1 (800) 555-0199 for mock transactions.",
    },
    {
      keywords: ["become", "join", "sign up", "how to volunteer"],
      answer: "To become a volunteer, simply head to the 'Volunteer Registration' tab at the top of the page, fill in your details, select your skills and availability, and click submit. We will contact you soon!",
    },
    {
      keywords: ["time", "long", "duration", "wait", "receive", "hours", "days"],
      answer: "We review patient applications on a rolling basis. Typically, it takes 24 to 48 hours for our medical board to process your request and reach out.",
    },
  ];

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Append User Message
    const userMsg: Message = {
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // AI FAQ matching
    setTimeout(() => {
      const query = text.toLowerCase();
      let matchedAnswer = "";

      for (const faq of faqData) {
        const hasKeyword = faq.keywords.some((keyword) => query.includes(keyword));
        if (hasKeyword) {
          matchedAnswer = faq.answer;
          break;
        }
      }

      if (!matchedAnswer) {
        matchedAnswer = "Thank you for your question. Our team will contact you soon.";
      }

      const botMsg: Message = {
        sender: "bot",
        text: matchedAnswer,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200); // 1.2s typing animation simulation
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  const quickQuestions = [
    "How can I request support?",
    "Is volunteer registration free?",
    "What services do you provide?",
    "How can I donate?",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          id="chatbot-open-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-500 text-white shadow-xl shadow-teal-500/30 hover:bg-teal-600 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open FAQ Chatbot"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="flex flex-col w-[350px] sm:w-[380px] h-[500px] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-150 dark:border-slate-700 overflow-hidden transition-all duration-300 animate-fade-in"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/10 rounded-lg">
                <HeartPulse className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm">CareConnect Assistant</h3>
                <span className="text-[10px] text-teal-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                  Online • Quick Help
                </span>
              </div>
            </div>
            <button
              id="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close Chatbot"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-900/60 scrollbar-thin">
            {messages.map((msg, index) => {
              const isBot = msg.sender === "bot";
              return (
                <div key={index} className={`flex items-start gap-2 ${!isBot && "flex-row-reverse"}`}>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isBot
                        ? "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400"
                        : "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
                    }`}
                  >
                    {isBot ? <HeartPulse className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] text-xs leading-relaxed ${
                      isBot
                        ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700/60 shadow-sm"
                        : "bg-teal-500 text-white shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400 flex items-center justify-center text-xs flex-shrink-0">
                  <HeartPulse className="h-4 w-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-150 dark:border-slate-700 shadow-sm flex items-center justify-center min-w-[50px] min-h-[32px]">
                  <div className="dot-flashing text-teal-500 dark:text-teal-400"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick chips when no active input typing */}
          {messages.length < 8 && !isTyping && (
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap gap-2 border-t border-slate-100 dark:border-slate-800">
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1.5 text-[10px] font-medium rounded-full bg-white dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Footer Input */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-700 flex items-center gap-2">
            <input
              type="text"
              id="chatbot-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask a question..."
              className="flex-1 px-4 py-2 text-xs rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/25 text-slate-900 dark:text-white"
            />
            <button
              id="chatbot-send-btn"
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim()}
              className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:hover:bg-teal-500 transition-colors"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
