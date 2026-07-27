import React, { useState } from 'react';
import { SKILLS_CATEGORIES } from '../data/portfolioData';
import { Brain, Code2, Database, Wrench, Sparkles, CheckCircle, Search } from 'lucide-react';

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const iconMap = {
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
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="gradient-text">Proficiencies</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                  : 'glass-card text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              All Skills
            </button>
            {SKILLS_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'glass-card text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat.title.split('&')[0]}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search skill (e.g. Python, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-card text-sm text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || Code2;
            const matchingSkills = searchQuery
              ? cat.skills.filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
              : cat.skills;

            if (matchingSkills.length === 0) return null;

            return (
              <div
                key={cat.id}
                className="glass-card p-6 rounded-3xl border border-slate-800/80 shadow-2xl hover:border-slate-700 transition-all duration-300 space-y-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${cat.color} text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{cat.title}</h3>
                    <div className="text-xs text-slate-400 font-mono">{matchingSkills.length} Core Competencies</div>
                  </div>
                </div>

                {/* Skill Items */}
                <div className="space-y-4">
                  {matchingSkills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 font-medium text-slate-200">
                          <CheckCircle className="w-4 h-4 text-cyan-400" />
                          <span>{skill.name}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/50">
                            {skill.tag}
                          </span>
                          <span className="text-slate-400">{skill.level}%</span>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
