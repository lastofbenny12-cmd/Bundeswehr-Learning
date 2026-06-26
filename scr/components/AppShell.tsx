import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardList,
  GraduationCap,
  User,
  Crosshair,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";
import { Onboarding } from "@/components/Onboarding";
import camoBg from "@/assets/camo-bg.png.asset.json";

const TABS: { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean }[] = [
  { to: "/", label: "Start", icon: LayoutDashboard, exact: true },
  { to: "/lernen", label: "Lernen", icon: BookOpen },
  { to: "/quiz", label: "Quiz", icon: ClipboardList },
  { to: "/rechner", label: "Rechner", icon: Crosshair },
  { to: "/pruefung", label: "Prüfung", icon: GraduationCap },
  { to: "/profil", label: "Profil", icon: User },
];

export function BottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line">
      <div className="mx-auto max-w-[640px] grid grid-cols-6 px-1 py-1.5">
        {TABS.map((t) => {
          const active = t.exact ? path === t.to : path.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={cn(
                "press flex flex-col items-center gap-0.5 py-2 rounded-lg text-[10px] font-medium",
                active ? "text-mil bg-mil-pale" : "text-ink-mute hover:text-ink",
              )}
            >
              <Icon className="size-5" strokeWidth={active ? 2.2 : 1.7} />
              <span>{t.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}

export function TopBar({ title, subtitle }: { title: string; subtitle?: string }) {
  const userName = useStore((s) => s.userName);
  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[11px] font-semibold text-mil uppercase tracking-[0.18em]">
            AGA Trainer
          </p>
          {userName && (
            <span
              className="text-[10px] font-black tracking-[0.15em] text-ink bg-mil-pale border border-mil/30 rounded px-2 py-0.5"
              style={{ fontFamily: '"JetBrains Mono", monospace' }}
            >
              {userName}
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold text-ink leading-tight">{title}</h1>
        {subtitle && <p className="text-sm text-ink-mute mt-1">{subtitle}</p>}
      </div>
    </header>
  );
}

export function SubBar({
  title,
  back,
}: {
  title: string;
  back?: { to: string; label?: string } | string;
}) {
  const backTo = typeof back === "string" ? { to: back } : back;
  return (
    <header className="sticky top-0 z-30 bg-bg/90 backdrop-blur-md border-b border-line">
      <div className="px-5 py-4 flex items-center gap-3">
        {backTo && (
          <Link
            to={backTo.to}
            className="press text-mil font-medium text-sm flex items-center gap-1"
          >
            ← {backTo.label ?? "Zurück"}
          </Link>
        )}
        <h1 className="text-base font-semibold text-ink truncate">{title}</h1>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const onboarded = useStore((s) => s.onboarded);

  return (
    <div
      className="min-h-screen text-ink"
      style={{
        backgroundImage: `url(${camoBg.url})`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <div className="mx-auto max-w-[640px] min-h-screen flex flex-col border-x border-line bg-bg/95 backdrop-blur-sm">
        <main className="flex-1 pb-28">{children}</main>
        <BottomNav />
      </div>
      {!onboarded && <Onboarding />}
    </div>
  );
}

export function ShellOutlet() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
