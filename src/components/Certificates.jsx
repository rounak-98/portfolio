import React, { useState } from 'react';
import { CERTIFICATES } from '../data/portfolioData';
import { Award, FileText, Search, ExternalLink, Download, X, Sparkles, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Certificates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCertificateModal, setActiveCertificateModal] = useState(null);

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

  return (
    <section id="certificates" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Verified Learning Achievements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            19+ Professional <span className="gradient-text">Certificates</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-base">
            Browse my verified credentials from NPTEL, OpenAI Developer Community, Deep Learning Labs, Agile Alliance, and leading AI research academies. Click any certificate to preview the official PDF document.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
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

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, issuer, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl glass-card text-sm text-slate-100 placeholder-slate-400 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert) => (
            <div
              key={cert.id}
              className="glass-card rounded-3xl p-6 border border-slate-800/90 shadow-xl flex flex-col justify-between group hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Header tags */}
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

                {/* Certificate Icon & Title */}
                <div className="flex items-start gap-3 my-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-tr from-slate-900 to-indigo-950 text-cyan-400 border border-slate-800 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="text-xs text-indigo-300 font-medium mt-0.5">{cert.issuer}</p>
                  </div>
                </div>

                {/* Highlight Tag */}
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>{cert.highlight}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 rounded-md bg-slate-900/80 text-slate-400 text-[11px] font-mono border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCertificateModal(cert)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 text-cyan-300 font-semibold text-xs border border-cyan-500/30 hover:bg-cyan-500/20 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview PDF</span>
                </button>

                <a
                  href={cert.file}
                  download
                  className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-cyan-500/40 transition"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>

            </div>
          ))}
        </div>

        {filteredCertificates.length === 0 && (
          <div className="text-center py-12 glass-card rounded-3xl border border-slate-800">
            <p className="text-slate-400 text-base">No certificates found matching your query.</p>
          </div>
        )}

      </div>

      {/* PDF Lightbox Preview Modal */}
      {activeCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="glass-card max-w-4xl w-full h-[85vh] rounded-3xl p-6 border border-slate-700 shadow-2xl flex flex-col justify-between relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{activeCertificateModal.title}</h3>
                  <p className="text-xs text-cyan-400 font-mono">{activeCertificateModal.issuer} • {activeCertificateModal.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeCertificateModal.file}
                  download
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-xs shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>

                <button
                  onClick={() => setActiveCertificateModal(null)}
                  className="p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer Frame */}
            <div className="flex-1 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
              <iframe
                src={activeCertificateModal.file}
                title={activeCertificateModal.title}
                className="w-full h-full border-none"
              />
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Category: {activeCertificateModal.category}</span>
              <a
                href={activeCertificateModal.file}
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>Open in New Tab</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
