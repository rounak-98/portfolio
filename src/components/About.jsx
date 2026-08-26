import React, { useState, useEffect, useRef } from 'react';
import { PERSONAL_INFO, EDUCATION, EXPERIENCE } from '../data/portfolioData';
import { User, GraduationCap, Heart, Terminal, Sparkles, Compass, Lightbulb, Code2, Briefcase, ExternalLink, Award, Globe, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

export const About = () => {
  const [activeTab, setActiveTab] = useState('background');
  const sylvaTreeCanvasRef = useRef(null);

  const tabs = [
    { id: 'background', label: 'Background & Bio', icon: User },
    { id: 'experience', label: 'Work & Freelance', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'interests', label: 'Interests & Languages', icon: Heart }
  ];

  // Sylva Living World 3D Organic Tree Branch Scene in Three.js
  useEffect(() => {
    const canvas = sylvaTreeCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Three.js Curved Organic Mossy Tree Branch 1 (Lower Branch)
    const curve1 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -6, 2),
      new THREE.Vector3(-4, -4, 0),
      new THREE.Vector3(2, -2, -2),
      new THREE.Vector3(8, 0, -4),
      new THREE.Vector3(14, 4, -6)
    ]);
    const geo1 = new THREE.TubeGeometry(curve1, 64, 0.9, 16, false);
    const mat1 = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.6,
      metalness: 0.2,
      wireframe: true
    });
    const branch1 = new THREE.Mesh(geo1, mat1);
    scene.add(branch1);

    // Three.js Curved Organic Living Branch 2 (Upper Canopy Branch)
    const curve2 = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 4, -4),
      new THREE.Vector3(-2, 2, -2),
      new THREE.Vector3(4, 3, 0),
      new THREE.Vector3(10, 6, 2)
    ]);
    const geo2 = new THREE.TubeGeometry(curve2, 64, 0.6, 16, false);
    const mat2 = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    });
    const branch2 = new THREE.Mesh(geo2, mat2);
    scene.add(branch2);

    // Living Spores Particles
    const count = 300;
    const sporeGeo = new THREE.BufferGeometry();
    const sporePos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      sporePos[i * 3] = (Math.random() - 0.5) * 24;
      sporePos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      sporePos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    sporeGeo.setAttribute('position', new THREE.BufferAttribute(sporePos, 3));
    const sporeMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7
    });
    const spores = new THREE.Points(sporeGeo, sporeMat);
    scene.add(spores);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    let animationFrameId;
    const animate = () => {
      branch1.rotation.z += 0.0005;
      branch2.rotation.z -= 0.0008;
      spores.rotation.y += 0.001;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
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
      cancelAnimationFrame(animationFrameId);
      geo1.dispose();
      mat1.dispose();
      geo2.dispose();
      mat2.dispose();
      sporeGeo.dispose();
      sporeMat.dispose();
    };
  }, []);

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      
      {/* Sylva Living World Atmosphere Stage */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-medium mb-3 shadow-md">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>Sylva Living World Tree.js Stage & Specimen Cards</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Step into the <span className="gradient-text">Living World</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Explore my engineering journey, work experience, academic distinction, and passions in a ThreeUI Sylva Living World organic stage.
          </p>
        </div>

        {/* Sylva Floating Capsule Dock Navigation */}
        <div className="flex items-center justify-center gap-2 mb-12 relative z-20">
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
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 scale-[1.02]'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SYLVA LIVING WORLD 3D TREE STAGE & FLOATING SPECIMEN CARDS */}
        <div className="relative w-full min-h-[540px] rounded-3xl overflow-hidden glass-card border border-slate-800 shadow-2xl p-6 sm:p-10 bg-slate-950/90">
          
          {/* Three.js Living Tree Branch Canvas */}
          <canvas
            ref={sylvaTreeCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-70"
          />

          {/* Floating Branch Callout Stat Pins */}
          <div className="hidden lg:block absolute left-12 top-16 z-10 animate-float">
            <div className="glass-card px-3.5 py-2 rounded-2xl border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>BVCOE Pune • CGPA 8.7/10</span>
            </div>
          </div>

          <div className="hidden lg:block absolute left-16 bottom-20 z-10 animate-float delay-1000">
            <div className="glass-card px-3.5 py-2 rounded-2xl border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-2 shadow-lg">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Infosys Springboard 7.0 • AI Intern</span>
            </div>
          </div>

          {/* MAIN CONTENT STAGE GRID (Matching Sylva Specimen Layout) */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
            
            {/* LEFT COLUMN: Main Specimen Information Panel */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Background Tab */}
              {activeTab === 'background' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Our Ethos & Engineering Story</span>
                    <h3 className="text-3xl font-extrabold text-white leading-tight">
                      Crafting Robust Software & Intelligent AI Systems
                    </h3>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    I am a Computer Science Engineer at <strong>Bharati Vidyapeeth College of Engineering, Pune</strong> (CGPA 8.7/10). My focus is engineering production software architectures, deploying machine learning algorithms, and delivering client-centric platforms.
                  </p>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    From building the <strong>Food Bridge AI</strong> platform for urban food waste management during my <strong>Infosys Springboard Internship 7.0</strong> to developing client real estate platforms for <strong>Arus Homes Developers</strong>, I combine modern frameworks (React, FastAPI, Django, MySQL) with data science.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-cyan-400" />
                        <span>Full-Stack Engineering</span>
                      </div>
                      <div className="text-xs text-slate-400">React.js, FastAPI, Django, MySQL</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span>Applied AI & ML</span>
                      </div>
                      <div className="text-xs text-slate-400">Scikit-Learn, PyTorch, GenAI</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Work & Freelance Experience Tab */}
              {activeTab === 'experience' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Field Note 01 • Work Experience</span>
                    <h3 className="text-3xl font-extrabold text-white leading-tight">
                      Internship & Client Platforms
                    </h3>
                  </div>

                  {EXPERIENCE.map((exp, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{exp.role}</h4>
                        <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-xs font-medium text-blue-400">{exp.company}</div>
                        {exp.demo && exp.demo !== '#' && (
                          <a
                            href={exp.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-sm hover:scale-105 transition"
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
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Field Note 02 • Academic Distinction</span>
                    <h3 className="text-3xl font-extrabold text-white leading-tight">
                      Computer Engineering Degree
                    </h3>
                  </div>

                  {EDUCATION.map((edu, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-lg font-bold text-white">{edu.degree}</h4>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono">
                          {edu.period}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-cyan-400">{edu.institution} • {edu.status}</div>
                      <p className="text-xs sm:text-sm text-slate-300 pt-1 leading-relaxed">{edu.details}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests & Languages Tab */}
              {activeTab === 'interests' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Field Note 03 • Passions & Languages</span>
                    <h3 className="text-3xl font-extrabold text-white leading-tight">
                      Multilingual & Open Source
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Languages Spoken</div>
                      <div className="flex flex-wrap gap-2">
                        {PERSONAL_INFO.languages.map((lang, idx) => (
                          <span
                            key={idx}
                            className="px-3.5 py-2 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono border border-slate-800 flex items-center gap-2"
                          >
                            <Globe className="w-4 h-4 text-cyan-400" />
                            <span>{lang}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">Passions & Interests</div>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        Beyond coding, I actively explore emerging AI research papers, participate in competitive programming challenges, contribute to open-source software, and experiment with spatial ThreeUI WebGL designs.
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT COLUMN: Floating Specimen Paper Cards Sitting on the Living Branch */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              {/* Floating Card 1: Our Ethos Specimen Card */}
              <div className="glass-card p-6 rounded-3xl border-2 border-cyan-500/60 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-300 bg-slate-900/90">
                <figure className="w-full h-36 rounded-2xl overflow-hidden mb-4 relative bg-slate-950 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80"
                    alt="Living World Specimen"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-mono text-cyan-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-full border border-cyan-500/40">
                    Specimen #01 • Full Stack AI
                  </span>
                </figure>

                <h4 className="text-lg font-bold text-white mb-1">Our Ethos: Build Real Solutions</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineering client platforms, AI waste management algorithms, and interactive web tools that deliver measurable user value.
                </p>
              </div>

              {/* Floating Card 2: Field Note Specimen Card */}
              <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition duration-300 bg-slate-900/80">
                <figure className="w-full h-36 rounded-2xl overflow-hidden mb-4 relative bg-slate-950 border border-slate-800">
                  <img
                    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80"
                    alt="Field Note Specimen"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  <span className="absolute bottom-3 left-3 text-[11px] font-mono text-blue-300 font-bold bg-slate-950/80 px-2.5 py-1 rounded-full border border-blue-500/40">
                    Field Note #07 • Machine Learning
                  </span>
                </figure>

                <h4 className="text-lg font-bold text-white mb-1">Field Note: Machine Learning & NLP</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Developing Scikit-learn predictive models, TF-IDF recommendation engines, and OpenAI GPT API integrations.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
