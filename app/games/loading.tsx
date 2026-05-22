export default function GamesLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="glass-shimmer rounded-[38px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.26)] md:p-8">
          <div>
            <div className="skeleton-pill h-8 w-36" />
            <div className="skeleton-line mt-5 h-14 w-full max-w-3xl rounded-2xl" />
            <div className="skeleton-line mt-5 h-6 w-full max-w-2xl rounded-xl" />
            <div className="mt-6 flex flex-wrap gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="skeleton-pill h-10 w-40"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="stagger-grid mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="glass-shimmer rounded-[28px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="skeleton-line h-12 w-24 rounded-xl" />
                  <div className="skeleton-pill h-8 w-20" />
                </div>
                <div className="skeleton-line mt-4 h-6 w-40 rounded-lg" />
                <div className="skeleton-line mt-3 h-5 w-full rounded-lg" />
                <div className="skeleton-pill mt-6 h-11 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
