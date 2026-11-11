import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "./Button";

const INQUIRY_TOPICS = [
  { id: "fulltime", label: "Full-Time Role", icon: "ri-briefcase-line" },
  { id: "freelance", label: "Freelance Project", icon: "ri-code-box-line" },
  { id: "ai", label: "AI & Full-Stack", icon: "ri-sparkling-fill" },
  { id: "chat", label: "Coffee & Chat 👋", icon: "ri-chat-smile-2-line" },
];

/**
 * EmailForm
 * 
 * Luxury Studio Terminal Contact Form:
 * - Obsidian glass macOS chrome matching the portfolio's Project & Hero aesthetics.
 * - Quick inquiry topic selectors for seamless UX.
 * - Dark high-contrast inputs with monospace indices (01, 02, 03).
 * - Full asynchronous feedback (in-place animated success/error states, zero native alerts).
 * - Fully accessible and resilient with mailto direct fallback.
 */
const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("fulltime");
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  const handleTopicClick = (topicId, topicLabel) => {
    setSelectedTopic(topicId);
    if (!message || message.startsWith("[Inquiry:")) {
      setMessage(`[Inquiry: ${topicLabel}]\n`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      );

      setStatus("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setErrorMessage("Service is temporarily unreachable. Please use the direct mailto link below.");
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setMessage("");
    setSelectedTopic("fulltime");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-[24px] sm:rounded-[28px] overflow-hidden bg-[#0d0d15]/90 backdrop-blur-xl border border-white/[0.09] shadow-[0_25px_60px_rgba(0,0,0,0.85)] flex flex-col transition-all duration-500">
      
      {/* =========================================================================
          1. LUXURY MACOS TERMINAL HEADER CHROME
          ========================================================================= */}
      <div className="h-11 px-4 sm:px-5 bg-[#12121e] border-b border-white/[0.07] flex items-center justify-between select-none">
        
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80 hover:bg-[#ff5f56] transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80 hover:bg-[#ffbd2e] transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80 hover:bg-[#27c93f] transition-colors" />
        </div>

        {/* Minimalist Terminal URL Badge */}
        <div className="flex items-center gap-2 px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] font-mono text-neutral-300 tracking-wider">
          <i className="ri-lock-line text-[10px] text-emerald-400" />
          <span>contact://send-message</span>
        </div>

        {/* Response SLA Badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
          <span className="hidden sm:inline">Resp. &lt; 24h</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>
      </div>

      {/* =========================================================================
          2. FORM BODY / DYNAMIC STATES
          ========================================================================= */}
      <div className="p-5 sm:p-7 md:p-8 flex-1 flex flex-col justify-between">
        
        {/* SUCCESS STATE */}
        {status === "success" ? (
          <div className="py-10 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl shadow-[0_0_30px_rgba(16,185,129,0.2)]">
              <i className="ri-check-line font-bold" />
            </div>

            <div>
              <h3 className="font-[tango] text-2xl text-white tracking-wide">
                Message Dispatched!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-normal mt-1.5 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, <span className="text-white font-medium">{name || "friend"}</span>. Your message has been routed to my personal inbox. I'll get back to you within 24 hours.
              </p>
            </div>

            <button
              onClick={handleReset}
              className="mt-4 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold text-neutral-300 bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/25 transition-all cursor-pointer"
            >
              ← Send Another Message
            </button>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            
            {/* Quick Topic Selectors */}
            <div>
              <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400 mb-2">
                What can I help you with?
              </label>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                {INQUIRY_TOPICS.map((topic) => {
                  const isSelected = selectedTopic === topic.id;
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => handleTopicClick(topic.id, topic.label)}
                      className={`px-3 py-1.5 rounded-lg font-mono text-[11px] sm:text-xs flex items-center gap-1.5 border transition-all duration-200 cursor-pointer text-left ${
                        isSelected
                          ? "bg-[#f05038]/15 border-[#f05038] text-white shadow-[0_0_15px_rgba(240,80,56,0.2)]"
                          : "bg-white/[0.03] border-white/[0.08] text-neutral-400 hover:text-white hover:border-white/20"
                      }`}
                    >
                      <i className={`${topic.icon} text-xs text-[#f05038]`} />
                      <span>{topic.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Field 01: Name */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                  01 / Your Name <span className="text-[#f05038]">*</span>
                </label>
              </div>
              <input
                type="text"
                name="name"
                placeholder="e.g. Alex Mercer"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#f05038] focus:bg-white/[0.06] outline-none text-white placeholder:text-neutral-600 text-sm font-sans transition-all"
              />
            </div>

            {/* Field 02: Email */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                  02 / Your Email <span className="text-[#f05038]">*</span>
                </label>
              </div>
              <input
                type="email"
                name="email"
                placeholder="e.g. alex@studio.design"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#f05038] focus:bg-white/[0.06] outline-none text-white placeholder:text-neutral-600 text-sm font-sans transition-all"
              />
            </div>

            {/* Field 03: Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-neutral-400">
                  03 / Project Scope &amp; Details <span className="text-[#f05038]">*</span>
                </label>
              </div>
              <textarea
                rows="4"
                required
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell me about your product vision, timeline, or engineering opportunity..."
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/[0.08] focus:border-[#f05038] focus:bg-white/[0.06] outline-none text-white placeholder:text-neutral-600 text-sm font-sans resize-none transition-all"
              />
            </div>

            {/* Error Message with Mailto Fallback */}
            {status === "error" && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span>{errorMessage}</span>
                <a
                  href={`mailto:chaturvediratnesh16@gmail.com?subject=Portfolio%20Inquiry%20from%20${encodeURIComponent(name || 'Visitor')}&body=${encodeURIComponent(message)}`}
                  className="font-bold underline text-white hover:text-rose-200 shrink-0"
                >
                  Send via Mail App ↗
                </a>
              </div>
            )}

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <Button
                type="submit"
                isButton={true}
                disabled={status === "submitting"}
                content={status === "submitting" ? "Transmitting..." : "Send Message"}
                hoverContent={status === "submitting" ? "TRANSMITTING..." : "DISPATCH NOW ✉"}
                variant="primary"
                size="md"
                className="w-full sm:w-auto"
                icon={
                  status === "submitting" ? (
                    <i className="ri-loader-4-line animate-spin text-sm" />
                  ) : (
                    <i className="ri-send-plane-fill text-sm" />
                  )
                }
              />

              <span className="text-[10px] font-mono text-neutral-500 text-center sm:text-right">
                Encrypted &bull; Direct to Inbox
              </span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

export default EmailForm;
