import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Mail, Download, Award, FolderGit2, Cpu, CheckCircle2, Sparkles, Building2, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import * as THREE from 'three';

export const Hero = ({ onOpenResume }) => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const heroCanvasRef = useRef(null);

  // Typing Effect
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

  // ThreeUI 3D Rotating Mesh Sphere behind Avatar
  useEffect(() => {
    const canvas = heroCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(340, 340);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ThreeUI 3D Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(32, 8, 120, 16);
    const material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    let animationFrameId;
    const animate = () => {
      torusKnot.rotation.x += 0.008;
      torusKnot.rotation.y += 0.012;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content Area */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
            
            {/* Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium shadow-md backdrop-blur-md">
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
              Computer Science Engineer building full-stack software applications, intelligent AI models, and real-world client platforms like <strong className="text-white">Food Bridge AI</strong> and <strong className="text-white">Arus Homes</strong>.
            </p>

            {/* ThreeUI Shimmer CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={onOpenResume}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-card text-slate-100 font-bold text-base border border-slate-700 hover:border-cyan-500/50 hover:text-cyan-300 active:scale-[0.97] transition-all shadow-md"
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
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-cyan-400 hover:scale-110 border border-slate-800 transition"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-cyan-400 hover:scale-110 border border-slate-800 transition"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-cyan-400 hover:scale-110 border border-slate-800 transition"
                  title="Direct Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Avatar & ThreeUI 3D Visual Mesh Stage */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Background Three.js 3D Canvas Mesh */}
            <canvas
              ref={heroCanvasRef}
              className="absolute pointer-events-none z-0 w-[340px] h-[340px] opacity-80"
            />

            <div className="relative group w-64 h-64 sm:w-80 sm:h-80 z-10">
              
              {/* Outer Glowing Gradient Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
              
              {/* Image Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden glass-card p-2 border border-slate-700/80 shadow-2xl">
                <img
                  src={PERSONAL_INFO.avatar}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition duration-500 grayscale-[10%] group-hover:grayscale-0"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80";
                  }}
                />
              </div>

              {/* Floating Highlight Card 1: 3D Certificates */}
              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-6 glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-2.5 sm:gap-3 animate-float backdrop-blur-xl scale-90 sm:scale-100">
                <div className="p-1.5 sm:p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight">19+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">3D Credentials</div>
                </div>
              </div>

              {/* Floating Highlight Card 2: Featured Builds */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-6 glass-card p-2.5 sm:p-3 rounded-2xl border border-slate-700 shadow-xl flex items-center gap-2.5 sm:gap-3 animate-float backdrop-blur-xl [animation-delay:2s] scale-90 sm:scale-100">
                <div className="p-1.5 sm:p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <FolderGit2 className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-white leading-tight">6+</div>
                  <div className="text-[10px] sm:text-xs text-slate-400 font-medium">Software Builds</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Quick Stats Grid Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-slate-800/80">
          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-cyan-500/40 transition">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">19</div>
              <div className="text-xs text-slate-400">Verified Certificates</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-indigo-500/40 transition">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">6+</div>
              <div className="text-xs text-slate-400">Live Client & AI Apps</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-purple-500/40 transition">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">25+</div>
              <div className="text-xs text-slate-400">Core Technologies</div>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center gap-4 hover:border-emerald-500/40 transition">
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
