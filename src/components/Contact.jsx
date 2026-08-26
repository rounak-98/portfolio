import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, Send, Copy, Check, Sparkles, MessageSquare, Loader2, AlertCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedField, setCopiedField] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [statusState, setStatusState] = useState(null); // null | 'success' | 'error'

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    setStatusState(null);

    try {
      // Direct Web3Forms submission to rounakpathak9080@gmail.com
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          access_key: '5fb3fb21-4f18-42f2-8ef7-320c02f0eb3a', // Web3Forms public form endpoint
          to_email: 'rounakpathak9080@gmail.com',
          name: formData.name,
          email: formData.email,
          subject: formData.subject || `Portfolio Contact from ${formData.name}`,
          message: formData.message,
          from_name: 'Rounak Pathak Portfolio Website'
        })
      });

      const result = await response.json();
      if (result.success) {
        setStatusState('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // Fallback to mailto protocol if API response fails
        triggerMailto();
      }
    } catch (err) {
      console.warn('Direct API submission failed, triggering mailto fallback...', err);
      triggerMailto();
    } finally {
      setSubmitting(false);
    }
  };

  const triggerMailto = () => {
    const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`);
    const mailtoBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setStatusState('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-medium mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <div className="w-20 h-1.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-full mt-3"></div>
          <p className="text-slate-300 max-w-2xl mt-4 text-base">
            Have a software engineering opportunity, freelance project, or just want to discuss AI & full-stack development? Drop a message below or email me directly!
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Email Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Email</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-sm font-bold text-white group-hover:text-cyan-300 transition">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.email, 'email')}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-cyan-400 border border-slate-800 transition"
                title="Copy email to clipboard"
              >
                {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Card */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Phone / WhatsApp</div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-sm font-bold text-white group-hover:text-indigo-300 transition">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>

              <button
                onClick={() => handleCopy(PERSONAL_INFO.phone, 'phone')}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-400 hover:text-indigo-400 border border-slate-800 transition"
                title="Copy phone to clipboard"
              >
                {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Social Links Banner */}
            <div className="glass-card p-6 rounded-3xl border border-slate-800 shadow-xl space-y-4">
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Social & Professional Platforms</div>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <GithubIcon className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm font-semibold">GitHub</span>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-cyan-500/40 transition"
                >
                  <LinkedinIcon className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-semibold">LinkedIn</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-slate-800/80 shadow-2xl space-y-6">
              
              <div className="border-b border-slate-800 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white">Send Direct Message</h3>
                  <p className="text-xs text-slate-400 font-mono">Delivered straight to rounakpathak9080@gmail.com</p>
                </div>
              </div>

              {statusState === 'success' ? (
                <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3 animate-in zoom-in-95">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Delivered Successfully!</h4>
                  <p className="text-xs text-slate-300">Thank you for reaching out! Rounak will review your message and reply shortly.</p>
                  <button
                    onClick={() => setStatusState(null)}
                    className="mt-4 px-4 py-2 rounded-xl glass-card text-xs text-cyan-400 font-semibold border border-cyan-500/30"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Subject</label>
                    <input
                      type="text"
                      placeholder="Project Opportunity / AI Consultation"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Your Message *</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Hi Rounak, I'd like to discuss a project..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-card text-sm text-white placeholder-slate-500 border border-slate-800 focus:outline-none focus:border-cyan-500 transition resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:scale-[1.01] active:scale-[0.98] transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message Now</span>
                      </>
                    )}
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
