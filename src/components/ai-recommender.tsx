"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { activities, type Activity } from "@/lib/mock-data";
import { Sparkles, Eye, FolderDown, RefreshCw, Wand2, Compass } from "lucide-react";

interface AIRecommenderProps {
  onActivityClick: (activity: Activity) => void;
}

const OBJECTIVES = [
  { id: "all", label: "🌟 Todas as Recomendações", category: null },
  { id: "alfabetizacao", label: "🔤 Alfabetização & Leitura", category: "Alfabetização" },
  { id: "numeros", label: "🔢 Números & Raciocínio", category: "Números" },
  { id: "sensoriais", label: "🧩 Sensorial, Calma & TEA", category: "Atividades sensoriais" },
  { id: "jogos", label: "🎲 Jogos & Interação", category: "Jogos Educativos" },
];

export function AIRecommender({ onActivityClick }: AIRecommenderProps) {
  const [selectedObjective, setSelectedObjective] = useState("all");
  const [seed, setSeed] = useState(0);

  const handleSurpriseMe = () => {
    setSeed(prev => prev + 1);
  };

  const filteredRecommendations = useMemo(() => {
    let pool = activities.filter((a: Activity) => a.id !== "all-activities");
    
    if (selectedObjective !== "all") {
      const obj = OBJECTIVES.find(o => o.id === selectedObjective);
      if (obj?.category) {
        pool = pool.filter((a: Activity) => a.category === obj.category);
      }
    }
    
    // Deterministic shuffle with seed
    const shuffled = [...pool].sort((a: Activity, b: Activity) => {
      const hashA = (a.title.length * 31 + a.id.charCodeAt(0) + seed * 17) % 100;
      const hashB = (b.title.length * 31 + b.id.charCodeAt(0) + seed * 17) % 100;
      return hashA - hashB;
    });

    return shuffled.slice(0, 3);
  }, [selectedObjective, seed]);

  return (
    <Card className="bg-gradient-to-br from-sky-100/70 via-white to-amber-50/60 border-primary/20 shadow-sm overflow-hidden">
      <CardHeader className="p-4 sm:p-6 pb-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400 text-amber-950 rounded-lg shadow-xs">
              <Sparkles className="h-5 w-5 fill-amber-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg sm:text-xl font-bold text-primary">
                  Assistente Pedagógico Virtual
                </CardTitle>
                <Badge variant="secondary" className="bg-amber-200/80 text-amber-900 border-amber-300 text-[10px] font-bold">
                  Sugestões Inteligentes
                </Badge>
              </div>
              <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                Escolha o objetivo do momento para receber sugestões de atividades prontas para usar hoje.
              </CardDescription>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSurpriseMe}
            className="text-xs gap-1.5 border-primary/30 text-primary hover:bg-primary/10 self-end sm:self-center"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Sortear Outras</span>
          </Button>
        </div>

        {/* Objective Chips */}
        <div className="flex flex-wrap gap-1.5 pt-3 pb-1">
          {OBJECTIVES.map((obj) => (
            <button
              key={obj.id}
              onClick={() => setSelectedObjective(obj.id)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                selectedObjective === obj.id
                  ? "bg-primary text-white shadow-xs"
                  : "bg-white/80 hover:bg-white text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {obj.label}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 pt-2">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredRecommendations.map((activity) => (
            <div 
              key={activity.id} 
              className="group relative bg-white rounded-xl border border-primary/15 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div 
                className="relative h-32 w-full overflow-hidden bg-muted cursor-pointer"
                onClick={() => onActivityClick(activity)}
              >
                <Image
                  unoptimized
                  src={activity.thumbnailUrl}
                  alt={activity.title}
                  width={300}
                  height={180}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={activity.aiHint}
                />
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="bg-white/90 backdrop-blur-xs text-primary font-semibold text-[10px] shadow-xs">
                    {activity.category}
                  </Badge>
                </div>
              </div>

              <div className="p-3 flex flex-col flex-grow justify-between gap-2">
                <h3 
                  onClick={() => onActivityClick(activity)}
                  className="text-xs sm:text-sm font-bold text-foreground line-clamp-2 hover:text-primary transition-colors cursor-pointer"
                >
                  {activity.title}
                </h3>
                
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 text-[11px] gap-1 px-2 border-primary/30 text-primary hover:bg-primary/10"
                    onClick={() => onActivityClick(activity)}
                  >
                    <Eye className="w-3 h-3" />
                    Prévia
                  </Button>
                  <Button
                    size="sm"
                    className="h-7 text-[11px] gap-1 px-2"
                    asChild
                  >
                    <a
                      href={activity.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FolderDown className="w-3 h-3" />
                      Drive
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
