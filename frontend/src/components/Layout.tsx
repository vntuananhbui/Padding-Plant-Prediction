import { ReactNode } from "react";
import { Separator } from "@/components/ui/separator";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="w-full py-4 shadow-sm bg-white dark:bg-zinc-900">
        <div className="container mx-auto flex items-center justify-between px-4">
          <span className="font-bold text-xl tracking-tight">
            🌱 Plant Prediction
          </span>
          {/* Optionally add a dark mode toggle here */}
        </div>
      </header>
      <Separator />
      <main className="flex-1 container mx-auto px-4 py-8 w-full max-w-7xl">
        {children}
      </main>
      <Separator />
      <footer className="w-full py-4 text-center text-xs text-muted-foreground bg-white dark:bg-zinc-900">
        &copy; {new Date().getFullYear()} Plant Prediction &mdash; Powered by
        shadcn/ui, Tailwind CSS, and React
      </footer>
    </div>
  );
}
