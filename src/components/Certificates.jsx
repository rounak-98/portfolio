import React, { useState, useEffect } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Award, FileText, Search, ExternalLink, Download, X, Sparkles, Eye, CheckCircle2, ShieldCheck, ChevronLeft, ChevronRight, Layers, LayoutGrid } from 'lucide-react';

export const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('spatial'); // 'spatial' | 'grid'

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

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory, searchQuery]);

  const handleNext = () => {
    if (filteredCertificates.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredCertificates.length);
  };

  const handlePrev = () => {
    if (filteredCertificates.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredCertificates.length) % filteredCertificates.length);
  };

  const activeCert = filteredCertificates[currentIndex] || filteredCertificates[0];

  return (
    <section id="certificates" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3 shadow-sm">
            <Award className="w-4 h-4" />
            <span>Verified Credentials & Spatial Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            19+ Professional <span className="gradient-text">Certificates</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-sm sm:text-base">
            Verified credentials from NPTEL, OpenAI Developer Community, Deep Learning Labs, Agile Alliance, and leading AI research academies. Rendered in a ThreeUI-inspired 3D spatial deck.
          </p>
        </div>

        {/* Filter Controls & View Switcher Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Badges */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20'
                    : 'glass-card text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box & View Mode Toggle */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
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

            {/* View Mode Toggle */}
            <div className="flex items-center glass-card p-1 rounded-xl border border-slate-800 shrink-0">
              <button
                onClick={() => setViewMode('spatial')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  viewMode === 'spatial' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
                title="3D Spatial Carousel View"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden sm:inline">3D Deck</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>

        </div>

        {/* 3D SPATIAL DECK VIEW */}
        {viewMode === 'spatial' && filteredCertificates.length > 0 && activeCert && (
          <div className="relative flex flex-col items-center my-6">
            
            {/* 3D Card Deck Perspective Stage */}
            <div className="relative w-full max-w-3xl min-h-[380px] sm:min-h-[420px] flex items-center justify-center p-4">
              
              {/* Active Spatial Card Focus */}
              <div className="w-full glass-card rounded-3xl p-6 sm:p-8 border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between transition-all duration-500 relative z-20 transform scale-100 hover:border-cyan-400">
                
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-cyan-950/80 text-cyan-300 text-xs font-mono font-medium border border-cyan-800/80 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{activeCert.category}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400 text-xs font-mono">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{activeCert.date}</span>
                  </span>
                </div>

                {/* Title & Issuer */}
                <div className="space-y-3 my-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                    {activeCert.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-indigo-400">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <span>Issued by {activeCert.issuer}</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {activeCert.description}
                  </p>
                </div>

                {/* Tag Pills */}
                <div className="flex flex-wrap gap-2 my-3">
                  {activeCert.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-900/90 text-slate-300 text-xs font-mono border border-slate-800"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 mt-2">
                  <div className="text-xs text-slate-400 font-mono">
                    Certificate #{currentIndex + 1} of {filteredCertificates.length}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCertificateModal(activeCert)}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-md hover:scale-105 transition"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Preview PDF Document</span>
                    </button>
                    {activeCert.fileUrl && (
                      <a
                        href={activeCert.fileUrl}
                        download
                        className="p-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:scale-110 transition"
                        title="Download Certificate File"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>

            </div>

            {/* Spatial Navigation Bar */}
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={handlePrev}
                className="p-3 rounded-full glass-card text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 border border-slate-800 transition shadow-lg active:scale-95"
                title="Previous Certificate"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-1.5 max-w-[200px] overflow-x-auto no-scrollbar px-2 py-1">
                {filteredCertificates.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? 'w-6 bg-cyan-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-3 rounded-full glass-card text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 border border-slate-800 transition shadow-lg active:scale-95"
                title="Next Certificate"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

          </div>
        )}

        {/* GRID VIEW FALLBACK */}
        {(viewMode === 'grid' || filteredCertificates.length === 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            {filteredCertificates.length === 0 ? (
              <div className="col-span-full py-12 text-center glass-card rounded-3xl border border-slate-800">
                <FileText className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white">No certificates match your filter</h3>
                <p className="text-slate-400 text-sm mt-1">Try clearing your search query or selecting "All" categories.</p>
              </div>
            ) : (
              filteredCertificates.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-400 text-xs font-mono border border-cyan-800/60">
                        {cert.category}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400 text-xs font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{cert.date}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-medium text-indigo-400 mb-3">
                      Issued by {cert.issuer}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {cert.description}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {cert.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-900 text-slate-400 text-[10px] font-mono border border-slate-800"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => setActiveCertificateModal(cert)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Preview Certificate</span>
                      </button>

                      {cert.fileUrl && (
                        <a
                          href={cert.fileUrl}
                          download
                          className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                          title="Download Certificate File"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
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
                <div className="text-xs text-indigo-400 font-medium">Issued by {activeCertificateModal.issuer} • {activeCertificateModal.date}</div>
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
                    This official certificate is verified on file for {activeCertificateModal.issuer}.
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
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-md"
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
