export default function AdminSlotsLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-5 w-20 rounded-full bg-white/10" />
          <div className="mt-3 h-12 w-32 rounded-2xl bg-white/10" />
          <div className="mt-3 h-5 w-80 rounded-lg bg-white/8" />
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-20 rounded-[16px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="h-16 rounded-[20px] border border-white/10 bg-[rgba(13,19,26,0.92)]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
