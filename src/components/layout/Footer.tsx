import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink py-10 text-slate-300">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4 text-center text-sm sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-2xl bg-white p-2">
            <Image src="/images/logo.webp" alt="Logo Gêniozinho em Ação" width={44} height={37} className="h-auto w-11" />
          </span>
          <span className="font-display text-lg font-extrabold text-white">Gêniozinho em Ação</span>
        </Link>
        <p>Transformando o aprendizado com atividades lúdicas e eficazes!</p>
        <p className="text-xs text-slate-400">&copy; {currentYear} Gêniozinho em Ação. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
