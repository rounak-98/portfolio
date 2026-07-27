import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { FileText, Download, X, ExternalLink, Sparkles, CheckCircle } from 'lucide-react';

export const ResumeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="glass-card max-w-5xl w-full h-[90vh] rounded-3xl p-6 border border-slate-700 shadow-2xl flex flex-col justify-between relative">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Rounak Pathak - Official Resume</h3>
              <p className="text-xs text-cyan-400 font-mono">B.Tech Computer Science • Concise Resume PDF</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={PERSONAL_INFO.resumePath}
              download="Rounak_Pathak_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-cyan-500/25 hover:shadow-cyan-500/40 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Document Viewer */}
        <div className="flex-1 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 relative">
          <iframe
            src={PERSONAL_INFO.resumePath}
            title="Rounak Pathak Resume PDF"
            className="w-full h-full border-none"
          />
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Updated 2026 • Verified Resume Document</span>
          </div>
          <a
            href={PERSONAL_INFO.resumePath}
            target="_blank"
            rel="noreferrer"
            className="text-cyan-400 hover:underline flex items-center gap-1"
          >
            <span>Open in Full Tab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
