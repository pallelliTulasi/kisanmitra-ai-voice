import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Bot, Send, Mic, MicOff, Volume2 } from "lucide-react";
import { toast } from "sonner";
import aiAssistantIcon from "@/assets/ai-assistant.jpg";

interface Message {
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  language: string;
}

export const AIAssistant = ({ language }: AIAssistantProps) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = useRef<SpeechSynthesis | null>(null);

  const translations = {
    english: {
      title: "AI Farming Assistant",
      questionLabel: "Ask your farming question",
      askButton: "Ask Assistant",
      placeholder: "e.g., What's the best time to plant tomatoes? How to prevent crop diseases?",
      voiceStart: "Start Voice Input",
      voiceStop: "Stop Voice Input",
      listening: "Listening...",
      speaking: "Speaking...",
      greetingMessage: "Hello! I'm your KisanMitra AI assistant. I can help you with farming advice, crop management, weather insights, and agricultural best practices. How can I assist you today?"
    },
    hindi: {
      title: "AI कृषि सहायक",
      questionLabel: "अपना कृषि प्रश्न पूछें",
      askButton: "सहायक से पूछें",
      placeholder: "जैसे टमाटर लगाने का सबसे अच्छा समय क्या है? फसल रोगों को कैसे रोकें?",
      voiceStart: "वॉयस इनपुट शुरू करें",
      voiceStop: "वॉयस इनपुट बंद करें",
      listening: "सुन रहा है...",
      speaking: "बोल रहा है...",
      greetingMessage: "नमस्ते! मैं आपका किसानमित्र AI सहायक हूं। मैं कृषि सलाह, फसल प्रबंधन, मौसम जानकारी और कृषि सर्वोत्तम प्रथाओं में आपकी सहायता कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?"
    },
    telugu: {
      title: "AI వ్యవసాయ సహాయకుడు",
      questionLabel: "మీ వ్యవసాయ ప్రశ్న అడగండి",
      askButton: "సహాయకుడిని అడగండి",
      placeholder: "ఉదా., టమాటోలు నాటడానికి ఉత్తమ సమయం ఎప్పుడు? పంట వ్యాధులను ఎలా నివారించాలి?",
      voiceStart: "వాయిస్ ఇన్‌పుట్ ప్రారంభించండి",
      voiceStop: "వాయిస్ ఇన్‌పుట్ ఆపండి",
      listening: "వింటున్నాను...",
      speaking: "మాట్లాడుతున్నాను...",
      greetingMessage: "నమస్కారం! నేను మీ కిసాన్‌మిత్ర AI సహాయకుడిని. వ్యవసాయ సలహాలు, పంట నిర్వహణ, వాతావరణ అంతర్దృష్టులు మరియు వ్యవసాయ ఉత్తమ పద్ధతులలో నేను మీకు సహాయం చేయగలను. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను?"
    }
  };

  const t = translations[language as keyof typeof translations] || translations.english;

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionConstructor = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognitionConstructor();
      recognition.current!.continuous = false;
      recognition.current!.interimResults = false;
      recognition.current!.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-US';

      recognition.current!.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuestion(transcript);
        setIsListening(false);
      };

      recognition.current!.onerror = () => {
        setIsListening(false);
        toast.error("Voice recognition failed");
      };
    }

    // Initialize speech synthesis
    synthesis.current = window.speechSynthesis;

    // Add greeting message
    if (messages.length === 0) {
      setMessages([{
        type: 'assistant',
        content: t.greetingMessage,
        timestamp: new Date()
      }]);
    }
  }, [language, t.greetingMessage, messages.length]);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      recognition.current.start();
    } else {
      toast.error("Voice recognition not supported");
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      recognition.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthesis.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hindi' ? 'hi-IN' : language === 'telugu' ? 'te-IN' : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      
      synthesis.current.speak(utterance);
    }
  };

  const askAssistant = async () => {
    if (!question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const userMessage: Message = {
      type: 'user',
      content: question,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Simulated AI response - in a real app, you'd call an actual AI API
      const responses = {
        english: [
          "Based on your location and current weather conditions, I recommend planting tomatoes in early spring when soil temperature reaches 60°F (15°C). Ensure proper spacing and use disease-resistant varieties.",
          "To prevent crop diseases, implement crop rotation, ensure proper drainage, use resistant varieties, and apply organic fungicides when necessary. Regular monitoring is key.",
          "For optimal soil health, test pH levels regularly, add organic compost, practice cover cropping, and maintain proper moisture levels. Healthy soil leads to better yields.",
          "Consider using drip irrigation to conserve water and reduce disease risk. Water early morning to minimize evaporation and fungal growth.",
          "Integrated Pest Management (IPM) combines biological, cultural, and chemical controls. Start with natural predators and organic methods before considering pesticides."
        ],
        hindi: [
          "आपके स्थान और वर्तमान मौसम की स्थिति के आधार पर, मैं सुझाता हूं कि टमाटर बसंत ऋतु में लगाएं जब मिट्टी का तापमान 15°C तक पहुंच जाए। उचित दूरी और रोग प्रतिरोधी किस्मों का उपयोग करें।",
          "फसल रोगों को रोकने के लिए फसल चक्र अपनाएं, उचित जल निकासी सुनिश्चित करें, प्रतिरोधी किस्मों का उपयोग करें और आवश्यक होने पर जैविक कवकनाशी का प्रयोग करें।",
          "मिट्टी के स्वास्थ्य के लिए नियमित रूप से pH स्तर की जांच करें, जैविक खाद डालें, कवर क्रॉपिंग करें और उचित नमी बनाए रखें।",
          "पानी बचाने और रोग के जोखिम को कम करने के लिए ड्रिप सिंचाई का उपयोग करें। सुबह जल्दी पानी दें।",
          "एकीकृत कीट प्रबंधन जैविक, सांस्कृतिक और रासायनिक नियंत्रणों को जोड़ता है। कीटनाशकों से पहले प्राकृतिक शिकारियों का उपयोग करें।"
        ],
        telugu: [
          "మీ స్థానం మరియు ప్రస్తుత వాతావరణ పరిస్థితుల ఆధారంగా, మట్టి ఉష్ణోగ్రత 15°C చేరుకున్నప్పుడు వసంత కాలంలో టమాటోలు నాటాలని సిఫార్సు చేస్తున్నాను।",
          "పంట వ్యాధులను నివారించడానికి, పంట మార్పిడిని అమలు చేయండి, సరైన డ్రైనేజీని నిర్ధారించండి, నిరోధక రకాలను ఉపయోగించండి మరియు అవసరమైనప్పుడు సేంద్రీయ శిలీంద్రనాశనులను వర్తించండి।",
          "మట్టి ఆరోగ్యం కోసం నియమితంగా pH స్థాయిలను పరీక్షించండి, సేంద్రీయ కంపోస్ట్ జోడించండి, కవర్ క్రాపింగ్ ప్రాక్టీస్ చేయండి మరియు సరైన తేమ స్థాయిలను నిర్వహించండి।",
          "నీటిని ఆదా చేయడానికి మరియు వ్యాధి ప్రమాదాన్ని తగ్గించడానికి డ్రిప్ ఇర్రిగేషన్ ఉపయోగించండి। ఉదయాన్నే నీరు పోయండి।",
          "ఇంటిగ్రేటెడ్ పెస్ట్ మేనేజ్‌మెంట్ జీవ, సాంస్కృతిక మరియు రసాయన నియంత్రణలను మిళితం చేస్తుంది। కీటనాశకాలను పరిగణించే ముందు సహజ మాంసాహారులు మరియు సేంద్రీయ పద్ధతులతో ప్రారంభించండి।"
        ]
      };

      const responseArray = responses[language as keyof typeof responses] || responses.english;
      const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];

      setTimeout(() => {
        const assistantMessage: Message = {
          type: 'assistant',
          content: randomResponse,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setLoading(false);
        setQuestion("");
        
        // Speak the response
        speakText(randomResponse);
        
        toast.success("Response generated successfully");
      }, 1500);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to get AI response");
    }
  };

  return (
    <Card className="shadow-card bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20 h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="h-6 w-6 text-accent" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col space-y-4">
        <div className="flex justify-center mb-4">
          <img 
            src={aiAssistantIcon} 
            alt="AI Assistant" 
            className="w-20 h-20 rounded-lg shadow-soft object-cover"
          />
        </div>

        {/* Chat Messages */}
        <div className="flex-1 max-h-64 overflow-y-auto space-y-3 mb-4 p-3 bg-background/60 backdrop-blur-sm rounded-lg border border-accent/20">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground ml-4'
                    : 'bg-accent/20 text-foreground mr-4'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-accent/20 text-foreground p-3 rounded-lg mr-4">
                <p className="text-sm">Thinking...</p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="question" className="text-sm font-medium text-foreground">
            {t.questionLabel}
          </Label>
          <Textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.placeholder}
            className="border-accent/30 focus:border-accent focus:ring-accent/20 min-h-[100px]"
            onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), askAssistant())}
          />
        </div>

        <div className="flex gap-2">
          <Button 
            variant="ai" 
            className="flex-1"
            onClick={askAssistant}
            disabled={loading}
          >
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Thinking..." : t.askButton}
          </Button>
          
          <Button
            variant="voice"
            size="icon"
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
            className="shrink-0"
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>
          
          {isSpeaking && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => synthesis.current?.cancel()}
              className="shrink-0"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isListening && (
          <p className="text-sm text-center text-muted-foreground animate-pulse">
            {t.listening}
          </p>
        )}
        
        {isSpeaking && (
          <p className="text-sm text-center text-muted-foreground animate-pulse">
            {t.speaking}
          </p>
        )}
      </CardContent>
    </Card>
  );
};