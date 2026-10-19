import React from "react";
import Card from "./Card";
import { featuresData } from "@/data/features"; // تأكد من مسار الاستيراد الصحيح
import { TextAnimate } from "./ui/text-animate";

const CardPage = () => {
  return (
    <>
      <TextAnimate className="text-6xl font-bold" animation="blurIn" as="h1">
        Features
      </TextAnimate>
      <div className="mt-16 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {featuresData.map((feature) => (
          <Card
            key={feature.id}
            title={feature.title}
            description={feature.description}
            Icon={feature.icon}
          />
        ))}
      </div>
    </>
  );
};

export default CardPage;
