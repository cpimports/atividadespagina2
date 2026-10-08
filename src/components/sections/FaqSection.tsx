import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SectionHeading, BottomWaveDivider } from '@/components/landing/ui';

const faqData = [
  {
    question: 'O material está de acordo com a BNCC?',
    answer:
      'Sim, todos os nossos materiais são alinhados com os códigos das habilidades e competências da Base Nacional Comum Curricular (BNCC), proporcionando um ensino atualizado e eficaz.',
  },
  {
    question: 'Como vou receber o material?',
    answer:
      'O Gêniozinho em Ação é totalmente digital, você está adquirindo o acesso a um portal de atividades e irá receber o material utilizando o seu e-mail, de imediato após a confirmação de pagamento, e o melhor, no conforto de sua casa!',
  },
  {
    question: 'Se eu não gostar do produto, posso cancelar?',
    answer:
      'Pode sim, não tem problema, caso não veja resultados você tem até 7 dias após aprovação do pagamento, devolvemos o valor pago.',
  },
  {
    question: 'São quantas atividades?',
    answer:
      'São +1500 atividades, pensadas especialmente no aprendizado do seu pequeno, com +12 Bônus Exclusivos irresistíveis com várias atividades.',
  },
  {
    question: 'Posso usar o Kit em Sala de Aula e para Reforço em Casa?',
    answer:
      'Claro! Nossos kits são versáteis e podem ser utilizados tanto em sala de aula quanto para reforço escolar em casa, ajudando a reforçar o aprendizado.',
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="bg-slate-50 pt-16 md:pt-24 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Tire suas dúvidas" eyebrowTone="blue" title="Perguntas frequentes" />
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqData.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-2xl border border-slate-200/90 bg-white px-5 shadow-2xs transition-all duration-200 data-[state=open]:border-sky-300 data-[state=open]:shadow-sm hover:border-slate-300"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-extrabold text-ink hover:no-underline sm:text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-base leading-relaxed text-ink-soft">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <BottomWaveDivider className="text-ink mt-12 md:mt-16" flip />
    </section>
  );
}
