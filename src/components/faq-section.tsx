"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "@/components/icons/whatsapp-icon";

export function FAQSection() {
  const faqs = [
    {
      id: "item-1",
      question: "Como faço para baixar e abrir os materiais?",
      answer: "Basta clicar no botão 'Abrir Drive' em qualquer card ou no botão 'Pasta Geral Drive' no topo da página. Os arquivos estão organizados em pastas no Google Drive em formato PDF, prontos para download e impressão em qualquer computador, celular ou tablet.",
    },
    {
      id: "item-2",
      question: "Qual o melhor papel e configuração para impressão?",
      answer: "Para atividades de traçado, pintura e escrita, recomendamos papel sulfite A4 comum (75g ou 90g). Para tabuleiros, jogos de pareamento e cartões de rotina, sugerimos papel de maior gramatura (Offset 180g ou Papel Fotográfico Fosco 180g) para proporcionar maior firmeza nas mãozinhas.",
    },
    {
      id: "item-3",
      question: "Como montar os jogos com velcro para durar anos?",
      answer: "Você pode plastificar as folhas impressas com Polaseal (laminadora) ou aplicar papel contact transparente frente e verso. Em seguida, recorte as peças móveis e cole pedacinhos de velcro adesivo tipo moeda (redondo). Assim, o material fica 100% reutilizável e muito prazeroso para a criança!",
    },
    {
      id: "item-4",
      question: "Os materiais são adaptados para crianças atípicas (TEA / TDAH)?",
      answer: "Sim! Grande parte do acervo (como pareamento visual, cartões de comunicação PECS, rotinas visuais, semáforo dos alimentos e atividades sensoriais) foi desenhado com alto contraste, instruções claras e foco visual para apoiar o desenvolvimento cognitivo e emocional de crianças atípicas.",
    },
    {
      id: "item-5",
      question: "Como faço para falar com o suporte?",
      answer: "Nossa equipe está disponível de segunda a sexta-feira para ajudar você com qualquer dúvida de acesso ou download. Basta clicar no botão verde do WhatsApp presente no topo ou no rodapé do portal.",
    },
  ];

  return (
    <Card className="border-border bg-card shadow-xs">
      <CardHeader className="p-5 sm:p-6 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <HelpCircle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-primary">
              Perguntas Frequentes & Central de Ajuda
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Tire suas dúvidas sobre impressão, montagem e acesso aos materiais.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 sm:p-6 pt-2 space-y-4">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq.id} value={faq.id} className="border-b border-border/80">
              <AccordionTrigger className="text-sm font-semibold text-foreground hover:text-primary transition-colors text-left py-3">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-3">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="bg-muted/40 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs font-bold text-foreground">Ainda tem alguma dúvida?</p>
              <p className="text-[11px] text-muted-foreground">Fale diretamente com nossa equipe pedagógica pelo WhatsApp.</p>
            </div>
          </div>
          <Button
            size="sm"
            asChild
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold shrink-0 w-full sm:w-auto"
          >
            <a
              href="https://wa.me/5514998411853"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsappIcon className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Chamar no WhatsApp
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
