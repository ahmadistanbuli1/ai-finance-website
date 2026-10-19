"use client";

import SoftAurora from "./SoftAurora";

// خلفية الهيرو: تملأ القسم كاملاً (absolute + inset-0)
const HeroBackground = () => {
  return (
    <div className="absolute inset-0">
      <SoftAurora
        speed={0.6}
        scale={1.5}
        brightness={1}
        color1="#3b82f6"
        color2="#3b82f6"
        bandHeight={0.5}
        bandSpread={1}
        enableMouseInteraction
        mouseInfluence={0.25}
        spectrum={1}
        colorSpeed={1}
        noiseFrequency={2.5}
        noiseAmplitude={1}
        tilt={0}
        octaveDecay={0.1}
        layerOffset={0}
        clickPulse
        intro
        lightMode={false}
      />
    </div>
  );
};

export default HeroBackground;
