'use client';

export default function AnnouncementBar() {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 flex h-[44px] items-center justify-center bg-ink px-4 text-center text-xs text-white shadow-md sm:text-sm">
        <p>
          <span aria-hidden="true" className="mr-1.5">
            🎁
          </span>
          <strong className="text-marker">OFERTA DE LANÇAMENTO:</strong> 80% de desconto só hoje no{' '}
          <strong>Kit Gêniozinho em Ação!</strong>
        </p>
      </div>
      {/* Espaço reservado para a barra fixa */}
      <div aria-hidden="true" className="h-[44px]" />
    </>
  );
}
