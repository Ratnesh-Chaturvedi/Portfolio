
import SkillCard from "../components/SkillCard";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";

const Skillpage = () => {
useGSAP(() => {
  ScrollTrigger.create({
    trigger: ".sectionContianer",
    start: "top top",
    end: "bottom 10%",
    scrub: true,
    pin: ".pintextskill",
    pinSpacing: false, // 🔑 VERY IMPORTANT
  });
});


  const iconStyle = "h-10 sm:h-14 md:h-16  ";

  return (
    <section className="sectionContianer min-h-screen min-w-screen  bg-[#121111] px-4 py-10 relative border-b-3 border-[#222020] ">
      <p className="pintextskill absolute  top-4 left-4 font-[tango] text-xl text-[#f05038] z-10">
        #skills
      </p>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
        <SkillCard title="Frontend" color="bg-[#0ae448]">
          <img className={iconStyle} src="/src/assets/images/html.png"  />
          <img className={iconStyle} src="/src/assets/images/css.webp" />
          <img className={iconStyle} src="/src/assets/images/js.webp" />
          <img className={iconStyle} src="/src/assets/images/tailwind.webp" />
          <img className="h-10 sm:h-23 " src="/src/assets/images/react.png" />
        </SkillCard>

        <SkillCard title="Backend" color="bg-[#880d1e]">
          <img
            className={` sm:h-25 h-15 `}
            src="/src/assets/images/nodejs.webp"
          />
          <img className={iconStyle} src="/src/assets/images/Express.png" />
        </SkillCard>

        <SkillCard title="Database & BaaS" color="bg-[#fec5fb]">
          <img
            className={iconStyle}
            src="/src/assets/images/mongodb-logo.webp"
          />
          <img className={iconStyle} src="/src/assets/images/appwrite.png" />
          <img className={iconStyle} src="/src/assets/images/supabase.svg" />
        </SkillCard>

        <SkillCard title="Animations" color="bg-[#ffc300]">
          <img
            className={`${iconStyle} rounded-full`}
            src="/src/assets/images/framer.png"
          />
          <img className={iconStyle} src="/src/assets/images/gsap.png" />
        </SkillCard>

        <SkillCard title="Developer Experience" color="bg-[#fb8500]">
          <img className={iconStyle} src="/src/assets/images/git.png" />
          <img className={iconStyle} src="/src/assets/images/github.svg" />
          <img
            className={`${iconStyle} rounded-full`}
            src="/src/assets/images/postman.png"
          />
        </SkillCard>

        <SkillCard title="Languages" color="bg-[#05668d]">
          <img className={iconStyle} src="/src/assets/images/js3d.png" />
          <img className={iconStyle} src="/src/assets/images/c.webp" />
          <img className={iconStyle} src="/src/assets/images/c++.png" />
          <img className={iconStyle} src="/src/assets/images/python.webp" />
          <img className={iconStyle} src="/src/assets/images/java.png" />
        </SkillCard>

        <SkillCard title="Deployment & Hosting" color="bg-[#bc8a5f]">
          <img className="h-8 sm:h-10" src="/src/assets/images/vercel.svg" />
        </SkillCard>
      </div>

      <div className="lasttext mt-12 text-center">
        <h1 className="font-[tango] tracking-wide   text-2xl md:text-3xl text-[#00bae2]">
          I'm still learning new skills 🚀
        </h1>
      </div>
    </section>
  );
};

export default Skillpage;
