import React from "react";
import { Users, UserCheck, Stethoscope } from "lucide-react";

export default function Stats() {
  const statsList = [
    {
      id: "stat-patients",
      label: "Patients Helped",
      value: "15,420+",
      desc: "Received medications, aid, or diagnostics",
      icon: Users,
      colorClass: "bg-teal-500/10 text-teal-600 dark:bg-teal-500/20 dark:text-teal-400",
      borderColor: "hover:border-teal-500/30",
      glowColor: "hover:shadow-teal-500/5",
    },
    {
      id: "stat-volunteers",
      label: "Active Volunteers",
      value: "1,850+",
      desc: "Medical professionals and field operators",
      icon: UserCheck,
      colorClass: "bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400",
      borderColor: "hover:border-indigo-500/30",
      glowColor: "hover:shadow-indigo-500/5",
    },
    {
      id: "stat-camps",
      label: "Health Camps Conducted",
      value: "320+",
      desc: "Free diagnostic and treatment drives",
      icon: Stethoscope,
      colorClass: "bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400",
      borderColor: "hover:border-emerald-500/30",
      glowColor: "hover:shadow-emerald-500/5",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statsList.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.id}
                id={stat.id}
                className={`relative group bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-800/60 shadow-sm ${stat.borderColor} ${stat.glowColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-3.5 rounded-xl ${stat.colorClass} transition-transform duration-300 group-hover:scale-110`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-sans tracking-tight">
                    {stat.value}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-5">
                  {stat.label}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
