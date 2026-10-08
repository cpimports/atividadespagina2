"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { extraActivities, type ExtraActivity } from "@/lib/mock-data";
import { ExtraActivityCard } from "./extra-activity-card";
import { Crown } from "lucide-react";

interface PromotionalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PromotionalModal({
  isOpen,
  onClose,
}: PromotionalModalProps) {

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-0">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            <DialogHeader className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Crown className="h-8 w-8 text-primary" />
                    <DialogTitle className="text-3xl font-bold text-primary">Novidade do Gêniozinho!</DialogTitle>
                </div>
              <DialogDescription className="text-lg">
                Atividades novas na nossa coleção para transformar suas aulas.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {extraActivities.map((activity: ExtraActivity) => (
                  <ExtraActivityCard key={activity.id} activity={activity} />
                ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
