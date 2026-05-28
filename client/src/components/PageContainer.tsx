function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 md:px-8">
      {children}
    </main>
  );
}

export default PageContainer;
