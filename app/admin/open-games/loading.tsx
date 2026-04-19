export default function AdminOpenGamesLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-5 w-20 rounded-full bg-white/10" />
          <div className="mt-3 h-12 w-52 rounded-2xl bg-white/10" />
          <div className="mt-3 h-5 w-96 rounded-lg bg-white/8" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_1fr]">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div
              key={columnIndex}
              className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="animate-pulse">
                <div className="h-6 w-40 rounded-xl bg-white/10" />
                <div className="mt-4 space-y-4">
                  {Array.from({ length: 4 }).map((__, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="h-36 rounded-[20px] border border-white/10 bg-white/[0.04]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
