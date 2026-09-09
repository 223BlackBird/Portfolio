"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { Container } from "../ui/Container";
import { DynamicIcon } from "../ui/IconHelper";
import { Copy, Check, Send, Mail, ArrowUpRight } from "lucide-react";

export function Contact() {
  const { contact } = portfolioData;
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.directEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.message) return;
    
    // Construct mailto link as fallback or show success message
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name || "Colleague"}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${contact.directEmail}?subject=${subject}&body=${body}`;

    setFormSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative bg-grid-pattern bg-radial-vignette">
      <Container size="narrow">
        <div className="text-center space-y-4 mb-12">
          <span className="font-mono text-xs uppercase tracking-wider text-emerald-400 font-semibold px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 inline-block">
            GET IN TOUCH
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            {contact.title}
          </h2>
          <p className="text-base sm:text-lg text-zinc-300 max-w-xl mx-auto font-normal">
            {contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Direct Channels & Copy Card */}
          <div className="md:col-span-5 space-y-4">
            {/* Quick Copy Email Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/[0.08] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 uppercase">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>Direct Email</span>
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-zinc-200 truncate">
                  {contact.directEmail}
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>{contact.statusText}</span>
                {copied && <span className="text-emerald-400">Copied to clipboard!</span>}
              </div>
            </div>

            {/* Social Links List */}
            <div className="space-y-2">
              {contact.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-zinc-900/40 hover:bg-zinc-800/80 border border-white/[0.06] hover:border-white/[0.12] transition-colors flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/90 flex items-center justify-center text-zinc-300 group-hover:text-emerald-400 transition-colors">
                      <DynamicIcon name={social.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-zinc-200">
                        {social.name}
                      </div>
                      <div className="text-[11px] font-mono text-zinc-500">
                        {social.username}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-zinc-200 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Message Form */}
          <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-zinc-900/50 border border-white/[0.08] shadow-xl">
            {formSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-100">
                  Opening your email client...
                </h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  If your email app didn&apos;t open automatically, you can write directly to{" "}
                  <span className="text-emerald-400 font-mono">{contact.directEmail}</span>.
                </p>
                <button
                  type="button"
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-mono text-zinc-400 hover:text-zinc-200 underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono text-zinc-400"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:border-emerald-500/80 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono text-zinc-400"
                    >
                      Your Email *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="jane@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:border-emerald-500/80 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono text-zinc-400"
                  >
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Tell me about your project, idea, or role..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-zinc-100 placeholder:text-zinc-600 text-sm focus:border-emerald-500/80 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-medium text-sm text-zinc-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-950/40"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
