import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BackgroundCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    container.appendChild(renderer.domElement);

    // Cool Blue Botanical Spores
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);   // Electric Cyan
    const iceBlueColor = new THREE.Color(0x60a5fa); // Ice Blue
    const cobaltColor = new THREE.Color(0x2563eb);  // Cobalt Blue

    for (let i = 0; i < particleCount; i++) {
      const radius = 220 + (Math.random() - 0.5) * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const rand = Math.random();
      const vertexColor = rand > 0.5
        ? cyanColor.clone().lerp(iceBlueColor, rand)
        : cyanColor.clone().lerp(cobaltColor, rand);

      colors[i * 3] = vertexColor.r;
      colors[i * 3 + 1] = vertexColor.g;
      colors[i * 3 + 2] = vertexColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Parallax Physics
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      targetX = (event.clientX - window.innerWidth / 2) * 0.0004;
      targetY = (event.clientY - window.innerHeight / 2) * 0.0004;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      particleSystem.rotation.y += 0.0008;
      particleSystem.rotation.x += 0.0004;

      particleSystem.rotation.y += (targetX - particleSystem.rotation.y) * 0.05;
      particleSystem.rotation.x += (targetY - particleSystem.rotation.x) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0f172a]">
      {/* Cool Blue Ambient Light Pools */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] animate-pulse-slow pointer-events-none delay-1000"></div>
      <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse-slow pointer-events-none delay-2000"></div>
      
      <div ref={mountRef} className="w-full h-full block opacity-75" />
    </div>
  );
};
