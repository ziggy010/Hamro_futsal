export default function AdminSalesLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-5 w-20 rounded-full bg-white/10" />
          <div className="mt-3 h-12 w-36 rounded-2xl bg-white/10" />
          <div className="mt-3 h-5 w-96 rounded-lg bg-white/8" />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-[24px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-20 rounded-[24px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-[24px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
