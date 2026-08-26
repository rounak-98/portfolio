import React, { useState, useEffect } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Award, FileText, Search, ExternalLink, Download, X, Sparkles, Eye, CheckCircle2, ShieldCheck, ChevronLeft, ChevronRight, RotateCcw, Repeat } from 'lucide-react';

export const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [flippedCards, setFlippedCards] = useState({}); // track 3D door flips

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
            <Award className="w-4 h-4 text-cyan-400" />
            <span>ThreeUI 3D Rotating Door Certificate Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            19+ Verified <span className="gradient-text">Certificates</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Click any certificate card or the 3D Door handle to rotate the card in 3D space, revealing verified credential data and PDF documents!
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
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
              placeholder="Search certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-card text-sm text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

        </div>

        {/* 3D ROTATING DOOR CERTIFICATE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert) => {
            const isFlipped = !!flippedCards[cert.id];

            return (
              <div
                key={cert.id}
                className="perspective-1000 h-[340px] w-full cursor-pointer group"
                onClick={(e) => toggleDoorFlip(cert.id, e)}
              >
                <div
                  className={`relative w-full h-full rounded-3xl transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT 3D DOOR FACE */}
                  <div className="absolute inset-0 w-full h-full glass-card rounded-3xl p-6 border border-slate-800 shadow-2xl flex flex-col justify-between backface-hidden group-hover:border-cyan-500/50 transition duration-300">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-xs font-mono font-medium border border-cyan-800/80">
                          {cert.category}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{cert.date}</span>
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-tight mb-2 group-hover:text-cyan-300 transition">
                        {cert.title}
                      </h3>
                      <div className="text-xs font-semibold text-cyan-400 mb-3 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Issued by {cert.issuer}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-mono text-slate-400">Click card to rotate 3D door</span>
                      <button
                        type="button"
                        onClick={(e) => toggleDoorFlip(cert.id, e)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 hover:bg-cyan-500/30 transition"
                      >
                        <Repeat className="w-3.5 h-3.5" />
                        <span>Flip 3D Door &rarr;</span>
                      </button>
                    </div>
                  </div>

                  {/* BACK 3D DOOR FACE (REVEALED ON 3D ROTATION) */}
                  <div className="absolute inset-0 w-full h-full glass-card rounded-3xl p-6 border-2 border-cyan-500/60 shadow-2xl flex flex-col justify-between backface-hidden rotate-y-180 bg-slate-900/95">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
                        <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">Verified Credential Details</span>
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
                        <span>Preview Official PDF</span>
                      </button>

                      {cert.fileUrl && (
                        <a
                          href={cert.fileUrl}
                          download
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-xl bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                          title="Download PDF File"
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
