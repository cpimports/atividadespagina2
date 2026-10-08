"use client";

import Image from "next/image";
import { FolderDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type Activity } from "@/lib/mock-data";

interface ActivityCardProps {
  activity: Activity;
  onView?: (activity: Activity) => void;
}

export function ActivityCard({
  activity,
  onView,
}: ActivityCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden bg-card border border-border/80 shadow-xs hover:shadow-lg hover:border-primary/40 transition-all duration-300 rounded-xl group">
      <CardHeader className="p-0 relative aspect-video bg-muted overflow-hidden">
        <Image
          unoptimized
          src={activity.thumbnailUrl}
          alt={`Thumbnail da atividade ${activity.title}`}
          width={400}
          height={250}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={activity.aiHint}
        />
        <div className="absolute top-2 left-2 flex items-center gap-1.5 flex-wrap">
          <Badge 
            variant="secondary" 
            className="bg-white/95 backdrop-blur-xs text-primary font-semibold text-xs shadow-xs px-2 py-0.5"
          >
            {activity.category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-grow flex flex-col justify-between gap-2">
        <div>
          <CardTitle className="text-sm sm:text-base font-bold leading-snug line-clamp-2 text-foreground group-hover:text-primary transition-colors">
            {activity.title}
          </CardTitle>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          size="sm"
          className="w-full text-xs font-semibold gap-1.5 shadow-xs"
          asChild
        >
          <a
            href={activity.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FolderDown className="h-3.5 w-3.5" /> Abrir Drive
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
