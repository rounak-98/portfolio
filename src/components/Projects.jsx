import React, { useState } from 'react';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Sparkles, FolderGit2, Star, Check, X, ArrowUpRight, Code, Layers } from 'lucide-react';
import { GithubIcon } from './SocialIcons';


export const Projects = () => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filters = ['All', 'Full Stack & Web', 'AI & Data Science'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Code & Builds</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Github & Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-base">
            Explore my GitHub repositories and full-stack software applications including food redistribution systems, exploratory data science analysis, and business management apps.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                selectedFilter === filter
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'glass-card text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`glass-card rounded-3xl p-6 border ${project.border} shadow-2xl flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden`}
            >
              {/* Subtle top glow */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${project.gradient}`}></div>

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-cyan-400 text-xs font-mono font-medium border border-slate-800">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="flex items-center gap-1 text-amber-400 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3 flex items-center gap-2">
                  <span>{project.title}</span>
                </h3>

                {/* Summary */}
                <p className="text-slate-300 text-sm leading-relaxed mb-5 line-clamp-3">
                  {project.summary}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 text-xs font-mono border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                >
                  <span>View Architecture & Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-cyan-400 hover:scale-110 transition border border-slate-800"
                    title="View GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Expanded Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-8 border border-slate-700 shadow-2xl relative space-y-6">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-4">
              <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono border border-cyan-800">
                {activeModalProject.category}
              </span>
              <h3 className="text-2xl font-extrabold text-white">{activeModalProject.title}</h3>
              <p className="text-slate-300 text-base leading-relaxed">{activeModalProject.description}</p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" />
                <span>Key Features & Innovations</span>
              </h4>
              <div className="space-y-2">
                {activeModalProject.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                    <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-mono text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                <Code className="w-4 h-4" />
                <span>Tech Stack & Tools</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-5 py-2.5 rounded-xl glass-card text-slate-300 text-sm font-medium border border-slate-800 hover:bg-slate-800/50"
              >
                Close
              </button>
              <a
                href={activeModalProject.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Visit GitHub Repo</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
