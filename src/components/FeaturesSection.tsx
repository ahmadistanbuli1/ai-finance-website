import Card from "./Card";
import { featuresData } from "@/data/features";
import { TextAnimate } from "./ui/text-animate";

const FeaturesSection = () => {
  return (
    <section id="features" className="mx-auto w-full max-w-6xl px-4 py-24">
      <div className="mb-16 text-center">
        <TextAnimate
          className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl"
          animation="blurIn"
          as="h2"
        >
          Features
        </TextAnimate>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featuresData.map((feature) => (
          <Card
            key={feature.id}
            title={feature.title}
            description={feature.description}
            Icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
