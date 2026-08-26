import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const BackgroundCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Three.js 3D WebGL Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // 3D Particles Sphere Geometry
    const particleCount = 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const cobaltColor = new THREE.Color(0x0284c7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 180 + (Math.random() - 0.5) * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const mixRatio = Math.random();
      const vertexColor = cyanColor.clone().lerp(cobaltColor, mixRatio);
      colors[i * 3] = vertexColor.r;
      colors[i * 3 + 1] = vertexColor.g;
      colors[i * 3 + 2] = vertexColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Mouse Interaction Variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.05;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // 3D Animation Loop
    let animationFrameId;
    const animate = () => {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSystem.rotation.y += 0.0012;
      particleSystem.rotation.x += 0.0006;

      particleSystem.rotation.y += targetX * 0.0003;
      particleSystem.rotation.x += targetY * 0.0003;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* ThreeUI Ambient Glow Fields */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none delay-1000"></div>
      <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-indigo-500/15 rounded-full blur-[120px] animate-pulse-slow pointer-events-none delay-2000"></div>
      <div ref={mountRef} className="w-full h-full block opacity-70" />
    </div>
  );
};
