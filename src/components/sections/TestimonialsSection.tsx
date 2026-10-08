'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, PlayCircle } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import DynamicCounterBanner from '@/components/shared/DynamicCounterBanner';
import { SectionHeading, BottomCurveDivider } from '@/components/landing/ui';

const hostedVideos = [
  { videoUrl: '/videos/DEPOIMENTO-PROFESSORA.mp4', title: 'Depoimento Professora' },
  { videoUrl: '/videos/Depoimento Professora Nilva.mp4', title: 'Depoimento Professora Nilva' },
  { videoUrl: '/videos/DEPOIMENTO-ELIANE.mp4', title: 'Depoimento Eliane' },
  { videoUrl: '/videos/DEPOIMENTO-THIAGO.mp4', title: 'Depoimento Thiago' },
  { videoUrl: '/videos/DEPOIMENTO-CAMILA.mp4', title: 'Depoimento Camila' },
  { videoUrl: '/videos/DEPOIMENTO-SILVANA.mp4', title: 'Depoimento Silvana' },
  { videoUrl: '/videos/DEPOIMENTO-GABRIELE.mp4', title: 'Depoimento Gabriele' },
  { videoUrl: '/videos/DEPOIMENTO-MARIA.mp4', title: 'Depoimento Maria' },
];

const commentsData = [
  {
    id: 1,
    avatarUrl: '/images/avatar-carla.webp',
    name: 'Carla Monteiro',
    role: 'Professora de Educação Infantil',
    text: 'Sempre perdi horas preparando atividades inclusivas, mas agora tudo já está pronto e organizado. Essa plataforma simplesmente mudou minha rotina em sala de aula e facilitou demais meu planejamento, amei 🥰',
  },
  {
    id: 2,
    avatarUrl: '/images/avatar-vanessa.webp',
    name: 'Vanessa Santos',
    role: 'Professora há 12 anos',
    text: 'Sou professora há 12 anos e nunca encontrei um material tão completo e adaptado para crianças autistas! A variedade das atividades lúdicas é incrível, consigo engajar meus alunos de uma forma que antes era muito difícil.',
  },
  {
    id: 3,
    avatarUrl: '/images/avatar-andre.webp',
    name: 'André Ferreira',
    role: 'Terapeuta Ocupacional',
    text: 'Como terapeuta, sempre procuro materiais que unam didática com acessibilidade. O Gêniozinho em Ação entrega isso com excelência. Os pais dos meus pacientes amaram poder aplicar em casa também.',
  },
  {
    id: 4,
    avatarUrl: '/images/avatar-raquel.webp',
    name: 'Raquel Teodoro',
    role: 'Mãe Atípica (Manoela - TEA Nível 2)',
    text: 'Sou mãe da Manoela, ela é autista nível 2 e sei o quanto é difícil ver outras crianças avançando enquanto minha filha enfrenta mais obstáculo. O Gêniozinho em Ação trouxe leveza para nossa rotina, fazemos uma atividade por dia e já sentimos diferença. É incrível!',
  },
];

const VideoCard = ({ title, videoUrl, load }: { title: string; videoUrl: string; load: boolean }) => (
  <div className="relative mx-auto aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] overflow-hidden rounded-3xl border-4 border-white bg-ink shadow-[0_10px_30px_-10px_rgba(27,42,74,0.45)]">
    {load ? (
      <video
        controls
        className="h-full w-full object-cover"
        preload="metadata"
        src={`${videoUrl}#t=0.1`}
        playsInline
        muted
        aria-label={title}
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
    ) : (
      <div className="flex h-full w-full items-center justify-center text-white/40">
        <PlayCircle className="h-12 w-12" aria-hidden="true" />
      </div>
    )}
  </div>
);

const CommentCard = ({ comment }: { comment: (typeof commentsData)[number] }) => (
  <article className="group flex h-full flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
    <div>
      {/* Cabeçalho do Card: Avaliação por estrelas e Badge de Verificado */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
          ))}
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-100">
          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
          Compra verificada
        </span>
      </div>

      {/* Texto do Depoimento */}
      <p className="text-sm sm:text-base leading-relaxed text-ink font-medium">
        &ldquo;{comment.text}&rdquo;
      </p>
    </div>

    {/* Autor: Foto, Nome e Cargo/Perfil */}
    <div className="mt-6 flex items-center gap-3.5 border-t border-slate-100 pt-5">
      <div className="relative">
        <Image
          src={comment.avatarUrl}
          alt={comment.name}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover border-2 border-sky-100 shadow-2xs"
          loading="lazy"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-base font-extrabold text-ink truncate">
          {comment.name}
        </h4>
        <p className="text-xs font-semibold text-sky-700">
          {comment.role}
        </p>
      </div>
    </div>
  </article>
);

export default function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [loadVideos, setLoadVideos] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Só carrega os vídeos quando a seção está chegando na tela (economiza dados no celular)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoadVideos(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api]);

  const handleDotClick = useCallback((index: number) => api?.scrollTo(index), [api]);

  return (
    <section ref={sectionRef} id="depoimentos" className="bg-sky-50/70 pt-16 md:pt-24 pb-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Depoimentos reais sobre o Gêniozinho em Ação!"
          subtitle="Descubra como o Gêniozinho em Ação está facilitando o trabalho dos professores e acelerando o aprendizado das crianças autistas."
          className="mb-8 md:mb-10"
        />
        <div className="mb-12 flex justify-center">
          <DynamicCounterBanner />
        </div>

        <div className="mx-auto max-w-xl">
          <Carousel
            setApi={setApi}
            opts={{ align: 'center', loop: true }}
            className="relative mx-auto w-full px-12 sm:px-16"
          >
            <CarouselContent>
              {hostedVideos.map((video) => (
                <CarouselItem key={video.videoUrl} className="basis-full flex justify-center">
                  <VideoCard title={video.title} videoUrl={video.videoUrl} load={loadVideos} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              aria-label="Vídeo anterior"
              className="flex left-0 sm:-left-3 md:-left-6 h-10 w-10 sm:h-11 sm:w-11 border-2 border-ink bg-white text-ink shadow-md hover:bg-sky-100 transition-colors z-20"
            />
            <CarouselNext
              aria-label="Próximo vídeo"
              className="flex right-0 sm:-right-3 md:-right-6 h-10 w-10 sm:h-11 sm:w-11 border-2 border-ink bg-white text-ink shadow-md hover:bg-sky-100 transition-colors z-20"
            />
          </Carousel>
          {api && (
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={cn(
                    'h-2.5 rounded-full transition-all duration-200',
                    current === index ? 'w-7 bg-ink' : 'w-2.5 bg-ink/20 hover:bg-ink/40',
                  )}
                  aria-label={`Ir para vídeo ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto mt-14 sm:mt-16 text-center">
          <h3 className="font-display text-lg font-extrabold text-ink sm:text-xl md:text-2xl">
            Comentários de Clientes Satisfeitos
          </h3>
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-5 sm:gap-6 md:grid-cols-2">
          {commentsData.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
      <BottomCurveDivider className="text-[#FFFBF3] mt-12 md:mt-16" inverted />
    </section>
  );
}
