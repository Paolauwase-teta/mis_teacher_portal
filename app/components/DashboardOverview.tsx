"use client";

import React, { useState } from "react";
import { RotateCw, Users, Calendar, Clock, Megaphone, CheckCircle, X, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const DashboardOverview = ({ prefs }: { prefs?: { density: "comfortable" | "compact"; showMap: boolean; showStats: boolean } }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  const stats = [
    {
      label: "Teams Assigned",
      value: "12",
      sub: "Mentor",
      icon: <Users size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Teams Awaiting Score",
      value: "5",
      sub: "Judge",
      icon: <CheckCircle size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Pending Clarification Requests",
      value: "3",
      sub: "Communication",
      icon: <Megaphone size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Latest Announcement",
      value: "Judging starts soon...",
      sub: "Updates",
      icon: <Info size={22} className="text-[#1E3A5F]" />,
    },
    {
      label: "Pitch-Day Schedule Update",
      value: "Updated today",
      sub: "Schedule",
      icon: <Clock size={22} className="text-[#1E3A5F]" />,
    },
  ];

  const isCompact = prefs?.density === "compact";

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-0">
      <section className={`px-10 ${isCompact ? "py-4" : "py-8"}`}>
        
        {/* Onboarding Modal / Banner */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-[#1E3A5F]/5 border border-[#1E3A5F]/20 rounded-2xl p-6 relative"
            >
              <button 
                onClick={() => setShowOnboarding(false)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-600 bg-white rounded-full shadow-sm hover:shadow transition-all"
              >
                <X size={16} />
              </button>
              
              <div className="flex gap-4">
                <div className="mt-1 bg-[#1E3A5F] text-white p-2.5 rounded-xl h-fit">
                  <Info size={24} />
                </div>
                <div>
                  <h3 className="text-[18px] font-light text-[#1E3A5F] mb-2">Welcome to the Teacher Portal!</h3>
                  <p className="text-[14px] text-stone-600 mb-4">Here&apos;s a quick guide to get you started with mentoring and judging:</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[12px] font-light text-[#1E3A5F] shrink-0">1</div>
                      <p className="text-[14px] text-stone-700"><strong>Scoring Workflow:</strong> Go to the <span className="font-normal">Judging &amp; Scoring</span> tab to view your assigned teams. Scores are one-time submissions and must follow the active scoring template.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center text-[12px] font-light text-[#1E3A5F] shrink-0">2</div>
                      <p className="text-[14px] text-stone-700"><strong>Clarification Requests:</strong> Manage incoming questions from teams using the <span className="font-normal">Team Communication</span> tab. You will be auto-notified of new requests.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setShowOnboarding(false)}
                    className="mt-5 px-4 py-2 bg-[#1E3A5F] text-white text-[13px] font-normal rounded-lg hover:bg-[#1E3A5F]/90 transition-colors"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex flex-wrap items-start justify-between gap-4 ${isCompact ? "mb-4" : "mb-8"}`}>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">Overview</span>
            </div>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">Dashboard</h2>
            <p className="text-[13px] text-stone-500 mt-2 max-w-xl">
              Welcome to the RCA Hackathon Teacher Portal. Here is a quick summary of your status as a Mentor and Judge.
            </p>
          </div>
          <button type="button" onClick={() => window.location.reload()}
            className="bg-white p-2 rounded-lg border border-stone-200 hover:bg-stone-50 transition-all group text-[#1E3A5F] shadow-sm">
            <RotateCw size={18} className="group-active:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {prefs?.showStats !== false && (
          <>
            <p className="text-[10px] font-normal text-stone-400 uppercase tracking-[0.2em] mb-4">Your Summary</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {stats.map((s) => (
                <div key={s.label} className={`flex items-center gap-5 bg-white border border-stone-200 rounded-3xl shadow-sm hover:shadow-md transition-all ${isCompact ? "p-4" : "p-6"}`}>
                  <div className={`rounded-2xl bg-[#1E3A5F]/5 shrink-0 flex items-center justify-center ${isCompact ? "p-3" : "p-4"}`}>
                    {React.cloneElement(s.icon as React.ReactElement<{ size?: number | string }>, { size: isCompact ? 24 : 28 })}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-normal text-stone-400 uppercase tracking-widest">{s.sub}</p>
                    <p className={`${isCompact ? "text-xl" : "text-2xl"} font-normal text-stone-900 leading-tight mt-1 mb-0.5 truncate`}>{s.value}</p>
                    <p className="text-sm font-normal text-stone-500">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

      </section>
    </div>
  );
};

export default DashboardOverview;
