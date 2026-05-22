export default function AccountLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="relative overflow-hidden rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] backdrop-blur-2xl md:p-8">
          <div className="animate-pulse">
            <div className="h-8 w-32 rounded-full bg-white/10" />
            <div className="mt-5 h-12 w-full max-w-xl rounded-2xl bg-white/10" />
            <div className="mt-5 h-6 w-full max-w-2xl rounded-xl bg-white/8" />

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-28 rounded-[24px] border border-white/10 bg-white/[0.04]"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container pb-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 2 }).map((_, columnIndex) => (
            <div
              key={columnIndex}
              className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            >
              <div className="animate-pulse">
                <div className="h-4 w-28 rounded-full bg-white/10" />
                <div className="mt-3 h-8 w-52 rounded-xl bg-white/10" />

                <div className="mt-6 space-y-4">
                  {Array.from({ length: 3 }).map((_, cardIndex) => (
                    <div
                      key={cardIndex}
                      className="h-36 rounded-[24px] border border-white/10 bg-white/[0.04]"
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
