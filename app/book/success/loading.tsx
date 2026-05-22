export default function BookingSuccessLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div>
          <div className="skeleton-pill h-8 w-44" />
          <div className="skeleton-line mt-5 h-14 w-full max-w-2xl rounded-2xl" />
          <div className="skeleton-line mt-4 h-6 w-full max-w-3xl rounded-xl" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-shimmer rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6">
            <div>
              <div className="flex items-start gap-4">
                <div className="skeleton-block h-14 w-14 rounded-[22px]" />
                <div className="flex-1">
                  <div className="skeleton-line h-8 w-56 rounded-xl" />
                  <div className="skeleton-line mt-3 h-5 w-full max-w-xl rounded-lg" />
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-block h-28 rounded-[22px]"
                  />
                ))}
              </div>

              <div className="skeleton-block mt-4 h-28 rounded-[22px]" />
              <div className="mt-6 flex gap-3">
                <div className="skeleton-pill h-11 flex-1 rounded-full" />
                <div className="skeleton-pill h-11 flex-1 rounded-full" />
              </div>
            </div>
          </div>

          <div className="glass-shimmer rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)] md:p-6">
            <div>
              <div className="skeleton-pill h-4 w-32" />
              <div className="mt-5 space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="skeleton-block h-24 rounded-[22px]"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
