
import SkillCard from "../components/SkillCard";
import { useGSAP } from "@gsap/react";
import { imageAsset } from "../assets/images/imagesAsset";
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
          <img className={iconStyle} src={`${imageAsset.htmlImg}`}  />
          <img className={iconStyle} src={`${imageAsset.cssImg}`} />
          <img className={iconStyle} src={`${imageAsset.jsImg}`} />
          <img className={iconStyle} src={`${imageAsset.tailwindImg}`} />
          <img className="h-10 sm:h-23 " src={`${imageAsset.reactImg}`} />
        </SkillCard>

        <SkillCard title="Backend" color="bg-[#880d1e]">
          <img
            className={` sm:h-25 h-15 `}
            src={`${imageAsset.nodejsImg}`}
          />
          <img className={iconStyle} src={`${imageAsset.expressImg}`} />
        </SkillCard>

        <SkillCard title="Database & BaaS" color="bg-[#fec5fb]">
          <img
            className={iconStyle}
            src={`${imageAsset.mongodbImg}`}
          />
          <img className={iconStyle} src={`${imageAsset.appwriteImg}`} />
          <img className={iconStyle} src={`${imageAsset.supabaseImg}`} />
        </SkillCard>

        <SkillCard title="Animations" color="bg-[#ffc300]">
          <img
            className={`${iconStyle} rounded-full`}
            src={`${imageAsset.framerImg}`}
          />
          <img className={iconStyle} src={`${imageAsset.gsapImg}`} />
        </SkillCard>

        <SkillCard title="Developer Experience" color="bg-[#fb8500]">
          <img className={iconStyle} src={`${imageAsset.vscodeImg}`} />
          <img className={iconStyle} src={`${imageAsset.gitImg}`} />
          <img className={iconStyle} src={`${imageAsset.githubImg}`} />
          <img
            className={`${iconStyle} rounded-full`}
            src={`${imageAsset.postmanImg}`}
          />
        </SkillCard>

        <SkillCard title="Languages" color="bg-[#05668d]">
          <img className={iconStyle} src={`${imageAsset.jsImg}`} />
          <img className={iconStyle} src={`${imageAsset.cImg}`} />
          <img className={iconStyle} src={`${imageAsset.cppImg}`} />
          <img className={iconStyle} src={`${imageAsset.pythonImg}`} />
          <img className={iconStyle} src={`${imageAsset.javaImg}`} />
        </SkillCard>

        <SkillCard title="Deployment & Hosting" color="bg-[#bc8a5f]">
          <img className="h-8 sm:h-10" src={`${imageAsset.vercelImg}`} />
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
