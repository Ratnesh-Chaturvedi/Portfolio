
import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const EmailForm = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [message,setMessage]=useState('');
  const buttonRef = useRef(null);
  const formRef = useRef(null);

  // Magnetic effect
  const handleMouseMove = (e) => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const button = buttonRef.current;
    button.style.transform = `translate(0, 0)`;
  };

const handleSubmit=async(e)=>{
    e.preventDefault();
    
    emailjs.sendForm(
      import.meta.env.VITE_EMAIL_SERVICE_ID,
      import.meta.env.VITE_EMAIL_TEMPLATE_ID,
      formRef.current,  
      import.meta.env.VITE_EMAIL_PUBLIC_KEY,
    ).then(()=>{
      alert("Mail sent successfully");
      setName('');
      setEmail('');
      setMessage('');
    }).catch((error)=>{
      alert("Failed to send mail, please try again later");
      console.error(error);
    })
    
   
  }

  return (
    <div className="w-full  flex justify-end items-end lg:items-center h-full px-6 lg:px-2">
      <div className="w-full max-w-md backdrop-blur-xl rounded-2xl shadow-xl p-6  lg:p-8">

        
        <div className="lg:mb-8 mb-3 group">
          <h2 className="text-3xl lg:text-4xl font-[tango] text-[#3860f0] leading-tight inline-block relative">
            Get in
            <span className="font-[billiondream] text-[#f05438] ml-2">
              Touch
            </span>

            {/* Animated underline */}
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-gradient-to-r from-[#3860f0] to-[#f05438] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
          </h2>

          <p className="mt-3 text-sm font-[lekas] text-[#121111]/70">
            Have an idea or a project? Let’s talk.
          </p>
        </div>

    
        <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-6">

          <div className="flex flex-col lg:gap-2 gap-1">
            <label className="text-sm font-[lekas] text-[#121111]">Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name}
              type="text"
              name="from_name"
              placeholder="Your name"
              required
              className="w-full bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

          <div className="flex flex-col lg:gap-2">
            <label className="text-sm font-[lekas] text-[#121111]">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)}
              type="email"
              name="from_email"
              value={email}
              required
              placeholder="you@example.com"
              className="w-full bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

        
          <div className="flex flex-col lg:gap-2 ">
            <label className="text-sm font-[lekas] text-[#121111]">Message</label>
            <textarea onChange={(e)=>setMessage(e.target.value)}
              rows="2"
              required
              value={message}
              name="message"
              placeholder="Tell me about your idea..."
              className="w-full resize bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

          <button
            ref={buttonRef}
            type="submit"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mt-4 relative overflow-hidden rounded-full bg-[#3860f0] px-6 py-3 font-[lekas] text-white transition-all hover:bg-[#f05438] cursor-pointer"
          >
            <span className="relative z-10">Send Message</span>
            <span className="absolute inset-0 bg-[#f05438] translate-y-full transition-transform group-hover:translate-y-0"></span>
          </button>

        </form>
      </div>
    </div>
  );
};

export default EmailForm;
