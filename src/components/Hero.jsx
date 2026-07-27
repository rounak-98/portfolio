import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Mail, Download, Award, FolderGit2, Cpu, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';



export const Hero = ({ onOpenResume }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = PERSONAL_INFO.taglines[taglineIndex];

    const typeSpeed = isDeleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setTaglineIndex((prev) => (prev + 1) % PERSONAL_INFO.taglines.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-medium shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Available for Software Engineering & AI Roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-slate-400 text-lg sm:text-xl font-medium tracking-wide">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
                {PERSONAL_INFO.name}
              </h1>
              
              {/* Typing Effect Subhead */}
              <div className="h-10 flex items-center pt-2">
                <span className="text-xl sm:text-3xl font-bold gradient-text">
                  {displayText}
                </span>
                <span className="w-0.5 h-7 bg-cyan-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Short Bio Intro */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Computer Science student building scalable full-stack applications, intelligent AI models, and real-world software solutions like food redistribution platforms and data science suites.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card text-slate-100 font-semibold text-base border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 transition-all shadow-md"
              >
                <Download className="w-5 h-5 text-cyan-400" />
                <span>View & Download Resume</span>
              </button>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-800/80 w-full">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110 transition-all"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110 transition-all"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 hover:scale-110 transition-all"
                  title="Send Direct Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Avatar & Visual Badge Area */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80">
              
              {/* Outer Glowing Gradient Ring */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card p-2 border border-slate-700/80 shadow-2xl">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 grayscale-[10%] group-hover:grayscale-0"
                  onError={(e) => {
                    // Fallback avatar if path fails
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                  }}
                />
              </div>

              {/* Floating Highlight Card 1: Certificates */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-2.5 sm:gap-3 animate-float backdrop-blur-xl scale-90 sm:scale-100">
                <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight">19+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Certifications</div>
                </div>
              </div>

              {/* Floating Highlight Card 2: GitHub Projects */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-6 glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-2.5 sm:gap-3 animate-float backdrop-blur-xl [animation-delay:2s] scale-90 sm:scale-100">
                <div className="p-1.5 sm:p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight">6+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Featured Projects</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">19</div>
              <div className="text-xs text-slate-400">Verified Certificates</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">6+</div>
              <div className="text-xs text-slate-400">GitHub & Live Apps</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">15+</div>
              <div className="text-xs text-slate-400">Core Technologies</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">8.7 CGPA</div>
              <div className="text-xs text-slate-400">BVCOE Pune (B.Tech CS)</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
