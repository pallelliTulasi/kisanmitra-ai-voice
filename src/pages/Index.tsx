import { useState } from "react";
import { Header } from "@/components/Header";
import { LanguageSelector } from "@/components/LanguageSelector";
import { WeatherPanel } from "@/components/WeatherPanel";
import { AIAssistant } from "@/components/AIAssistant";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-farm-light-green/30">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel */}
          <div className="lg:col-span-1 space-y-6">
            <LanguageSelector onLanguageChange={setSelectedLanguage} />
            <WeatherPanel language={selectedLanguage} />
          </div>
          
          {/* Right Panel */}
          <div className="lg:col-span-2">
            <AIAssistant language={selectedLanguage} />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-12 py-6 bg-gradient-to-r from-farm-green/10 to-primary/10 border-t border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            KisanMitra © 2024 | Empowering Farmers with AI Technology | 
            <span className="ml-2">कृषि में AI की शक्ति</span> | 
            <span className="ml-2">వ్యవసాయంలో AI శక్తి</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
