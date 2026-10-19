import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

const Home = () => {
  return (
    <main className="bg-slate-50 transition-colors duration-300 dark:bg-black">
      <HeroSection />
      <FeaturesSection />
    </main>
  );
};

export default Home;
