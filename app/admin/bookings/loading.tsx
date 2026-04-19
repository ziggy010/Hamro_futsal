export default function AdminBookingsLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-5 w-20 rounded-full bg-white/10" />
          <div className="mt-3 h-12 w-44 rounded-2xl bg-white/10" />
          <div className="mt-3 h-5 w-96 rounded-lg bg-white/8" />
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.18)]">
              <div className="animate-pulse">
                <div className="h-12 w-full max-w-md rounded-[20px] bg-white/10" />
                <div className="mt-4 flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-10 w-24 rounded-full bg-white/10"
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="h-40 rounded-[24px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
                />
              ))}
            </div>
          </div>

          <div className="h-80 rounded-[30px] border border-white/10 bg-[rgba(13,19,26,0.92)]" />
        </div>
      </section>
    </main>
  );
}
