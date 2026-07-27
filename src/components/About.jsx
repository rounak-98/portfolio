import React, { useState } from 'react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE } from '../data/portfolioData';
import { User, GraduationCap, Heart, Terminal, Sparkles, Compass, Lightbulb, Code2, Briefcase, ExternalLink } from 'lucide-react';

export const About = () => {
  const [activeTab, setActiveTab] = useState('background');

  const tabs = [
    { id: 'background', label: 'Background', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'interests', label: 'Interests & Passions', icon: Heart }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Nav Tabs */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <div className="glass-card p-2 rounded-2xl border border-slate-800 shadow-xl flex flex-row lg:flex-col overflow-x-auto no-scrollbar gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-4 rounded-xl text-left font-semibold text-xs sm:text-base whitespace-nowrap shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`}
                  >
                    <div className={`p-1.5 sm:p-2 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Stat Pill */}
            <div className="glass-card p-6 rounded-2xl border border-slate-800 shadow-xl flex items-center gap-4 bg-gradient-to-br from-slate-900/90 to-indigo-950/40">
              <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Code2 className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-mono text-cyan-400">Software Engineering</div>
                <div className="text-xs text-slate-400 mt-1">Focusing on Full-Stack Systems & Applied AI Solutions</div>
              </div>
            </div>
          </div>

          {/* Right Column: Tab Content */}
          <div className="lg:col-span-8">
            <div className="glass-card p-8 rounded-3xl border border-slate-800/80 shadow-2xl min-h-[380px] flex flex-col justify-between">
              
              {/* Background Tab */}
              {activeTab === 'background' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Terminal className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Who I Am</h3>
                  </div>
                  
                  <p className="text-slate-300 text-base leading-relaxed">
                    {PERSONAL_INFO.bio}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-cyan-400 mb-1">Passionate About</div>
                      <div className="text-sm font-semibold text-slate-200">System Design & Applied AI</div>
                      <p className="text-xs text-slate-400 mt-1">Building responsive UI platforms backed by efficient relational databases & ML APIs.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                      <div className="text-xs font-mono text-purple-400 mb-1">Problem Solving</div>
                      <div className="text-sm font-semibold text-slate-200">Competitive Coding & Puzzles</div>
                      <p className="text-xs text-slate-400 mt-1">Actively solving algorithmic challenges and logic problems.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Briefcase className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Work Experience</h3>
                  </div>

                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-cyan-500/40 space-y-2">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-sm font-medium text-indigo-400">{exp.company}</div>
                        {exp.demo && (
                          <a
                            href={exp.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-xs shadow-sm hover:scale-105 transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Visit Live App</span>
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-slate-300 pt-1 leading-relaxed">{exp.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <GraduationCap className="w-6 h-6 text-indigo-400" />
                    <h3 className="text-xl font-bold text-white">Academic Journey</h3>
                  </div>

                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-indigo-500/40 space-y-2">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-indigo-500 border-4 border-slate-950"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                        <span className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-cyan-400">{edu.institution}</div>
                      <p className="text-sm text-slate-300 pt-1">{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests & Passions Tab */}
              {activeTab === 'interests' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Heart className="w-6 h-6 text-rose-400" />
                    <h3 className="text-xl font-bold text-white">Beyond the Code</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm">
                        <Compass className="w-4 h-4" />
                        <span>Sketching & Visual Art</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        I enjoy sketching structural designs and visual artwork during breaks, enhancing my attention to detail and design thinking.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                        <Lightbulb className="w-4 h-4" />
                        <span>Logic Puzzles & Hackathons</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Participating in tech competitions, solving logic riddles, and exploring emerging no-code & automation frameworks.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Footer Quote */}
              <div className="pt-6 border-t border-slate-800/80 text-xs text-slate-400 font-mono flex flex-wrap items-center justify-between gap-2">
                <span>Location: {PERSONAL_INFO.location}</span>
                <span className="text-slate-300">Languages: <span className="text-cyan-400 font-semibold">{PERSONAL_INFO.languages.join(' • ')}</span></span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
