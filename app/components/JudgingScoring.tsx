"use client";

import React, { useState, useMemo } from "react";
import { ClipboardCheck, Star, ShieldAlert, CheckCircle, Save } from "lucide-react";

interface Team {
  id: string;
  teamName: string;
  projectName: string;
  status: "Not Scored" | "Scored";
}

interface Criterion {
  id: string;
  name: string;
  maxScore: number;
  weight: string;
}

const criteriaTemplate: Criterion[] = [
  { id: "c1", name: "Innovation & Creativity", maxScore: 10, weight: "20%" },
  { id: "c2", name: "Technical Implementation", maxScore: 20, weight: "40%" },
  { id: "c3", name: "Business Viability", maxScore: 10, weight: "20%" },
  { id: "c4", name: "Pitch Quality", maxScore: 10, weight: "20%" },
];

export default function JudgingScoring() {
  const [teams, setTeams] = useState<Team[]>([
    { id: "t1", teamName: "Tech Titans", projectName: "AgriSmart System", status: "Not Scored" },
    { id: "t2", teamName: "Code Crafters", projectName: "EduConnect", status: "Scored" }
  ]);

  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  
  // Scores state: Map of criterion ID to score
  const [scores, setScores] = useState<Record<string, number>>({});
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize scores when selecting a team
  const handleSelectTeam = (team: Team) => {
    setActiveTeam(team);
    setErrorMsg("");
    
    if (team.status === "Scored") {
      // Mock pre-filled scores for demonstration
      setScores({
        "c1": 8,
        "c2": 18,
        "c3": 7,
        "c4": 9
      });
    } else {
      setScores({
        "c1": 0,
        "c2": 0,
        "c3": 0,
        "c4": 0
      });
    }
  };

  const totalScore = useMemo(() => {
    return Object.values(scores).reduce((acc, curr) => acc + (Number(curr) || 0), 0);
  }, [scores]);

  const maxPossible = criteriaTemplate.reduce((acc, curr) => acc + curr.maxScore, 0);

  const handleScoreChange = (criterionId: string, value: string, maxScore: number) => {
    let numVal = parseInt(value, 10);
    if (isNaN(numVal)) numVal = 0;
    if (numVal < 0) numVal = 0;
    if (numVal > maxScore) numVal = maxScore;
    
    setScores(prev => ({
      ...prev,
      [criterionId]: numVal
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTeam || activeTeam.status === "Scored") return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setTeams(teams.map(t => t.id === activeTeam.id ? { ...t, status: "Scored" } : t));
      setActiveTeam({ ...activeTeam, status: "Scored" });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white">
      <div className="max-w-5xl mx-auto px-10 py-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                Judge
              </span>
            </div>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">Judging &amp; Scoring</h2>
            <p className="text-[13px] text-stone-500 mt-2">
              Evaluate your assigned teams based on the active scoring rubric.
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-[#1E3A5F]/5 flex items-center justify-center border border-[#1E3A5F]/10">
            <ClipboardCheck size={24} className="text-[#1E3A5F]" />
          </div>
        </div>

        <div className="space-y-8">
          
          {/* Teams Table */}
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-stone-100 bg-stone-50/50 flex justify-between items-center">
              <div>
                <h3 className="text-[16px] font-light text-stone-900">Teams to Judge</h3>
                <p className="text-[13px] text-stone-500 mt-1">Select a team to enter or view scores.</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-stone-100 text-[11px] font-light text-stone-400 uppercase tracking-wider bg-stone-50/30">
                    <th className="px-5 py-3">Team</th>
                    <th className="px-5 py-3">Project Name</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-[14px]">
                  {teams.map((team) => (
                    <tr key={team.id} className={`border-b border-stone-50 transition-colors ${activeTeam?.id === team.id ? "bg-[#1E3A5F]/5" : "hover:bg-stone-50/50"}`}>
                      <td className="px-5 py-4 font-light text-stone-900">{team.teamName}</td>
                      <td className="px-5 py-4 text-stone-600">{team.projectName}</td>
                      <td className="px-5 py-4">
                        {team.status === "Scored" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-light bg-emerald-50 text-emerald-700 border border-emerald-100 uppercase tracking-wide">
                            <CheckCircle size={10} />
                            Scored
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-light bg-amber-50 text-amber-700 border border-amber-100 uppercase tracking-wide">
                            <ShieldAlert size={10} />
                            Not Scored
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => handleSelectTeam(team)}
                          className={`px-4 py-1.5 rounded-lg text-[12px] font-light transition-all border ${
                            activeTeam?.id === team.id
                              ? "bg-[#1E3A5F] text-white border-[#1E3A5F]"
                              : "bg-white text-stone-700 border-stone-200 hover:border-stone-300"
                          }`}
                        >
                          {team.status === "Scored" ? "View Submitted Score" : "Score Now"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scoring Form Area */}
          {activeTeam && (
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden animate-fade-in">
              <div className="p-6 border-b border-stone-100 bg-[#1E3A5F]/5 flex justify-between items-center">
                <div>
                  <h3 className="text-[18px] font-light text-[#1E3A5F]">Evaluation: {activeTeam.teamName}</h3>
                  <p className="text-[13px] text-stone-600 mt-1">Project: {activeTeam.projectName}</p>
                </div>
                {activeTeam.status === "Scored" && (
                  <span className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1.5 rounded-lg text-[13px] font-light">
                    <CheckCircle size={16} /> Score Submitted
                  </span>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                
                {activeTeam.status === "Scored" && (
                  <div className="mb-6 p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-start gap-3">
                    <ShieldAlert size={18} className="text-stone-500 mt-0.5 shrink-0" />
                    <p className="text-[13px] text-stone-600 font-light">Scores have already been submitted for this team and cannot be changed.</p>
                  </div>
                )}

                <div className="space-y-4">
                  {criteriaTemplate.map(crit => (
                    <div key={crit.id} className="flex items-center justify-between p-4 border border-stone-100 rounded-xl hover:bg-stone-50/50 transition-colors">
                      <div className="flex-1">
                        <p className="font-light text-stone-900 text-[14px]">{crit.name}</p>
                        <p className="text-[12px] text-stone-500 mt-0.5">Weight: {crit.weight}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          min="0"
                          max={crit.maxScore}
                          value={scores[crit.id] || ""}
                          onChange={(e) => handleScoreChange(crit.id, e.target.value, crit.maxScore)}
                          disabled={activeTeam.status === "Scored"}
                          className={`w-20 h-11 text-center font-light text-[16px] rounded-xl border outline-none transition-all ${
                            activeTeam.status === "Scored" 
                              ? "bg-stone-100 border-stone-200 text-stone-700"
                              : "bg-white border-stone-300 focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/30 text-stone-900"
                          }`}
                          required
                        />
                        <span className="text-[14px] font-light text-stone-400 w-12 text-right">/ {crit.maxScore}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-6 border-stone-100" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100">
                      <Star size={24} className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-[12px] font-light text-stone-500 uppercase tracking-widest">Total Score</p>
                      <p className="text-3xl font-light text-stone-900 mt-0.5">
                        {totalScore} <span className="text-[18px] text-stone-400 font-light">/ {maxPossible}</span>
                      </p>
                    </div>
                  </div>
                  
                  {activeTeam.status === "Not Scored" && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#1E3A5F] text-white px-8 py-3.5 rounded-xl font-light text-[14px] hover:bg-[#162A45] active:scale-[0.98] transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      <Save size={18} /> {isSubmitting ? "Submitting..." : "Submit Score"}
                    </button>
                  )}
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
