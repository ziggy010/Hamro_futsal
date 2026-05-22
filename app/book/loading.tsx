export default function BookLoading() {
  return (
    <main className="min-h-screen pb-28">
      <section className="container py-8 md:py-12">
        <div>
          <div className="skeleton-pill h-8 w-28" />
          <div className="skeleton-line mt-5 h-14 w-full max-w-2xl rounded-2xl" />
          <div className="skeleton-line mt-4 h-6 w-full max-w-3xl rounded-xl" />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.18fr_0.82fr]">
          <div className="space-y-6">
            <div className="glass-shimmer rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] md:p-6">
              <div>
                <div className="skeleton-line h-8 w-48 rounded-xl" />
                <div className="skeleton-line mt-4 h-5 w-full max-w-md rounded-lg" />
                <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
                  {Array.from({ length: 7 }).map((_, index) => (
                    <div
                      key={index}
                      className="skeleton-block h-24 rounded-[24px]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="glass-shimmer rounded-[34px] border border-white/10 bg-[rgba(10,14,19,0.78)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.22)] md:p-6">
              <div>
                <div className="skeleton-line h-8 w-44 rounded-xl" />
                <div className="skeleton-line mt-4 h-5 w-full max-w-lg rounded-lg" />
                <div className="mt-6 space-y-4">
                  {Array.from({ length: 3 }).map((_, groupIndex) => (
                    <div
                      key={groupIndex}
                      className="rounded-[26px] border border-white/10 bg-white/[0.035] p-4"
                    >
                      <div className="skeleton-line h-8 w-full rounded-xl" />
                      <div className="mt-4 space-y-2">
                        {Array.from({ length: 3 }).map((__, slotIndex) => (
                          <div
                            key={slotIndex}
                            className="skeleton-block h-14 rounded-[20px]"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="skeleton-pill mt-6 h-11 rounded-full" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
