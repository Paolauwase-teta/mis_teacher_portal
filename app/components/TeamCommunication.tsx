"use client";

import React, { useState } from "react";
import { MessageCircle, Send, User, Reply, Users, HelpCircle, CheckCircle } from "lucide-react";

export default function TeamCommunication() {
  const [activeTeam, setActiveTeam] = useState("Tech Titans");
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "teacher",
      author: "Jane Smith (You)",
      body: "Hi team, I'll be your mentor for this event. Feel free to ask any clarification questions here.",
      time: "June 10, 09:00 AM",
    },
    {
      id: 2,
      sender: "team",
      author: "Tech Titans",
      body: "Hi Jane, are there any restrictions on the number of external APIs we can use?",
      time: "June 10, 11:30 AM",
    },
    {
      id: 3,
      sender: "teacher",
      author: "Jane Smith (You)",
      body: "No strict limits, but make sure your solution can handle potential rate limiting gracefully.",
      time: "June 10, 01:15 PM",
    }
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const requests = [
    { id: 1, subject: "API limits", team: "Tech Titans", date: "June 10", status: "Answered" },
    { id: 2, subject: "Database schema", team: "Code Crafters", date: "June 12", status: "Pending" }
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setMessages([...messages, {
        id: Date.now(),
        sender: "teacher",
        author: "Jane Smith (You)",
        body: newMessage,
        time: "Just now",
      }]);
      setNewMessage("");
      setIsSending(false);
    }, 500);
  };

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white">
      <div className="max-w-6xl mx-auto px-10 py-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] font-normal uppercase tracking-[0.2em] text-stone-400 bg-stone-100 px-2.5 py-1 rounded-lg border border-stone-200">
                Mentor
              </span>
            </div>
            <h2 className="text-3xl font-light text-stone-900 tracking-tight">Team Communication</h2>
            <p className="text-[13px] text-stone-500 mt-2">
              Message your assigned teams and respond to clarification requests.
            </p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-[#1E3A5F]/5 flex items-center justify-center border border-[#1E3A5F]/10">
            <MessageCircle size={24} className="text-[#1E3A5F]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Thread & Send Message */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[650px]">
              <div className="p-5 border-b border-stone-100 bg-stone-50/50">
                <h3 className="text-[16px] font-light text-stone-900">{activeTeam} Thread</h3>
                <p className="text-[13px] text-stone-500 mt-1">Chat history with team lead.</p>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-stone-50/30 custom-scrollbar">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === "teacher" ? "items-end" : "items-start"}`}>
                    <div className="flex items-center gap-2 mb-1.5 px-1">
                      <span className="text-[11px] font-light text-stone-700">{msg.author}</span>
                      <span className="text-[10px] font-light text-stone-400">{msg.time}</span>
                    </div>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${
                      msg.sender === "teacher" 
                        ? "bg-[#1E3A5F] text-white rounded-tr-none" 
                        : "bg-white border border-stone-200 text-stone-800 rounded-tl-none shadow-sm"
                    }`}>
                      <p className={`text-[14px] leading-relaxed ${msg.sender === "teacher" ? "text-white/80" : "text-stone-600"}`}>
                        {msg.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Send Form */}
              <div className="p-5 border-t border-stone-100 bg-white">
                <form onSubmit={handleSend} className="space-y-4">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Write a message to the Team Lead..."
                    rows={3}
                    className="w-full bg-white border border-stone-200 rounded-xl p-3 text-stone-900 text-[14px] focus:border-[#1E3A5F] focus:ring-1 focus:ring-[#1E3A5F]/30 outline-none transition-all resize-none custom-scrollbar"
                    required
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSending || !newMessage.trim()}
                      className="px-6 py-2.5 bg-[#1E3A5F] text-white text-[13px] font-light rounded-xl hover:bg-[#1E3A5F]/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      <Send size={15} /> {isSending ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Right Column: Teams list & Requests */}
          <div className="space-y-6">
            
            {/* Clarification Requests Panel */}
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4 text-[#1E3A5F]">
                <HelpCircle size={18} />
                <h3 className="text-[14px] font-light text-stone-900">Clarification Requests</h3>
              </div>
              <div className="space-y-3">
                {requests.map(req => (
                  <div key={req.id} className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-[12px] font-light text-stone-900">{req.subject}</p>
                        <p className="text-[11px] text-stone-500 mt-0.5">{req.team}</p>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-light ${
                        req.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      }`}>
                        {req.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <p className="text-[10px] text-stone-400 uppercase tracking-wide">{req.date}</p>
                      {req.status === "Pending" && (
                        <button className="text-[11px] flex items-center gap-1 font-light text-[#1E3A5F] hover:underline">
                          <Reply size={12} /> Reply
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assigned Teams List */}
            <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4 text-[#1E3A5F]">
                <Users size={18} />
                <h3 className="text-[14px] font-light text-stone-900">Assigned Teams</h3>
              </div>
              <div className="space-y-2">
                {["Tech Titans", "Code Crafters"].map(team => (
                  <button
                    key={team}
                    onClick={() => setActiveTeam(team)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      activeTeam === team 
                        ? "bg-[#1E3A5F] border-[#1E3A5F] text-white shadow-sm" 
                        : "bg-white border-stone-200 text-stone-700 hover:border-[#1E3A5F]/50"
                    }`}
                  >
                    <p className={`text-[13px] font-light ${activeTeam === team ? "text-white" : "text-stone-900"}`}>{team}</p>
                    <p className={`text-[11px] mt-0.5 ${activeTeam === team ? "text-white/70" : "text-stone-500"}`}>Select to view thread</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
