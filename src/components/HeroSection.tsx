import { AuroraText } from "@/components/ui/aurora-text";
import { Button } from "@/components/ui/button";
import HeroBackground from "./HeroBackground";

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      {/* 1. الخلفية */}
      <HeroBackground />

      {/* 2. تدرج خفيف في أسفل الهيرو ليندمج مع القسم التالي */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-50 to-transparent dark:from-black" />

      {/* 3. المحتوى (pointer-events-none حتى يصل الماوس إلى الخلفية) */}
      <div className="pointer-events-none relative z-10 px-4  text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl lg:text-6xl">
            Master Your Money with <br className="hidden md:block" />
            <AuroraText>Intelligent AI Insights</AuroraText>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 md:text-xl">
            Stop guessing where your money goes. Track expenses automatically,
            predict future cash flow, and make smarter financial decisions in
            real-time, all powered by your personal AI financial advisor.
          </p>
        </div>

        {/* الأزرار تعيد تفعيل الماوس حتى يمكن الضغط عليها */}
        <div className="pointer-events-auto flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="w-full bg-sky-600 text-white hover:bg-sky-700 sm:w-auto"
          >
            Get Started
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full border-slate-300 dark:border-slate-700 dark:text-slate-300 sm:w-auto"
          >
            See Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
