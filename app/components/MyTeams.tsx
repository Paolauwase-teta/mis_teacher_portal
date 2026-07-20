"use client";

import React, { useState, useEffect } from "react";
import { Users, Briefcase, Bell, Calendar, Info, CheckCircle } from "lucide-react";

export default function MyTeams() {
  const [showToast, setShowToast] = useState(true);

  // Mock data for assigned teams
  const teams = [
    {
      id: "t1",
      teamName: "Tech Titans",
      projectName: "AgriSmart System",
      members: "3 members",
      dateAssigned: "Oct 12, 2026",
      status: "Active"
    },
    {
      id: "t2",
      teamName: "Code Crafters",
      projectName: "EduConnect",
      members: "4 members",
      dateAssigned: "Oct 14, 2026",
      status: "Pitch Complete"
    }
  ];

  useEffect(() => {
    // Auto-hide toast after 5 seconds
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white">
      <div className="max-w-5xl mx-auto px-10 py-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                Mentor
              </span>
            </div>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">My Teams</h2>
            <p className="text-[13px] text-stone-500 mt-2">
              Teams currently assigned to you for mentoring.
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-[#1E3A5F]/5 flex items-center justify-center border border-[#1E3A5F]/10">
            <Briefcase size={24} className="text-[#1E3A5F]" />
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between shadow-sm animate-fade-in">
            <div className="flex items-start gap-3">
              <Bell size={18} className="text-emerald-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-[13px] text-emerald-800 font-light">New Assignment</p>
                <p className="text-[13px] text-emerald-700 mt-0.5">You&apos;ve been assigned a new team: <span className="font-normal text-emerald-900">Code Crafters</span></p>
              </div>
            </div>
            <button onClick={() => setShowToast(false)} className="text-emerald-600 hover:text-emerald-800 transition-colors">
              &times;
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Teams List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
                <div>
                  <h3 className="text-[16px] font-light text-stone-900">Assigned Teams</h3>
                  <p className="text-[13px] text-stone-500 mt-1">You can only view teams explicitly assigned to you.</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-stone-100 text-[11px] font-light text-stone-400 uppercase tracking-wider bg-stone-50/30">
                      <th className="px-5 py-3">Team &amp; Project</th>
                      <th className="px-5 py-3">Members</th>
                      <th className="px-5 py-3">Assigned</th>
                      <th className="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[14px]">
                    {teams.map((team) => (
                      <tr key={team.id} className="border-b border-stone-50 hover:bg-stone-50/50 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-light text-stone-900 text-[14px]">{team.teamName}</p>
                          <p className="text-stone-500 text-[12px] mt-0.5">{team.projectName}</p>
                        </td>
                        <td className="px-5 py-4 text-stone-600">
                          <div className="flex items-center gap-1.5">
                            <Users size={14} className="text-stone-400" />
                            {team.members}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-stone-600 text-[13px]">{team.dateAssigned}</td>
                        <td className="px-5 py-4">
                          {team.status === "Active" ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-light bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-light bg-blue-50 text-blue-700 border border-blue-100 uppercase tracking-wide">
                              <CheckCircle size={10} />
                              {team.status}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right sidebar for widgets */}
          <div className="space-y-6">
            
            {/* Announcements Widget */}
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4 text-[#1E3A5F]">
                <Info size={18} />
                <h3 className="text-[14px] font-light text-stone-900">Admin Announcements</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-[#1E3A5F] pl-3">
                  <p className="text-[13px] font-normal text-stone-800">Judging Criteria Published</p>
                  <p className="text-[12px] text-stone-500 mt-1">Please review the updated scoring rubric before tomorrow.</p>
                  <p className="text-[10px] text-stone-400 mt-1.5 font-light uppercase tracking-wide">2 hours ago</p>
                </div>
                <div className="border-l-2 border-stone-200 pl-3">
                  <p className="text-[13px] font-normal text-stone-800">Mentor Sync Call</p>
                  <p className="text-[12px] text-stone-500 mt-1">Mandatory sync call for all mentors at 16:00 CAT.</p>
                  <p className="text-[10px] text-stone-400 mt-1.5 font-light uppercase tracking-wide">Yesterday</p>
                </div>
              </div>
            </div>

            {/* Pitch Schedule Widget */}
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4 text-[#1E3A5F]">
                <Calendar size={18} />
                <h3 className="text-[14px] font-light text-stone-900">Pitch Schedule</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div>
                    <p className="text-[12px] font-light text-stone-900">Tech Titans</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Room 101</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-light text-[#1E3A5F]">09:00 AM</p>
                    <p className="text-[10px] text-stone-400 mt-0.5 uppercase">Tomorrow</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100 opacity-70">
                  <div>
                    <p className="text-[12px] font-light text-stone-900">Code Crafters</p>
                    <p className="text-[11px] text-stone-500 mt-0.5">Room 102</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-light text-stone-500">11:30 AM</p>
                    <p className="text-[10px] text-stone-400 mt-0.5 uppercase">Completed</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
