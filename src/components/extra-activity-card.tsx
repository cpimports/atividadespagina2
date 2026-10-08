"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type ExtraActivity } from "@/lib/mock-data";
import { ShoppingCart, Sparkles, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExtraActivityCardProps {
  activity: ExtraActivity;
}

export function ExtraActivityCard({ activity }: ExtraActivityCardProps) {
  const handlePurchase = () => {
    window.open(activity.purchaseUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="flex flex-col overflow-hidden bg-card border-2 border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-300 rounded-xl group relative">
      <div className="absolute top-2.5 right-2.5 z-10">
        <Badge className="bg-amber-500 text-white font-bold text-[11px] shadow-xs px-2 py-0.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 fill-white" />
          Preço Especial de Membro
        </Badge>
      </div>

      <CardHeader className="p-0 relative aspect-video bg-muted overflow-hidden">
        <Image
          unoptimized
          src={activity.imageUrl}
          alt={activity.title}
          width={400}
          height={250}
          className={cn("w-full h-full object-cover transition-transform duration-300 group-hover:scale-105", activity.imageClassName)}
          data-ai-hint={activity.aiHint}
        />
      </CardHeader>

      <CardContent className="p-4 sm:p-5 flex-grow flex flex-col justify-between gap-3">
        <div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-900 border-amber-300 text-xs font-semibold mb-2">
            {activity.category}
          </Badge>
          <CardTitle className="text-base sm:text-lg font-bold leading-tight text-foreground group-hover:text-amber-700 transition-colors">
            {activity.title}
          </CardTitle>
          <CardDescription className="mt-2 text-xs sm:text-sm text-muted-foreground whitespace-pre-line line-clamp-4 leading-relaxed">
            {activity.description}
          </CardDescription>
        </div>

        <div className="pt-2 border-t border-border flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Acesso imediato no seu e-mail</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 sm:p-5 pt-0 mt-auto">
        <Button 
          className="w-full text-white font-bold bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all h-10 gap-2 text-sm"
          onClick={handlePurchase}
        >
          <ShoppingCart className="h-4 w-4" />
          Garantir com Desconto VIP
        </Button>
      </CardFooter>
    </Card>
  );
}
