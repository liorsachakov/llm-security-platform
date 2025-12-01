export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Placeholder for Sidebar/Navbar if needed later */}
      {/* For now, matching the original minimal layout style but with consistent background */}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

