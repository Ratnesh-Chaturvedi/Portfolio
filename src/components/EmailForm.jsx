import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Button from "./Button";

const EmailForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )
      .then(() => {
        alert("Mail sent successfully");
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        alert("Failed to send mail, please try again later");
        console.error(error);
      });
  };

  return (
    <div className="w-full flex justify-end items-end lg:items-center h-full px-6 lg:px-2">
      <div className="w-full max-w-md backdrop-blur-xl rounded-2xl shadow-xl p-6 lg:p-8">
        <div className="lg:mb-8 mb-3 group">
          <h2 className="text-3xl lg:text-4xl font-[tango] text-[#3860f0] leading-tight inline-block relative">
            Get in
            <span className="font-[billiondream] text-[#f05438] ml-2">
              Touch
            </span>

            {/* Animated underline */}
            <span className="absolute left-0 -bottom-2 h-1 w-full bg-gradient-to-r from-[#3860f0] to-[#f05438] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></span>
          </h2>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

          <div className="relative">
            <textarea
              rows="3"
              required
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name="message"
              placeholder="Tell me about your idea..."
              className="w-full resize bg-transparent border-b-2 border-[#3860f0]/40 focus:border-[#3860f0] outline-none py-2 text-[#121111] placeholder:text-[#121111]/40 transition-all"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              isButton={true}
              content="Send Message"
              hoverContent="SUBMIT NOW ✉"
              variant="primary"
              fillColor="#f05038"
              size="md"
              icon={<i className="ri-send-plane-fill" />}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
