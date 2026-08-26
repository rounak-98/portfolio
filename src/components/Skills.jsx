import React, { useState } from 'react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';
import { Brain, Code2, Database, Wrench, Sparkles, Cpu, Search, CheckCircle2, X, ShieldCheck, Layers, Grid } from 'lucide-react';

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSkillModal, setActiveSkillModal] = useState(null);

  const iconMap = {
    Sparkles: Sparkles,
    Brain: Brain,
    Code2: Code2,
    Database: Database,
    Wrench: Wrench
  };

  const filteredCategories = SKILLS_CATEGORIES.filter((cat) => {
    if (selectedCategory !== 'all' && cat.id !== selectedCategory) return false;
    if (!searchQuery) return true;
    return cat.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
  });

  return (
    <section id="skills" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3 shadow-md">
            <Grid className="w-4 h-4 text-emerald-400" />
            <span>ThreeUI Woven Cloth & Textile Surface Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical <span className="gradient-text">Woven Skill Stack</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Tactile woven cloth skill cards spanning Generative AI, Machine Learning, Full-Stack Frameworks, Data Science & Cloud Infrastructure. Click any card to inspect project usage!
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Domain Tabs */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/20'
                  : 'glass-card text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Domains
            </button>
            {SKILLS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/20'
                    : 'glass-card text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat.title.split(',')[0]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search skill (e.g. FastAPI, Python)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-card text-sm text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-emerald-500 transition"
            />
          </div>

        </div>

        {/* ThreeUI Woven Cloth Surface Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code2;
            const matchingSkills = searchQuery
              ? cat.skills.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
              : cat.skills;

            if (matchingSkills.length === 0) return null;

            return (
              <div
                key={cat.id}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-emerald-500/40 transition-all duration-300 space-y-6 group hover:-translate-y-1 hover:rotate-1 bg-gradient-to-b from-[#2e312a] to-[#252822]"
              >
                {/* Woven Cloth Header */}
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${cat.color} text-white shadow-md group-hover:scale-110 transition duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {cat.title}
                    </h3>
                    <div className="text-xs text-slate-400 font-mono">
                      {matchingSkills.length} Woven Components
                    </div>
                  </div>
                </div>

                {/* Skills Progress List */}
                <div className="space-y-3.5">
                  {matchingSkills.map((skill, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveSkillModal({ ...skill, category: cat.title })}
                      className="p-3 rounded-2xl bg-[#1e201b]/90 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-all duration-200 group/skill"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-semibold text-slate-200 group-hover/skill:text-emerald-300 transition">
                          {skill.name}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          skill.tag === 'Master' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                          skill.tag === 'Expert' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                          'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        }`}>
                          {skill.tag}
                        </span>
                      </div>

                      {/* Animated Woven Skill Meter */}
                      <div className="w-full h-2 rounded-full bg-[#141612] overflow-hidden relative border border-slate-800">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000 group-hover/skill:brightness-125`}
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      {/* Project Tagline */}
                      {skill.project && (
                        <div className="text-[10px] text-slate-400 font-mono mt-1.5 flex items-center justify-between">
                          <span>Applied in: {skill.project}</span>
                          <span className="text-emerald-400 group-hover/skill:translate-x-0.5 transition">Inspect &rarr;</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Skill Details Modal */}
      {activeSkillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e201b]/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-md w-full rounded-3xl p-6 border border-slate-700 shadow-2xl relative space-y-4">
            
            <button
              onClick={() => setActiveSkillModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800">
                {activeSkillModal.category}
              </span>
              <h3 className="text-xl font-extrabold text-white">{activeSkillModal.name}</h3>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Proficiency Level: {activeSkillModal.level}% ({activeSkillModal.tag})</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#141612] border border-slate-800 space-y-2">
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Real-World Woven Application</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                Rounak utilized <strong>{activeSkillModal.name}</strong> extensively while engineering <strong>{activeSkillModal.project}</strong>.
              </p>
            </div>

            <div className="pt-2 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setActiveSkillModal(null)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold text-xs shadow-md"
              >
                Close Component
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
