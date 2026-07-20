"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search, Bell, HelpCircle, Settings, SlidersHorizontal,
  CheckCircle, Clock, AlertTriangle, X, ChevronRight,
  BookOpen, MessageCircle, Phone, ShieldCheck, User,
  LogOut, CreditCard, Eye, EyeOff, LayoutDashboard,
  List, BarChart2, Map
} from "lucide-react";

// ── Dropdown wrapper ──────────────────────────────────────────────
function Dropdown({
  open,
  onClose,
  align = "right",
  width = "w-80",
  children,
}: {
  open: boolean;
  onClose: () => void;
  align?: "right" | "left";
  width?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={ref}
      className={`absolute top-full mt-2 ${align === "right" ? "right-0" : "left-0"} ${width} bg-white rounded-2xl shadow-xl border border-stone-100 z-50 overflow-hidden`}
    >
      {children}
    </div>
  );
}

// ── Notifications panel ───────────────────────────────────────────
const NOTIFICATIONS = [
  {
    id: 5, type: "info", icon: <ShieldCheck size={14} className="text-[#1E3A5F]" />,
    title: "Registration Open",
    body: "The registration window for RCA Hackathon 2026 is now open.",
    time: "5 min ago", unread: true,
  },
  {
    id: 1, type: "success", icon: <CheckCircle size={14} className="text-emerald-500" />,
    title: "Team Registered",
    body: "Team Tech Titans has successfully registered for the hackathon.",
    time: "2 min ago", unread: true,
  },
  {
    id: 2, type: "warning", icon: <AlertTriangle size={14} className="text-amber-500" />,
    title: "Mentor Unassigned",
    body: "Team Code Crafters does not have a mentor assigned yet. Please assign one.",
    time: "1 hr ago", unread: true,
  },
  {
    id: 3, type: "info", icon: <Clock size={14} className="text-[#1E3A5F]" />,
    title: "Pitch Schedule Updated",
    body: "The pitch schedule has been published for all teams.",
    time: "3 hrs ago", unread: true,
  },
  {
    id: 4, type: "success", icon: <CheckCircle size={14} className="text-emerald-500" />,
    title: "Scoring Complete",
    body: "All teams have been scored by the judges. Results are ready to publish.",
    time: "Yesterday", unread: false,
  },
];

function NotificationsPanel({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <div>
          <p className="font-light text-stone-900 text-[13px]">Notifications</p>
          <p className="text-[10px] text-stone-400 mt-0.5">3 unread alerts</p>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="max-h-[360px] overflow-y-auto">
        {NOTIFICATIONS.map((n) => (
          <div key={n.id} className={`flex gap-3 px-5 py-3.5 border-b border-stone-50 hover:bg-stone-50 transition-colors cursor-pointer ${n.unread ? "bg-[#1E3A5F]/[0.02]" : ""}`}>
            <div className="mt-0.5 shrink-0">{n.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className={`text-[12px] font-light truncate ${n.unread ? "text-stone-900" : "text-stone-600"}`}>{n.title}</p>
                {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#1E3A5F] shrink-0" />}
              </div>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{n.body}</p>
              <p className="text-[10px] text-stone-300 mt-1 font-light">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 bg-stone-50">
        <button className="text-[11px] font-light text-[#1E3A5F] hover:underline w-full text-center">
          View all notifications
        </button>
      </div>
    </div>
  );
}

// ── Help panel ────────────────────────────────────────────────────
const HELP_ITEMS = [
  { icon: <BookOpen size={15} className="text-[#1E3A5F]" />, title: "Documentation", desc: "Guides on event setup, team management & scoring" },
  { icon: <MessageCircle size={15} className="text-emerald-600" />, title: "Live chat support", desc: "Chat with our technical team (Mon–Fri, 8am–6pm CAT)" },
  { icon: <Phone size={15} className="text-amber-600" />, title: "Call us", desc: "+250 788 000 111 · Admin helpline" },
  { icon: <ShieldCheck size={15} className="text-stone-500" />, title: "System FAQ", desc: "Permissions, user roles, and security rules" },
];

function HelpPanel({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <p className="font-light text-stone-900 text-[13px]">Help & Support</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-3 space-y-1">
        {HELP_ITEMS.map((item) => (
          <button key={item.title} className="w-full flex items-start gap-3.5 p-3 rounded-xl hover:bg-stone-50 transition-colors text-left group">
            <div className="p-2 rounded-lg bg-stone-100 shrink-0 group-hover:bg-white border border-transparent group-hover:border-stone-200 transition-all">
              {item.icon}
            </div>
            <div>
              <p className="text-[12px] font-light text-stone-800">{item.title}</p>
              <p className="text-[11px] text-stone-400 mt-0.5 leading-snug">{item.desc}</p>
            </div>
            <ChevronRight size={12} className="text-stone-300 mt-1.5 ml-auto shrink-0 group-hover:text-stone-500 transition-colors" />
          </button>
        ))}
      </div>
      <div className="px-5 pb-4">
        <div className="bg-[#1E3A5F]/5 border border-[#1E3A5F]/10 rounded-xl p-3.5">
          <p className="text-[11px] font-light text-[#1E3A5F]">🎓 New to Hackathon Admin?</p>
          <p className="text-[10px] text-stone-500 mt-1">Read the Admin Onboarding Guide to get your first event setup quickly.</p>
          <button className="mt-2 text-[10px] font-light text-[#1E3A5F] hover:underline">Read guide →</button>
        </div>
      </div>
    </div>
  );
}

// ── Settings panel ────────────────────────────────────────────────
function Toggle2({ on }: { on: boolean }) {
  return (
    <div className={`w-8 h-4 rounded-full relative transition-colors ${on ? "bg-[#1E3A5F]" : "bg-stone-200"}`}>
      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full shadow transition-all ${on ? "left-4" : "left-0.5"}`} />
    </div>
  );
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [milestoneAlerts, setMilestoneAlerts] = useState(true);
  const [investorAlerts, setInvestorAlerts] = useState(false);
  const [twoFA, setTwoFA] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <p className="font-light text-stone-900 text-[13px]">Settings</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors">
          <X size={14} />
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Account */}
        <div>
          <p className="text-[9px] font-light text-stone-400 uppercase tracking-widest mb-2 px-1">Account</p>
          <div className="space-y-1">
            {[
              { icon: <User size={13} />, label: "Edit profile" },
              { icon: <CreditCard size={13} />, label: "Wallet & payout settings" },
              { icon: <ShieldCheck size={13} />, label: "Identity verification (KYC)" },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 text-stone-700 transition-colors text-left">
                <span className="text-stone-400">{item.icon}</span>
                <span className="text-[12px] font-normal">{item.label}</span>
                <ChevronRight size={12} className="text-stone-300 ml-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <p className="text-[9px] font-light text-stone-400 uppercase tracking-widest mb-2 px-1">Notifications</p>
          <div className="space-y-2">
            {[
              { label: "Email alerts", val: emailAlerts, set: setEmailAlerts },
              { label: "Milestone updates", val: milestoneAlerts, set: setMilestoneAlerts },
              { label: "Investor activity", val: investorAlerts, set: setInvestorAlerts },
            ].map((row) => (
              <button key={row.label} onClick={() => row.set(!row.val)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors">
                <span className="text-[12px] font-normal text-stone-700">{row.label}</span>
                <Toggle2 on={row.val} />
              </button>
            ))}
          </div>
        </div>

        {/* Security */}
        <div>
          <p className="text-[9px] font-light text-stone-400 uppercase tracking-widest mb-2 px-1">Security</p>
          <button onClick={() => setTwoFA(!twoFA)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors">
            <span className="text-[12px] font-normal text-stone-700">Two-factor authentication</span>
            <Toggle2 on={twoFA} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Profile panel ─────────────────────────────────────────────────
function ProfilePanel({ onClose }: { onClose: () => void }) {
  return (
    <div>
      {/* Avatar header */}
      <div className="px-5 py-5 bg-[#1E3A5F] relative overflow-hidden">
        <button onClick={onClose} className="absolute top-3 right-3 p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white/70 transition-colors z-10">
          <X size={12} />
        </button>
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-light text-sm">
            ST
          </div>
          <div>
            <p className="text-white font-light text-[14px] leading-tight">Teacher</p>
            <p className="text-white/50 text-[10px] mt-0.5">teacher@rca.ac.rw</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[9px] font-light text-[#1E3A5F] bg-white/90 border border-white px-2 py-0.5 rounded-full">
              <ShieldCheck size={8} /> Mentor & Judge
            </span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100">
        {[
          { val: "24", label: "Teams" },
          { val: "18", label: "Mentors" },
          { val: "5", label: "Judges" },
        ].map((s) => (
          <div key={s.label} className="py-3 text-center">
            <p className="font-light text-stone-900 text-[13px]">{s.val}</p>
            <p className="text-[9px] text-stone-400 font-normal mt-0.5 uppercase tracking-wide">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="p-3 space-y-0.5">
        {[
          { icon: <User size={13} />, label: "View profile" },
          { icon: <CreditCard size={13} />, label: "Account settings" },
        ].map((item) => (
          <button key={item.label} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 text-stone-700 transition-colors">
            <span className="text-stone-400">{item.icon}</span>
            <span className="text-[12px] font-normal">{item.label}</span>
            <ChevronRight size={12} className="text-stone-300 ml-auto" />
          </button>
        ))}
      </div>

      <div className="px-4 pb-4">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-red-100 text-red-500 hover:bg-red-50 transition-colors text-[12px] font-light">
          <LogOut size={13} /> Sign out
        </button>
      </div>
    </div>
  );
}

// ── View filter panel ─────────────────────────────────────────────
interface FiltersPanelProps {
  onClose: () => void;
  prefs?: {
    density: "comfortable" | "compact";
    showMap: boolean;
    showStats: boolean;
  };
  onApplyPrefs?: React.Dispatch<React.SetStateAction<{
    density: "comfortable" | "compact";
    showMap: boolean;
    showStats: boolean;
  }>>;
}

function FiltersPanel({ onClose, prefs, onApplyPrefs }: FiltersPanelProps) {
  const [density, setDensity] = useState<"comfortable" | "compact">(prefs?.density || "comfortable");
  const [showMap, setShowMap] = useState(prefs?.showMap ?? true);
  const [showStats, setShowStats] = useState(prefs?.showStats ?? true);

  const handleApply = () => {
    if (onApplyPrefs) {
      onApplyPrefs({ density, showMap, showStats });
    }
    onClose();
  };

  return (
    <div>
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
        <p className="font-light text-stone-900 text-[13px]">Dashboard view</p>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 transition-colors">
          <X size={14} />
        </button>
      </div>
      <div className="p-4 space-y-5">
        {/* Density */}
        <div>
          <p className="text-[9px] font-light text-stone-400 uppercase tracking-widest mb-2">Layout density</p>
          <div className="grid grid-cols-2 gap-2">
            {(["comfortable", "compact"] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[11px] font-light transition-all ${
                  density === d
                    ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                }`}
              >
                {d === "comfortable" ? <LayoutDashboard size={12} /> : <List size={12} />}
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Widgets */}
        <div>
          <p className="text-[9px] font-light text-stone-400 uppercase tracking-widest mb-2">Visible widgets</p>
          <div className="space-y-2">
            {[
              { icon: <BarChart2 size={13} />, label: "Event Snapshot", val: showStats, set: setShowStats },
            ].map((row) => (
              <button key={row.label} onClick={() => row.set(!row.val)} className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors">
                <span className="flex items-center gap-2 text-[12px] font-normal text-stone-700">
                  <span className="text-stone-400">{row.icon}</span>{row.label}
                </span>
                <Toggle2 on={row.val} />
              </button>
            ))}
          </div>
        </div>

        <button onClick={handleApply} className="w-full py-2.5 bg-[#1E3A5F] text-white text-[11px] font-light rounded-xl hover:bg-[#2a4d75] transition-colors">
          Apply preferences
        </button>
      </div>
    </div>
  );
}

// ── Main Header ───────────────────────────────────────────────────
interface HeaderProps {
  prefs?: {
    density: "comfortable" | "compact";
    showMap: boolean;
    showStats: boolean;
  };
  onApplyPrefs?: React.Dispatch<React.SetStateAction<{
    density: "comfortable" | "compact";
    showMap: boolean;
    showStats: boolean;
  }>>;
}

const Header = ({ prefs, onApplyPrefs }: HeaderProps) => {
  const [openPanel, setOpenPanel] = useState<"notifications" | "help" | "settings" | "profile" | "filters" | null>(null);
  const toggle = (panel: typeof openPanel) =>
    setOpenPanel((prev) => (prev === panel ? null : panel));

  return (
    <header className="flex items-center justify-between px-6 py-2.5 bg-white sticky top-0 z-40">
      {/* Search */}
      <div className="flex-1 max-w-xl relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#1E3A5F] transition-colors">
          <Search size={14} />
        </span>
        <input
          type="text"
          placeholder="Search your projects, milestones, requests…"
          className="w-full bg-white border border-stone-200 focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/30 rounded-lg py-1.5 pl-10 pr-4 outline-none transition-all text-[12px] placeholder:text-stone-400"
        />
      </div>

      <div className="flex items-center gap-4 ml-6">
        <div className="flex items-center gap-1.5">

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggle("notifications")}
              className={`text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all relative ${openPanel === "notifications" ? "bg-[#1E3A5F]/5 text-[#1E3A5F]" : ""}`}
            >
              <Bell size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-500 rounded-full border-2 border-white" />
            </button>
            <Dropdown open={openPanel === "notifications"} onClose={() => setOpenPanel(null)} width="w-[340px]">
              <NotificationsPanel onClose={() => setOpenPanel(null)} />
            </Dropdown>
          </div>

          {/* Help */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggle("help")}
              className={`text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all ${openPanel === "help" ? "bg-[#1E3A5F]/5 text-[#1E3A5F]" : ""}`}
            >
              <HelpCircle size={16} />
            </button>
            <Dropdown open={openPanel === "help"} onClose={() => setOpenPanel(null)} width="w-[300px]">
              <HelpPanel onClose={() => setOpenPanel(null)} />
            </Dropdown>
          </div>

          {/* Settings */}
          <div className="relative">
            <button
              type="button"
              onClick={() => toggle("settings")}
              className={`text-gray-500 hover:text-[#1E3A5F] p-2 hover:bg-[#1E3A5F]/5 rounded-lg transition-all ${openPanel === "settings" ? "bg-[#1E3A5F]/5 text-[#1E3A5F]" : ""}`}
            >
              <Settings size={16} />
            </button>
            <Dropdown open={openPanel === "settings"} onClose={() => setOpenPanel(null)} width="w-[280px]">
              <SettingsPanel onClose={() => setOpenPanel(null)} />
            </Dropdown>
          </div>
        </div>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle("profile")}
            className="flex items-center gap-2.5 hover:bg-stone-50 px-2.5 py-1 rounded-xl border border-transparent hover:border-gray-200 transition-all cursor-pointer"
          >
            <div className="text-right hidden sm:block">
              <p className="font-light text-gray-700 text-[12px] leading-none mb-0.5">Teacher</p>
              <p className="text-[9px] text-gray-400 font-light tracking-tight">Mentor & Judge</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-[#1E3A5F]/15 border border-white flex items-center justify-center text-[10px] font-light text-[#1E3A5F] shrink-0">
              ST
            </div>
          </button>
          <Dropdown open={openPanel === "profile"} onClose={() => setOpenPanel(null)} width="w-[260px]">
            <ProfilePanel onClose={() => setOpenPanel(null)} />
          </Dropdown>
        </div>

        {/* Filters */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggle("filters")}
            className={`p-2 rounded-lg transition-all ${openPanel === "filters" ? "bg-[#1E3A5F] text-white" : "bg-gray-100 hover:bg-[#1E3A5F] hover:text-white text-gray-600"}`}
          >
            <SlidersHorizontal size={16} />
          </button>
          <Dropdown open={openPanel === "filters"} onClose={() => setOpenPanel(null)} width="w-[260px]">
            <FiltersPanel onClose={() => setOpenPanel(null)} prefs={prefs} onApplyPrefs={onApplyPrefs} />
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
