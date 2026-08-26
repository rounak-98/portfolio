import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE } from '../data/portfolioData';
import { User, GraduationCap, Heart, Terminal, Sparkles, Compass, Lightbulb, Code2, Briefcase, ExternalLink, Award, Globe, ShieldCheck, CheckCircle2 } from 'lucide-react';
import * as THREE from 'three';

export const About = () => {
  const [activeTab, setActiveTab] = useState('background');
  const sylvaCanvasRef = useRef(null);

  const tabs = [
    { id: 'background', label: 'Background & Bio', icon: User },
    { id: 'experience', label: 'Work & Freelance', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'interests', label: 'Interests & Languages', icon: Heart }
  ];

  // Sylva Living World Three.js Interactive Scene
  useEffect(() => {
    const canvas = sylvaCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ThreeUI Sylva Living Particles
    const count = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const greenColor = new THREE.Color(0x34d399); // Living Emerald
    const cyanColor = new THREE.Color(0x38bdf8);  // Electric Cyan

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 350;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const mixRatio = Math.random();
      const c = greenColor.clone().lerp(cyanColor, mixRatio);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let frameId;
    const animate = () => {
      particles.rotation.y += 0.0008;
      particles.rotation.x += 0.0004;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      
      {/* Sylva Living World Atmosphere Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Sylva Canvas Overlay */}
        <canvas
          ref={sylvaCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
        />

        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-medium mb-3 shadow-md">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Sylva Living World Architecture & Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="gradient-text">Rounak Pathak</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Computer Science Student & Engineer dedicated to crafting robust software architectures, intelligent AI models, and client-centric platforms.
          </p>
        </div>

        {/* Sylva Dock Navigation Capsule */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-1 relative z-10">
          <div className="glass-card p-1.5 rounded-2xl border border-slate-800 flex items-center gap-2 shadow-2xl backdrop-blur-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/20 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Grid Content Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          
          {/* Left Column: Sylva Card Specimen */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden group">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500"></div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                  Software Engineering Specimen
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[11px] font-mono border border-emerald-800">
                  CGPA 8.7 / 10
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl font-extrabold text-white">
                  Bharati Vidyapeeth College of Engineering, Pune
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  B.Tech in Computer Engineering (2023 - 2027). Specializing in full-stack web applications, machine learning algorithms, asynchronous API design, and data science workflows.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400">Current Role</div>
                  <div className="font-bold text-white">AI Developer Intern</div>
                  <div className="text-[10px] text-emerald-400">Infosys Springboard 7.0</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                  <div className="text-[10px] font-mono text-slate-400">Client Work</div>
                  <div className="font-bold text-white">Freelance Dev</div>
                  <div className="text-[10px] text-cyan-400">Arus Homes Developers</div>
                </div>
              </div>

            </div>

            {/* Quick Highlight Pill */}
            <div className="glass-card p-5 rounded-3xl border border-slate-800 shadow-xl flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-mono text-slate-400">Verified Credentials</div>
                <div className="text-sm font-bold text-white">19+ NPTEL & AI Research Certificates</div>
              </div>
            </div>

          </div>

          {/* Right Column: Tabbed Content Display */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl min-h-[420px] flex flex-col justify-between">
              
              {/* Background Tab */}
              {activeTab === 'background' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <User className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-white">Background & Professional Story</h3>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    I am a passionate Computer Engineering undergraduate at <strong>Bharati Vidyapeeth College of Engineering, Pune</strong> (CGPA 8.7/10). My work centers on building reliable full-stack applications and deploying machine learning models that solve real-world industry problems.
                  </p>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    From engineering the <strong>Food Bridge AI</strong> platform for urban food waste reduction during my <strong>Infosys Springboard Internship 7.0</strong> to building client real estate applications for <strong>Arus Homes Developers</strong>, I combine modern web technologies like React, FastAPI, Django, MySQL, and Python with data science stack.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                      <Terminal className="w-5 h-5 text-cyan-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Full-Stack Engineering</div>
                        <div className="text-[10px] text-slate-400">React, FastAPI, Django, MySQL</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Applied AI & ML</div>
                        <div className="text-[10px] text-slate-400">Scikit-Learn, PyTorch, GenAI</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Work & Freelance Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Briefcase className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-white">Work Experience & Freelance</h3>
                  </div>

                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-emerald-500/50 space-y-2">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-slate-950"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-medium text-cyan-400">{exp.company}</div>
                        {exp.demo && exp.demo !== '#' && (
                          <a
                            href={exp.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold text-xs shadow-sm hover:scale-105 transition"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Visit Live App</span>
                          </a>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">{exp.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education Tab */}
              {activeTab === 'education' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <GraduationCap className="w-6 h-6 text-cyan-400" />
                    <h3 className="text-xl font-bold text-white">Academic Journey & Distinction</h3>
                  </div>

                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-cyan-500/50 space-y-2">
                      <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-emerald-400">{edu.institution} • {edu.status}</div>
                      <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests & Languages Tab */}
              {activeTab === 'interests' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <Heart className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-xl font-bold text-white">Passions & Languages Known</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Languages Known</div>
                      <div className="flex flex-wrap gap-2">
                        {PERSONAL_INFO.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800 flex items-center gap-2"
                          >
                            <Globe className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{lang}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Passions & Interests</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Beyond coding, I actively explore emerging AI research papers, participate in competitive programming challenges, contribute to open-source software, and experiment with spatial WebGL UI designs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
