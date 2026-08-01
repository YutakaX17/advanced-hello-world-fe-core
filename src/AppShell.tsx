import type { PropsWithChildren } from "react";

export interface AppShellProps extends PropsWithChildren {
  title?: string;
}

export function AppShell({
  title = "Advanced Hello World",
  children,
}: AppShellProps) {
  return (
    <div className="ahw-app">
      <header className="ahw-topbar">
        <span className="ahw-brand">{title}</span>
      </header>
      <main className="ahw-main">{children}</main>
    </div>
  );
}
