import React, { useEffect, useRef, useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowRight, Download, Mail, Sparkles, Code2, Compass, ShieldCheck } from 'lucide-react';
import * as THREE from 'three';

export const Hero = ({ onOpenResume }) => {
  const threeCanvasRef = useRef(null);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const titles = PERSONAL_INFO.titles;

  // Kinetic Typing Effect
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, titles]);

  // ThreeUI Sylva Living World Tree.js Organic Mesh Canvas
  useEffect(() => {
    const canvas = threeCanvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Outer Organic Living Canopy Geometry
    const outerGeo = new THREE.IcosahedronGeometry(2.6, 2);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const outerMesh = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerMesh);

    // Inner Living Core Geometry
    const innerGeo = new THREE.TorusKnotGeometry(1.4, 0.35, 100, 16);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x34d399, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let animationFrameId;
    const animate = () => {
      outerMesh.rotation.x += 0.003;
      outerMesh.rotation.y += 0.005;

      innerMesh.rotation.x -= 0.005;
      innerMesh.rotation.y -= 0.007;

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
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, []);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text & Kinetic Typography Area */}
          <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
            
            {/* Sylva Botanical Live Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#292c25] border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium shadow-md backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Available for Software Engineering & AI Roles</span>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-slate-300 text-lg sm:text-xl font-medium tracking-wide">
                Hello, I'm
              </h2>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-none">
                {PERSONAL_INFO.name}
              </h1>
              
              {/* Kinetic Typing Effect Subhead */}
              <div className="h-10 flex items-center pt-2">
                <span className="text-xl sm:text-3xl font-bold gradient-text">
                  {displayText}
                </span>
                <span className="w-0.5 h-7 bg-emerald-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Short Bio Intro */}
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Computer Science Engineer building full-stack software applications, intelligent AI models, and real-world client platforms like <strong className="text-white">Food Bridge AI</strong> and <strong className="text-white">Arus Homes</strong>.
            </p>

            {/* ThreeUI Liquid Form Shader CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              
              {/* Liquid Metal Primary CTA */}
              <a
                href="#projects"
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-bold text-base shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 hover:scale-[1.02] active:scale-[0.97] transition-all duration-200 animate-liquid"
              >
                <span>Explore 3D Bookshelf Projects</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              {/* Secondary Liquid Form Button */}
              <button
                onClick={onOpenResume}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-card text-slate-100 font-bold text-base border border-slate-700 hover:border-emerald-500/50 hover:text-emerald-300 active:scale-[0.97] transition-all shadow-md"
              >
                <Download className="w-5 h-5 text-emerald-400" />
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
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-emerald-400 hover:scale-110 border border-slate-800 transition"
                  title="GitHub Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-emerald-400 hover:scale-110 border border-slate-800 transition"
                  title="LinkedIn Profile"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>

                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-emerald-400 hover:scale-110 border border-slate-800 transition"
                  title="Direct Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: ThreeUI Sylva Living Tree.js Mesh Stage */}
          <div className="lg:col-span-5 flex items-center justify-center z-10">
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              
              {/* Three.js Tree.js Living Mesh Canvas */}
              <canvas
                ref={threeCanvasRef}
                className="w-full h-full block cursor-grab active:cursor-grabbing"
              />

              {/* Rounak Avatar Badge Overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-emerald-500/40 shadow-2xl backdrop-blur-md pointer-events-auto group">
                  <img
                    src="https://raw.githubusercontent.com/rounak-98/portfolio/main/public/avatar.jpg"
                    alt={PERSONAL_INFO.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
