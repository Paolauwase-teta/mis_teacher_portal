"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Code, 
  Chrome, 
  Github, 
  Eye, 
  EyeOff, 
  ArrowRight,
  ShieldAlert
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardOverview from "./components/DashboardOverview";
import MyTeams from "./components/MyTeams";
import TeamCommunication from "./components/TeamCommunication";
import JudgingScoring from "./components/JudgingScoring";


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isSignUp = false;
  const [currentView, setCurrentView] = useState("dashboard");
  const [activeSidebarView, setActiveSidebarView] = useState("dashboard");
  const [wizardStep, setWizardStep] = useState<number | null>(null);

  const handleNavigate = (view: string) => {
    setActiveSidebarView(view);
    setWizardStep(null);
    setCurrentView(view);
  };

  // Dashboard view preferences
  const [prefs, setPrefs] = useState<{
    density: "comfortable" | "compact";
    showMap: boolean;
    showStats: boolean;
  }>({ density: "comfortable", showMap: true, showStats: true });

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Determine active step based on form filling progress
  const getActiveStep = () => {
    return 1;
  };
  const activeStep = getActiveStep();

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || password.length < 8) {
      setErrorMsg("Please enter valid credentials.");
      return;
    }
    setErrorMsg("");
    setIsLoggedIn(true);
  };

  const handleSocialClick = (platform: string) => {
    // Demo bypass/login
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (currentView) {
      case "myteams":
        return <MyTeams />;
      case "communication":
        return <TeamCommunication />;
      case "judging":
        return <JudgingScoring />;
      case "dashboard":
      default:
        return <DashboardOverview prefs={prefs} />;
    }
  };

  if (!isLoggedIn) {
    return (
      <main className="flex min-h-screen w-full bg-white selection:bg-[#1E3A5F]/20 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4 text-stone-900">
        
        {/* Left Column — Property photo background with overlay + step cards */}
        <div className="w-[52%] hidden lg:flex relative flex-col rounded-3xl overflow-hidden shadow-2xl h-full">
          {/* Background photo */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/rca_students.jpg')" }}
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />

          {/* TOP — Brand Logo */}
          <div className="relative z-10 px-10 pt-10">
            <motion.div
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="h-8 w-8 rounded-lg bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center">
                <Code size={15} className="text-white" strokeWidth={3} />
              </div>
              <span className="text-white font-normal text-[17px] tracking-tight">RCA Hackathon</span>
            </motion.div>
          </div>

          {/* MIDDLE — Heading + Step Cards */}
          <div className="relative z-10 flex-1 flex flex-col justify-end px-10 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-8"
            >
              <h2 className="text-[2.4rem] font-light leading-[1.1] tracking-tight text-white mb-3">
                {isSignUp ? "Join Hackathon" : "School Account Login"}
              </h2>
              <p className="text-white/70 text-[13.5px] leading-relaxed max-w-[320px]">
                {isSignUp
                  ? "Register your team and access the hackathon portal."
                  : "Access the RCA Hackathon Teacher Portal to mentor teams and score projects."}
              </p>
            </motion.div>

            {/* Glassmorphic Step Cards */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {(isSignUp ? [
                { n: 1, text: "Register user identity" },
                { n: 2, text: "Verify team details" },
                { n: 3, text: "Activate portal dashboard" },
              ] : [
                { n: 1, text: "Enter your credentials" },
                { n: 2, text: "Verify teacher role" },
                { n: 3, text: "Access teacher dashboard" },
              ]).map((step, i) => (
                <div
                  key={step.n}
                  className={`flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all ${
                    i === 0
                      ? "bg-white text-[#1E3A5F]"
                      : "bg-white/10 backdrop-blur-sm border border-white/15 text-white/80"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-light text-xs shrink-0 ${
                    i === 0 ? "bg-[#1E3A5F] text-white" : "bg-white/15 text-white/60"
                  }`}>
                    {step.n}
                  </div>
                  <span className="text-[13px] font-normal">{step.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right Column (Light Mode Form Panel) */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden bg-white">
          
          <motion.div 
            className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-[26px] font-light tracking-tight text-gray-700">
                School Account Login
              </h1>
              <p className="text-gray-400 text-[15px] font-normal">
                Log In to your account
              </p>
            </div>

            {/* Social Authentication */}
            <div className="grid grid-cols-2 gap-4">
              <SocialButton 
                icon={<Chrome size={18} className="text-[#1E3A5F]" />} 
                label="Google" 
                onClick={() => handleSocialClick("Google")} 
              />
              <SocialButton 
                icon={<Github size={18} className="text-stone-900" />} 
                label="Github" 
                onClick={() => handleSocialClick("Github")} 
              />
            </div>

            {/* Divider */}
            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200"></div>
              </div>
              <span className="relative bg-white px-4 text-xs font-normal text-stone-400 uppercase tracking-widest">
                Or
              </span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAuthSubmit} className="space-y-5">
              
              {errorMsg && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 p-3.5 rounded-xl text-sm animate-pulse">
                  <ShieldAlert size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Email */}
              <InputGroup 
                label="Email Address" 
                placeholder="Email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {/* Password */}
              <InputGroup 
                label="Password" 
                placeholder="Password" 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-stone-400 hover:text-stone-800 transition-colors cursor-pointer mr-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              <div className="flex justify-between items-center px-1 mt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#1E3A5F] focus:ring-[#1E3A5F] w-4 h-4" />
                  <span className="text-[14px] font-normal text-gray-500">
                    Remember Me
                  </span>
                </label>
                <button type="button" className="text-[14px] text-gray-800 hover:text-black font-light">
                  Forgot my password
                </button>
              </div>

              {/* Submit Button (styled with brand main color #1E3A5F) */}
              <button 
                type="submit" 
                className="w-full h-14 bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]/95 active:scale-[0.98] font-light rounded-xl transition-all mt-4 cursor-pointer flex items-center justify-center gap-2 group shadow-md shadow-[#1E3A5F]/20"
              >
                <span>Access Teacher Portal</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
            
          </motion.div>
        </div>

      </main>
    );
  }

  // Dashboard content if logged in
  return (
    <div className="flex h-screen bg-white overflow-hidden text-stone-900 font-sans">
      <Sidebar activeView={activeSidebarView} onNavigate={handleNavigate} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header prefs={prefs} onApplyPrefs={setPrefs} />

        <main className="flex-1 flex flex-col overflow-hidden">{renderContent()}</main>
      </div>

      <style jsx global>{`
        ::selection {
          background-color: #1E3A5F;
          color: white;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

// ----------------------------------------------------
// Reusable sub-components for the signup gate page
// ----------------------------------------------------

interface StepItemProps {
  number: number;
  text: string;
  active?: boolean;
}

function StepItem({ number, text, active = false }: StepItemProps) {
  return (
    <div 
      className={`flex items-center gap-4 p-4 rounded-2xl w-full border transition-all duration-300 ${
        active 
          ? "bg-white/95 backdrop-blur-md text-[#1E3A5F] border-white/50 shadow-xl shadow-black/5" 
          : "bg-white/10 backdrop-blur-sm text-white/80 border-white/5"
      }`}
    >
      <div 
        className={`h-7 w-7 rounded-full flex items-center justify-center font-light text-xs shrink-0 transition-all ${
          active 
            ? "bg-[#1E3A5F] text-white shadow-sm" 
            : "bg-white/15 text-white/40"
        }`}
      >
        {number}
      </div>
      <span className="text-[12.5px] font-normal tracking-wide">{text}</span>
    </div>
  );
}

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      className="flex items-center justify-center gap-2.5 bg-white border border-stone-200 rounded-xl py-3 hover:bg-stone-50 transition-all text-xs font-normal text-stone-700 cursor-pointer active:scale-[0.98] w-full shadow-sm"
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface InputGroupProps {
  label: string;
  placeholder: string;
  type: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  rightElement?: React.ReactNode;
}

function InputGroup({ 
  label, 
  placeholder, 
  type, 
  value, 
  onChange, 
  required = false, 
  rightElement 
}: InputGroupProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-[11px] font-normal text-stone-500 uppercase tracking-widest px-0.5">
        {label}
      </label>
      <div className="relative w-full">
        <input 
          type={type} 
          placeholder={placeholder} 
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-white border border-stone-200 rounded-xl h-11 px-4 text-stone-900 text-[15px] font-normal placeholder:text-gray-500 placeholder:font-normal focus:border-[#1E3A5F] focus:ring-2 focus:ring-[#1E3A5F]/15 outline-none transition-all shadow-sm"
        />
        {rightElement && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}
