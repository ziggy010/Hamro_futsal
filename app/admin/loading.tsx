export default function AdminLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-5 w-20 rounded-full bg-white/10" />
          <div className="mt-3 h-12 w-56 rounded-2xl bg-white/10" />
          <div className="mt-3 h-5 w-80 rounded-lg bg-white/8" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 rounded-[26px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="animate-pulse">
                <div className="h-6 w-40 rounded-xl bg-white/10" />
                <div className="mt-5 space-y-4">
                  {Array.from({ length: 4 }).map((__, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="h-24 rounded-[22px] border border-white/10 bg-white/[0.04]"
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
