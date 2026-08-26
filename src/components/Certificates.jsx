import React, { useState, useEffect } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Award, FileText, Search, Download, X, Sparkles, Eye, CheckCircle2, ShieldCheck, ChevronLeft, ChevronRight, RotateCcw, Repeat, Layers, ExternalLink } from 'lucide-react';

export const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [activeCarouselIndex, setActiveCarouselIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState({});

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

  // Reset carousel index when filter changes
  useEffect(() => {
    setActiveCarouselIndex(0);
  }, [selectedCategory, searchQuery]);

  const handleNext = () => {
    if (filteredCertificates.length === 0) return;
    setActiveCarouselIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const handlePrev = () => {
    if (filteredCertificates.length === 0) return;
    setActiveCarouselIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  const toggleDoorFlip = (id, e) => {
    e.stopPropagation();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-3 shadow-md">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>ThreeUI 3D Character Carousel & Verified Document Plates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            19+ Verified <span className="gradient-text">Certificate Document Plates</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Spin the 3D Character Carousel to preview live certificate documents, inspect verified seals, and download official PDF records!
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          
          {/* Category Badges */}
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

          {/* Search Box */}
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

        {/* THREEUI 3D CHARACTER CAROUSEL STAGE */}
        {filteredCertificates.length > 0 ? (
          <div className="relative w-full max-w-5xl mx-auto py-8">
            
            {/* Carousel Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full glass-card text-slate-200 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 shadow-2xl transition hover:scale-110 active:scale-95"
              title="Spin Carousel Left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3.5 rounded-full glass-card text-slate-200 hover:text-cyan-400 border border-slate-700 hover:border-cyan-500/50 shadow-2xl transition hover:scale-110 active:scale-95"
              title="Spin Carousel Right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* 3D Cylindrical Carousel Wrapper */}
            <div className="relative h-[460px] w-full flex items-center justify-center perspective-1000">
              
              {filteredCertificates.map((cert, index) => {
                const total = filteredCertificates.length;
                let offset = index - activeCarouselIndex;
                
                // Wrap around distance for circular 3D carousel
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const isActive = offset === 0;
                const isFlipped = !!flippedCards[cert.id];
                const pdfPath = cert.file || cert.fileUrl;

                // 3D Cylinder Spatial Math
                const rotateY = Math.max(-60, Math.min(60, offset * 25));
                const translateX = offset * 270;
                const translateZ = isActive ? 90 : -Math.abs(offset) * 120;
                const opacity = Math.max(0, 1 - Math.abs(offset) * 0.35);
                const scale = isActive ? 1.05 : Math.max(0.75, 1 - Math.abs(offset) * 0.15);

                if (Math.abs(offset) > 2) return null; // Hide far cards for performance

                return (
                  <div
                    key={cert.id}
                    onClick={() => {
                      if (!isActive) setActiveCarouselIndex(index);
                    }}
                    className="absolute w-[330px] sm:w-[380px] h-[440px] cursor-pointer transition-all duration-500 ease-out"
                    style={{
                      transform: `translate3d(${translateX}px, 0px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity: opacity,
                      zIndex: 20 - Math.abs(offset)
                    }}
                  >
                    <div
                      className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d ${
                        isFlipped ? 'rotate-y-180' : ''
                      }`}
                    >
                      {/* FRONT CARD FACE WITH LIVE DOCUMENT PREVIEW THUMBNAIL */}
                      <div className={`absolute inset-0 w-full h-full glass-card rounded-3xl p-5 border shadow-2xl flex flex-col justify-between backface-hidden transition duration-300 ${
                        isActive ? 'border-cyan-500/80 shadow-cyan-500/25 bg-slate-900/95' : 'border-slate-800 bg-slate-950/80'
                      }`}>
                        <div>
                          {/* Top Badges */}
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 text-xs font-mono font-semibold border border-cyan-800">
                              {cert.category}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{cert.date}</span>
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-white leading-snug mb-1 truncate">
                            {cert.title}
                          </h3>
                          <div className="text-xs font-medium text-cyan-400 mb-2 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Issued by {cert.issuer}</span>
                          </div>

                          {/* LIVE DOCUMENT PREVIEW THUMBNAIL BOX */}
                          <div className="w-full h-44 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden relative group/thumb my-1 shadow-inner">
                            {pdfPath ? (
                              <iframe
                                src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0`}
                                title={cert.title}
                                className="w-full h-full border-0 pointer-events-none scale-100 opacity-90 group-hover/thumb:opacity-100 transition duration-300"
                              />
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                                <Award className="w-12 h-12 text-cyan-400 mb-2 animate-bounce" />
                                <span className="text-xs font-bold text-white">Verified Certificate Plate</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none"></div>
                          </div>
                        </div>

                        {/* Front Card Footer Bar */}
                        <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCertificateModal(cert);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Full Document</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => toggleDoorFlip(cert.id, e)}
                            className="p-2 rounded-xl bg-slate-950 text-cyan-300 border border-slate-800 hover:border-cyan-500/50 transition"
                            title="Flip 3D Card"
                          >
                            <Repeat className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* BACK CARD FACE (REVEALED ON 3D FLIP) */}
                      <div className="absolute inset-0 w-full h-full glass-card rounded-3xl p-6 border-2 border-cyan-500/70 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180 bg-slate-900/95">
                        <div>
                          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Verified Credential Record</span>
                            <button
                              type="button"
                              onClick={(e) => toggleDoorFlip(cert.id, e)}
                              className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                            >
                              <RotateCcw className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <h4 className="text-sm font-bold text-white mb-2">{cert.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed mb-3">
                            {cert.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {cert.tags.map((tag, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-300 text-[10px] font-mono border border-slate-800">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveCertificateModal(cert);
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview PDF</span>
                          </button>

                          {pdfPath && (
                            <a
                              href={pdfPath}
                              download
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                              title="Download PDF"
                            >
                              <Download className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}

            </div>

            {/* Character Carousel Indicator Bar */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-xs font-mono text-slate-400">
                Plate {activeCarouselIndex + 1} of {filteredCertificates.length}
              </span>
            </div>

          </div>
        ) : (
          <div className="py-12 text-center glass-card rounded-3xl border border-slate-800">
            <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No certificate plates match your query</h3>
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
              {(activeCertificateModal.file || activeCertificateModal.fileUrl) ? (
                <iframe
                  src={activeCertificateModal.file || activeCertificateModal.fileUrl}
                  title={activeCertificateModal.title}
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <Award className="w-16 h-16 text-cyan-400 mb-4 animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Verified Certificate Document</h4>
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
                {(activeCertificateModal.file || activeCertificateModal.fileUrl) && (
                  <a
                    href={activeCertificateModal.file || activeCertificateModal.fileUrl}
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
