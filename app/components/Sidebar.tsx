"use client";

import React from "react";
import {
  LayoutGrid,
  Users,
  MessageCircle,
  ClipboardCheck,
  Code
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const Sidebar = ({ activeView, onNavigate }: SidebarProps) => {
  const navItems = [
    { icon: <LayoutGrid size={13} />, label: "Dashboard / Overview", id: "dashboard" },
    { icon: <Users size={13} />, label: "My Teams", id: "myteams" },
    { icon: <MessageCircle size={13} />, label: "Team Communication", id: "communication" },
    { icon: <ClipboardCheck size={13} />, label: "Judging & Scoring", id: "judging" },
  ];

  return (
    <aside className="w-[240px] bg-white flex flex-col h-screen sticky top-0 z-20 shrink-0 font-sans">
      {/* Brand logo at the top over a white background */}
      <div className="px-5 py-6 shrink-0 flex items-center gap-2.5">
        <div className="h-7 w-7 rounded-lg bg-[#1E3A5F] flex items-center justify-center shadow-md">
          <Code size={13} className="text-white" strokeWidth={3} />
        </div>
        <div>
          <h1 className="text-[14px] font-light tracking-tight text-[#1E3A5F] leading-tight">RCA Hackathon</h1>
          <p className="text-[8px] font-light text-stone-400 uppercase tracking-widest mt-0.5">Teacher Portal</p>
        </div>
      </div>

      {/* Main navigation body in deep blue container with curved top-right corner */}
      <div className="flex-1 flex flex-col bg-[#1E3A5F] rounded-tr-[36px] px-3 py-6 overflow-hidden text-white shadow-2xl">
        
        {/* Navigation links */}
        <nav className="flex-1 space-y-0.5 overflow-y-auto pr-1 sidebar-scrollbar -mr-1">
          {navItems.map((item, i) => (
            <div
              key={i}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-150 group text-white/80 hover:text-white ${
                activeView === item.id
                  ? "bg-white/15 text-white font-normal shadow-inner border border-white/5"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <span className={`transition-colors shrink-0 ${
                activeView === item.id ? "text-white" : "text-white/40 group-hover:text-white/70"
              }`}>
                {item.icon}
              </span>
              <span className="text-[11.5px] tracking-wide font-light">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      <style jsx global>{`
        .sidebar-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 10px;
        }
        .sidebar-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
