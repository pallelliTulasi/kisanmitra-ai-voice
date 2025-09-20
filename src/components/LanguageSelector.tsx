import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  onLanguageChange: (language: string) => void;
}

export const LanguageSelector = ({ onLanguageChange }: LanguageSelectorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  const languages = [
    { id: "english", label: "English", native: "English" },
    { id: "hindi", label: "Hindi", native: "हिंदी" },
    { id: "telugu", label: "Telugu", native: "తెలుగు" },
  ];

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  return (
    <Card className="p-4 shadow-card bg-gradient-to-br from-background to-secondary/30">
      <div className="flex items-center gap-2 mb-3">
        <Globe className="h-5 w-5 text-primary" />
        <Label className="font-semibold text-foreground">Language / भाषा / భాష</Label>
      </div>
      <div className="space-y-2">
        {languages.map((language) => (
          <div key={language.id} className="flex items-center space-x-2">
            <input
              type="radio"
              id={language.id}
              name="language"
              value={language.id}
              checked={selectedLanguage === language.id}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-4 h-4 text-primary bg-background border-2 border-primary focus:ring-primary focus:ring-2 transition-all duration-300"
            />
            <Label 
              htmlFor={language.id} 
              className="cursor-pointer text-sm font-medium text-foreground hover:text-primary transition-colors duration-300"
            >
              {language.native}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};