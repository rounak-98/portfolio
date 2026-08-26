import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Sparkles, BookOpen, Layers, Star, CheckCircle, Code2, Globe, ShieldCheck, ArrowRight, Eye, X } from 'lucide-react';

export const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeBookModal, setActiveBookModal] = useState(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'experience', label: 'Work & Freelance' },
    { id: 'regular', label: 'Software Apps' }
  ];

  const filteredProjects = PROJECTS.filter((project) => {
    if (selectedFilter === 'experience') return project.category === 'experience';
    if (selectedFilter === 'regular') return project.category === 'regular';
    return true;
  });

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3 shadow-md">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>ThreeUI 3D Bookshelf & Character Carousel Deck</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Projects <span className="gradient-text">3D Bookshelf</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Click any 3D book spine on the bookshelf to slide out project specifications, live app links, and architecture details!
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="glass-card p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-xl">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === cat.id
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* THREEUI 3D BOOKSHELF CONTAINER */}
        <div className="relative max-w-5xl mx-auto p-6 sm:p-10 glass-card rounded-3xl border-2 border-slate-700/80 shadow-2xl bg-gradient-to-b from-[#292c25] to-[#1e201b]">
          
          {/* Wooden / Titanium Shelf Ledge */}
          <div className="absolute left-4 right-4 bottom-4 h-4 bg-gradient-to-r from-[#4a4d44] via-[#5c6155] to-[#4a4d44] rounded-lg shadow-lg border-t border-emerald-500/30"></div>

          {/* 3D Books Grid Standing on Shelf */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-6 relative z-10">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveBookModal(project)}
                className="perspective-1000 group cursor-pointer"
              >
                {/* 3D Book Spine & Cover Container */}
                <div className="relative w-full h-80 rounded-2xl glass-card border border-slate-700/80 shadow-xl overflow-hidden transition-all duration-300 group-hover:-translate-y-3 group-hover:rotate-1 group-hover:border-emerald-500/60 flex flex-col justify-between p-6 bg-slate-900/90">
                  
                  {/* Book Spine Texture Line */}
                  <div className="absolute top-0 bottom-0 left-0 w-3 bg-gradient-to-r from-emerald-500 to-cyan-600"></div>

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 pl-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        project.category === 'experience'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {project.badge || (project.category === 'experience' ? 'Experience Build' : 'Software App')}
                      </span>

                      {project.featured && (
                        <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                          <Star className="w-3 h-3 fill-amber-300" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-extrabold text-white leading-tight mb-2 pl-2 group-hover:text-emerald-300 transition">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 pl-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pl-2 pt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">Click 3D book spine to inspect</span>
                    <button
                      type="button"
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 group-hover:bg-emerald-500/30 transition"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Open Book &rarr;</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* 3D BOOK DETAILS MODAL */}
      {activeBookModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e201b]/90 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-2xl relative space-y-6 bg-slate-900/95">
            
            <button
              onClick={() => setActiveBookModal(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-800">
                {activeBookModal.badge || activeBookModal.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white">{activeBookModal.title}</h3>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {activeBookModal.description}
            </p>

            {/* Key Features */}
            {activeBookModal.features && (
              <div className="space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Key Architecture Features</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeBookModal.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {activeBookModal.tags.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              {activeBookModal.github && activeBookModal.github !== '#' ? (
                <a
                  href={activeBookModal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl glass-card text-slate-200 font-semibold text-xs border border-slate-700 hover:text-white"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  <span>View GitHub Code</span>
                </a>
              ) : <div />}

              {activeBookModal.demo && activeBookModal.demo !== '#' && (
                <a
                  href={activeBookModal.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition"
                >
                  <Globe className="w-4 h-4" />
                  <span>Launch Live Site</span>
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
