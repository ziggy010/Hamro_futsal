import StatePanel from "@/components/ui/state-panel";

export default function CustomersLoading() {
  return (
    <main className="min-h-screen pb-20">
      <section className="container py-8 md:py-12">
        <StatePanel
          variant="loading"
          title="Loading customers"
          text="Preparing booking history and lifetime spend."
        />
      </section>
    </main>
  );
}
