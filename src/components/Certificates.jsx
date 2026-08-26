import React, { useState, useEffect, useRef } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Award, FileText, Search, Download, X, Sparkles, Eye, CheckCircle2, ShieldCheck, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, BookOpen, Layers } from 'lucide-react';

export const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState('next');

  const stageRef = useRef(null);

  const categories = [
    'All',
    'AI & GenAI',
    'Data Science & ML',
    'NPTEL & Academics',
    'Software Engineering'
  ];

  const filteredCertificates = CERTIFICATES.filter((cert) => {
    if (selectedCategory !== 'All' && cert.category !== selectedCategory) return false;
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      cert.title.toLowerCase().includes(query) ||
      cert.issuer.toLowerCase().includes(query) ||
      cert.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  // Reset index when filter/search changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [selectedCategory, searchQuery]);

  const activeCert = filteredCertificates[currentPageIndex] || filteredCertificates[0];

  // 3D Tilt interaction on pointer move
  const handlePointerMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const nx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.5);
    const ny = (e.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.5);
    setTilt({
      rx: Math.max(-4, Math.min(4, -ny * 3.5)),
      ry: Math.max(-6, Math.min(6, nx * 5))
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  const triggerPageTurn = (direction, targetIndex = null) => {
    if (isFlipping || filteredCertificates.length === 0) return;
    setFlipDirection(direction);
    setIsFlipping(true);

    setTimeout(() => {
      if (targetIndex !== null) {
        setCurrentPageIndex(targetIndex);
      } else if (direction === 'next') {
        setCurrentPageIndex((prev) => (prev + 1) % filteredCertificates.length);
      } else {
        setCurrentPageIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
      }
      setIsFlipping(false);
    }, 320);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(1.4, prev + 0.1));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(0.9, prev - 0.1));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3 shadow-md">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>MengToSketchbook Certificate Album & Interactive Plates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Credentials <span className="gradient-text">Sketchbook Album</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Turn pages, zoom into verified plates, and browse my 19+ certified credentials in a ThreeUI MengToSketchbook tactile album experience.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Filters */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'glass-card text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search certificate plates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-card text-sm text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

        </div>

        {/* SKETCHBOOK STAGE (MengToSketchbook Landing Page Experience) */}
        {filteredCertificates.length > 0 && activeCert ? (
          <div className="space-y-8">
            
            {/* Main Book Frame */}
            <div
              ref={stageRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              className="relative w-full max-w-5xl mx-auto flex items-center justify-center p-2 sm:p-6"
            >
              
              {/* Soft Ambient Cast Shadow under book */}
              <div className="absolute inset-x-12 bottom-4 h-24 bg-cyan-950/40 rounded-full blur-3xl pointer-events-none"></div>

              {/* 3D Tilt Wrapper */}
              <div
                className="w-full transition-transform duration-300 ease-out"
                style={{
                  transform: `perspective(1600px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${zoomLevel})`
                }}
              >
                
                {/* Book Spread Container (2 Facing Pages) */}
                <div className="glass-card rounded-3xl border-2 border-slate-700/80 shadow-2xl overflow-hidden relative grid grid-cols-1 md:grid-cols-2 min-h-[440px] sm:min-h-[480px]">
                  
                  {/* Curled Page Turn Overlay Transition */}
                  {isFlipping && (
                    <div
                      className={`absolute inset-y-0 w-1/2 bg-slate-900/90 z-30 transition-all duration-300 border-x border-cyan-500/40 ${
                        flipDirection === 'next' ? 'right-0 animate-in fade-in slide-in-from-left-6' : 'left-0 animate-in fade-in slide-in-from-right-6'
                      }`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent"></div>
                    </div>
                  )}

                  {/* LEFT PAGE: Illustrated Certificate Document Plate */}
                  <div className="p-6 sm:p-8 bg-slate-950/90 border-b md:border-b-0 md:border-r border-slate-800 flex flex-col justify-between relative group">
                    
                    {/* Spine Binding Gutter Line */}
                    <div className="hidden md:block absolute top-0 bottom-0 right-0 w-6 bg-gradient-to-l from-slate-950 to-transparent opacity-80 pointer-events-none z-10"></div>

                    {/* Page Header Info */}
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono font-semibold border border-cyan-800">
                          Plate #{String(currentPageIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>{activeCert.date}</span>
                        </span>
                      </div>

                      {/* Plate Graphic Box */}
                      <div className="w-full h-48 sm:h-56 rounded-2xl bg-slate-900 border border-slate-800 p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group-hover:border-cyan-500/40 transition">
                        <Award className="w-16 h-16 text-cyan-400 mb-3 animate-pulse" />
                        <div className="text-sm font-bold text-white max-w-xs">{activeCert.title}</div>
                        <div className="text-xs font-mono text-indigo-400 mt-1">Issued by {activeCert.issuer}</div>
                      </div>
                    </div>

                    {/* Left Page Footer */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between mt-4">
                      <span className="text-[11px] font-mono text-slate-400">Official Seal Verified</span>
                      <button
                        onClick={() => setActiveCertificateModal(activeCert)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Full Document</span>
                      </button>
                    </div>

                  </div>

                  {/* RIGHT PAGE: Editorial Description & Credentials Metadata */}
                  <div className="p-6 sm:p-8 bg-slate-900/60 flex flex-col justify-between relative">
                    
                    {/* Spine Shadow on Left edge */}
                    <div className="hidden md:block absolute top-0 bottom-0 left-0 w-6 bg-gradient-to-r from-slate-950 to-transparent opacity-80 pointer-events-none z-10"></div>

                    <div>
                      {/* Category Tag */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                          {activeCert.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          Plate {currentPageIndex + 1} of {filteredCertificates.length}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">
                        {activeCert.title}
                      </h3>

                      <div className="text-xs font-semibold text-indigo-400 mb-4 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                        <span>Issued by {activeCert.issuer}</span>
                      </div>

                      {/* Description */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                        {activeCert.description}
                      </p>

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 my-3">
                        {activeCert.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-950 text-slate-300 text-xs font-mono border border-slate-800"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Page Action Bar */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 mt-4">
                      <button
                        onClick={() => triggerPageTurn('prev')}
                        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition"
                        title="Turn to Previous Page"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveCertificateModal(activeCert)}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition"
                        >
                          <Eye className="w-4 h-4" />
                          <span>Preview PDF</span>
                        </button>
                        {activeCert.fileUrl && (
                          <a
                            href={activeCert.fileUrl}
                            download
                            className="p-2 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                            title="Download PDF Document"
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        )}
                      </div>

                      <button
                        onClick={() => triggerPageTurn('next')}
                        className="p-2.5 rounded-xl glass-card text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 transition"
                        title="Turn to Next Page"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* MENGTO SKETCHBOOK TOOLS BAR (`sb-tools`) */}
            <div className="flex items-center justify-center gap-3">
              <div className="glass-card px-4 py-2 rounded-full border border-slate-800 flex items-center gap-3 shadow-xl backdrop-blur-md">
                
                {/* Page Prev/Next */}
                <button
                  onClick={() => triggerPageTurn('prev')}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition"
                  title="Previous Plate"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-300 px-2 border-x border-slate-800">
                  Plate {String(currentPageIndex + 1).padStart(2, '0')} / {String(filteredCertificates.length).padStart(2, '0')}
                </span>

                <button
                  onClick={() => triggerPageTurn('next')}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 transition"
                  title="Next Plate"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Separator */}
                <div className="w-px h-4 bg-slate-800"></div>

                {/* Zoom Controls */}
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.9}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 transition"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="text-[11px] font-mono text-cyan-400 w-10 text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 1.4}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-cyan-400 disabled:opacity-30 transition"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                {zoomLevel !== 1 && (
                  <button
                    onClick={handleResetZoom}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}

              </div>
            </div>

            {/* EDITORIAL CERTIFICATE INDEX (`plateList`) */}
            <div className="glass-card rounded-3xl p-6 border border-slate-800/80 shadow-xl max-w-5xl mx-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">Editorial Certificate Index</h4>
                </div>
                <span className="text-xs font-mono text-slate-400">{filteredCertificates.length} Plates Listed</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 max-h-60 overflow-y-auto pr-1">
                {filteredCertificates.map((cert, i) => (
                  <button
                    key={cert.id}
                    onClick={() => triggerPageTurn(i >= currentPageIndex ? 'next' : 'prev', i)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${
                      currentPageIndex === i
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm font-semibold'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800/60'
                    }`}
                  >
                    <span className="text-[11px] font-mono text-cyan-400 font-bold shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs truncate font-medium">{cert.title}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="py-12 text-center glass-card rounded-3xl border border-slate-800">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No certificate plates match your filter</h3>
            <p className="text-slate-400 text-sm mt-1">Try clearing your search query or selecting "All" categories.</p>
          </div>
        )}

      </div>

      {/* Embedded Certificate PDF Lightbox Modal */}
      {activeCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-4xl w-full h-[85vh] rounded-3xl p-6 border border-slate-700 shadow-2xl relative flex flex-col justify-between space-y-4">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 pr-10">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 text-xs font-mono border border-cyan-800">
                  {activeCertificateModal.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">{activeCertificateModal.title}</h3>
                <div className="text-xs text-cyan-400 font-medium">Issued by {activeCertificateModal.issuer} • {activeCertificateModal.date}</div>
              </div>
              
              <button
                onClick={() => setActiveCertificateModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded PDF Viewer Container */}
            <div className="flex-1 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 relative">
              {activeCertificateModal.fileUrl ? (
                <iframe
                  src={activeCertificateModal.fileUrl}
                  title={activeCertificateModal.title}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Award className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Verified Certificate Document</h4>
                  <p className="text-slate-400 text-sm max-w-md mt-2">
                    Official credential verified for {activeCertificateModal.issuer}.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs font-mono text-slate-400">
                Verified Credential Record
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCertificateModal(null)}
                  className="px-4 py-2 rounded-xl glass-card text-slate-300 text-xs font-semibold border border-slate-800 hover:bg-slate-800"
                >
                  Close Preview
                </button>
                {activeCertificateModal.fileUrl && (
                  <a
                    href={activeCertificateModal.fileUrl}
                    download
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
