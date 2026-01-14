import DashboardLayout from "@/components/layout/DashboardLayout";

const Support = () => {
  return (
    <DashboardLayout>
      <header className="border-b border-border bg-card">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <h1 className="font-heading text-2xl text-foreground md:text-3xl">
            Support
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Get help with your system and project (coming soon).
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8">
        <section className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm text-muted-foreground">
            This section is not implemented yet.
          </p>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Support;
