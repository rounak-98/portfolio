import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUp, Code2, Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';


export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative pt-12 pb-8 border-t border-slate-800/80 bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-slate-100">
                Rounak Pathak
              </span>
              <span className="text-xs text-slate-400 block font-mono">Software Engineer & AI Developer</span>
            </div>
          </div>

          {/* Center Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Scroll to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-xl glass-card text-xs text-slate-300 font-mono border border-slate-800 hover:border-cyan-500/40 hover:text-cyan-300 transition shadow-sm"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-cyan-400" />
          </button>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <p>© 2026 Rounak Pathak. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with React, Vite & Tailwind</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
