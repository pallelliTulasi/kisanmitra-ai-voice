import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Upload, MessageCircle, Wheat, Beaker, Bug } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServicesPanelProps {
  language: string;
}

interface ServiceData {
  id: string;
  title: { english: string; hindi: string; telugu: string };
  description: { english: string; hindi: string; telugu: string };
  icon: React.ReactNode;
}

const services: ServiceData[] = [
  {
    id: "crop",
    title: {
      english: "Crop Recommendation",
      hindi: "फसल सुझाव",
      telugu: "పంట సిఫార్సు"
    },
    description: {
      english: "Get personalized crop recommendations based on soil conditions, weather, and location",
      hindi: "मिट्टी की स्थिति, मौसम और स्थान के आधार पर व्यक्तिगत फसल सुझाव प्राप्त करें",
      telugu: "నేల పరిస్థితులు, వాతావరణం మరియు ప్రాంతం ఆధారంగా వ్యక్తిగత పంట సిఫార్సులు పొందండి"
    },
    icon: <Wheat className="h-6 w-6" />
  },
  {
    id: "fertilizer",
    title: {
      english: "Fertilizer Recommendation", 
      hindi: "उर्वरक सुझाव",
      telugu: "ఎరువుల సిఫార్సు"
    },
    description: {
      english: "Get optimal fertilizer recommendations for better crop yield",
      hindi: "बेहतर फसल उत्पादन के लिए इष्टतम उर्वरक सुझाव प्राप्त करें",
      telugu: "మెరుగైన పంట దిగుబడి కోసం సరైన ఎరువుల సిఫార్సులు పొందండి"
    },
    icon: <Beaker className="h-6 w-6" />
  },
  {
    id: "disease",
    title: {
      english: "Disease Prediction",
      hindi: "रोग पूर्वानुमान", 
      telugu: "వ్యాధి అంచనా"
    },
    description: {
      english: "Identify plant diseases and get treatment recommendations",
      hindi: "पौधों की बीमारियों की पहचान करें और उपचार सुझाव प्राप्त करें",
      telugu: "మొక్కల వ్యాధులను గుర్తించి చికిత్స సిఫార్సులు పొందండి"
    },
    icon: <Bug className="h-6 w-6" />
  }
];

export const ServicesPanel = ({ language }: ServicesPanelProps) => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [textInput, setTextInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<string | null>(null);
  const { toast } = useToast();

  const getTranslation = (obj: { english: string; hindi: string; telugu: string }) => {
    return obj[language as keyof typeof obj] || obj.english;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: getTranslation({
          english: "Image uploaded successfully",
          hindi: "छवि सफलतापूर्वक अपलोड की गई",
          telugu: "చిత్రం విజయవంతంగా అప్‌లోడ్ చేయబడింది"
        }),
        description: file.name,
      });
    }
  };

  const analyzeInput = async () => {
    if (!activeService || (!textInput.trim() && !selectedFile)) {
      toast({
        title: getTranslation({
          english: "Please provide input",
          hindi: "कृपया इनपुट प्रदान करें",
          telugu: "దయచేసి ఇన్‌పుట్ అందించండి"
        }),
        description: getTranslation({
          english: "Either upload an image or provide text description",
          hindi: "या तो एक छवि अपलोड करें या पाठ विवरण प्रदान करें",
          telugu: "చిత్రాన్ని అప్‌లోడ్ చేయండి లేదా టెక్స్ట్ వర్ణన అందించండి"
        }),
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const service = services.find(s => s.id === activeService);
      let mockResults = "";
      
      if (activeService === "crop") {
        mockResults = getTranslation({
          english: "Based on your input, we recommend growing wheat and corn. The soil conditions appear suitable for cereal crops with proper irrigation.",
          hindi: "आपके इनपुट के आधार पर, हम गेहूं और मक्का उगाने की सलाह देते हैं। उचित सिंचाई के साथ मिट्टी की स्थिति अनाज की फसलों के लिए उपयुक्त दिखती है।",
          telugu: "మీ ఇన్‌పుట్ ఆధారంగా, మేము గోధుమలు మరియు మొక్కజొన్న పండించాలని సిఫార్సు చేస్తున్నాము. సరైన నీటిపారుదలతో నేల పరిస్థితులు ధాన్య పంటలకు అనుకూలంగా కనిపిస్తున్నాయి."
        });
      } else if (activeService === "fertilizer") {
        mockResults = getTranslation({
          english: "NPK fertilizer ratio 10-26-26 is recommended. Apply 150kg per hectare during planting season. Also consider organic compost for better soil health.",
          hindi: "NPK उर्वरक अनुपात 10-26-26 की सिफारिश की जाती है। रोपण के मौसम में प्रति हेक्टेयर 150 किलो लागू करें। मिट्टी के बेहतर स्वास्थ्य के लिए जैविक खाद भी पर विचार करें।",
          telugu: "NPK ఎరువుల నిష్పత్తి 10-26-26 సిఫార్సు చేయబడింది. నాటు కాలంలో హెక్టారుకు 150 కిలోలు వేయండి. మెరుగైన నేల ఆరోగ్యం కోసం సేంద్రీయ కంపోస్ట్ కూడా పరిగణించండి."
        });
      } else if (activeService === "disease") {
        mockResults = getTranslation({
          english: "Possible leaf blight detected. Recommend copper-based fungicide spray every 7-10 days. Remove affected leaves and ensure proper air circulation.",
          hindi: "संभावित पत्ती झुलसा रोग का पता चला है। हर 7-10 दिनों में तांबा आधारित फंगीसाइड स्प्रे की सिफारिश की जाती है। प्रभावित पत्तियों को हटाएं और उचित हवा के प्रवाह को सुनिश्चित करें।",
          telugu: "సాధ్యమైన ఆకుల దహనం గుర్తించబడింది. ప్రతి 7-10 రోజులకు రాగి ఆధారిత ఫంగిసైడ్ స్ప్రే సిఫార్సు చేయబడింది. ప్రభావిత ఆకులను తొలగించి సరైన గాలి ప్రసరణను నిర్ధారించండి."
        });
      }
      
      setResults(mockResults);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetService = () => {
    setActiveService(null);
    setTextInput("");
    setSelectedFile(null);
    setResults(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {getTranslation({
            english: "AI Agricultural Services",
            hindi: "AI कृषि सेवाएं", 
            telugu: "AI వ్యవసాయ సేవలు"
          })}
        </h2>
        <p className="text-muted-foreground">
          {getTranslation({
            english: "Get expert recommendations using AI technology",
            hindi: "AI तकनीक का उपयोग करके विशेषज्ञ सुझाव प्राप्त करें",
            telugu: "AI సాంకేతికతతో నిపుణుల సిఫార్సులు పొందండి"
          })}
        </p>
      </div>

      {!activeService ? (
        <div className="grid md:grid-cols-3 gap-4">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="cursor-pointer hover:shadow-glow transition-all duration-300 border-primary/20 bg-card/50 backdrop-blur-sm"
              onClick={() => setActiveService(service.id)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10 text-primary w-fit">
                  {service.icon}
                </div>
                <CardTitle className="text-lg text-primary">
                  {getTranslation(service.title)}
                </CardTitle>
                <CardDescription className="text-sm">
                  {getTranslation(service.description)}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-primary">
              {services.find(s => s.id === activeService)?.icon}
              {getTranslation(services.find(s => s.id === activeService)!.title)}
            </CardTitle>
            <CardDescription>
              {getTranslation(services.find(s => s.id === activeService)!.description)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <Upload className="h-4 w-4" />
                {getTranslation({
                  english: "Upload Image",
                  hindi: "छवि अपलोड करें",
                  telugu: "చిత్రం అప్‌లోడ్ చేయండి"
                })}
              </h3>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file:bg-primary file:text-primary-foreground file:border-0 file:rounded-md file:px-3 file:py-2"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  {getTranslation({
                    english: "Selected:",
                    hindi: "चयनित:",
                    telugu: "ఎంచుకున్నది:"
                  })} {selectedFile.name}
                </p>
              )}
            </div>

            {/* Text Input Section */}
            <div className="space-y-3">
              <h3 className="font-medium flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                {getTranslation({
                  english: "Or Describe Your Query",
                  hindi: "या अपनी क्वेरी का वर्णन करें", 
                  telugu: "లేదా మీ ప్రశ్న వివరించండి"
                })}
              </h3>
              <Textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={getTranslation({
                  english: "Describe your farming situation, soil conditions, or plant issues...",
                  hindi: "अपनी खेती की स्थिति, मिट्टी की स्थिति, या पौधों की समस्याओं का वर्णन करें...",
                  telugu: "మీ వ్యవసాయ పరిస్థితి, నేల పరిస్థితులు లేదా మొక్కల సమస్యలను వివరించండి..."
                })}
                className="min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="farm"
                onClick={analyzeInput}
                disabled={isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  getTranslation({
                    english: "Analyzing...",
                    hindi: "विश्लेषण कर रहे हैं...",
                    telugu: "విశ్లేషిస్తున్నది..."
                  })
                ) : (
                  getTranslation({
                    english: "Get Recommendation",
                    hindi: "सुझाव प्राप्त करें",
                    telugu: "సిఫార్సు పొందండి"
                  })
                )}
              </Button>
              <Button variant="outline" onClick={resetService}>
                {getTranslation({
                  english: "Back",
                  hindi: "वापस",
                  telugu: "వెనుకకు"
                })}
              </Button>
            </div>

            {/* Results Section */}
            {results && (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">
                    {getTranslation({
                      english: "AI Recommendation",
                      hindi: "AI सुझाव",
                      telugu: "AI సిఫార్సు"
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{results}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};