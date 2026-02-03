import React from "react";

const SimplePreloader = () => {
  return (
    <div className="fixed bg-[#121111] h-screen w-screen  flex items-center justify-center z-100">
      <div className="flex flex-col items-center justify-center">
       
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-[tango] mb-6 tracking-widest text-center">
        <span className="font-[#f05030]">Driven</span>  <br /> by  <br /><span className="text-[#f05030]">Curiosity</span>
        </h1>

        <div className="flex space-x-2">
          <span className="w-4 h-4 bg-[#f05030] rounded-full animate-bounce delay-0"></span>
          <span className="w-4 h-4 bg-white rounded-full animate-bounce delay-150"></span>
          <span className="w-4 h-4 bg-[#f05030] rounded-full animate-bounce delay-300"></span>
        </div>
      </div>
    </div>
  );
};

export default SimplePreloader;
