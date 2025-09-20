import { Sprout, Leaf } from "lucide-react";
import farmingHero from "@/assets/farming-hero.jpg";

export const Header = () => {
  return (
    <header 
      className="relative h-32 bg-gradient-hero shadow-soft overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${farmingHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sprout className="h-8 w-8 text-white animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              किसानमित्र - KisanMitra
            </h1>
            <Leaf className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-white/90 text-lg font-medium">
            Smart Farming Assistant | स्मार्ट कृषि सहायक | స్మార్ట్ వ్యవసాయ సహాయకుడు
          </p>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-farm-green via-sunshine-yellow to-harvest-orange opacity-80" />
    </header>
  );
};