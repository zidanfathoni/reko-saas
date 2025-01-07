import { MainLayout } from "@/components/templates";

export default function ServicesPages() {
  return (
    <MainLayout>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
          Service
        </code>
      </div>
    </MainLayout>
  );
}