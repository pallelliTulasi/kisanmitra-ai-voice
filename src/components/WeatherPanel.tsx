import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CloudSun, MapPin, Thermometer, Droplets, Wind } from "lucide-react";
import { toast } from "sonner";
import weatherIcon from "@/assets/weather-icon.jpg";

interface WeatherData {
  city: string;
  temperature: number;
  status: string;
  humidity: number;
  windSpeed: number;
}

interface WeatherPanelProps {
  language: string;
}

export const WeatherPanel = ({ language }: WeatherPanelProps) => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const translations = {
    english: {
      title: "Weather Forecast",
      cityLabel: "Enter City Name",
      getWeather: "Get Weather",
      temperature: "Temperature",
      status: "Weather Status",
      humidity: "Humidity",
      windSpeed: "Wind Speed",
      placeholder: "e.g., New Delhi, Mumbai, Hyderabad"
    },
    hindi: {
      title: "मौसम पूर्वानुमान",
      cityLabel: "शहर का नाम दर्ज करें",
      getWeather: "मौसम प्राप्त करें",
      temperature: "तापमान",
      status: "मौसम की स्थिति",
      humidity: "आर्द्रता",
      windSpeed: "हवा की गति",
      placeholder: "जैसे नई दिल्ली, मुंबई, हैदराबाद"
    },
    telugu: {
      title: "వాతావరణ అంచనా",
      cityLabel: "నగర పేరు నమోదు చేయండి",
      getWeather: "వాతావరణం పొందండి",
      temperature: "ఉష్ణోగ్రత",
      status: "వాతావరణ స్థితి",
      humidity: "తేమ",
      windSpeed: "గాలి వేగం",
      placeholder: "ఉదా., న్యూ ఢిల్లీ, ముంబై, హైదరాబాద్"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  const getWeather = async () => {
    if (!city.trim()) {
      toast.error("Please enter a city name");
      return;
    }

    setLoading(true);
    try {
      // Simulated weather data - in a real app, you'd call an actual weather API
      const mockWeatherData: WeatherData = {
        city: city,
        temperature: Math.floor(Math.random() * 20) + 15, // 15-35°C
        status: ["Sunny", "Partly Cloudy", "Cloudy", "Light Rain"][Math.floor(Math.random() * 4)],
        humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
      };

      setTimeout(() => {
        setWeather(mockWeatherData);
        setLoading(false);
        toast.success(`Weather data fetched for ${city}`);
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to fetch weather data");
    }
  };

  return (
    <Card className="shadow-card bg-gradient-to-br from-sky-blue/10 to-primary/5 border-sky-blue/20">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CloudSun className="h-6 w-6 text-sky-blue" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center mb-4">
          <img 
            src={weatherIcon} 
            alt="Weather" 
            className="w-20 h-20 rounded-lg shadow-soft object-cover"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm font-medium text-foreground">
            {t.cityLabel}
          </Label>
          <Input
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={t.placeholder}
            className="border-sky-blue/30 focus:border-sky-blue focus:ring-sky-blue/20"
            onKeyPress={(e) => e.key === 'Enter' && getWeather()}
          />
        </div>

        <Button 
          variant="weather" 
          className="w-full"
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : t.getWeather}
        </Button>

        {weather && (
          <div className="mt-6 p-4 rounded-lg bg-background/60 backdrop-blur-sm border border-sky-blue/20">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="h-4 w-4 text-sky-blue" />
              <h3 className="font-semibold text-foreground">{weather.city}</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-harvest-orange" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.temperature}</p>
                  <p className="font-semibold text-foreground">{weather.temperature}°C</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <CloudSun className="h-4 w-4 text-sky-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.status}</p>
                  <p className="font-semibold text-foreground">{weather.status}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-sky-blue" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.humidity}</p>
                  <p className="font-semibold text-foreground">{weather.humidity}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">{t.windSpeed}</p>
                  <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};