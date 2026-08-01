import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppShell } from "./AppShell";

describe("AppShell", () => {
  it("renders a branded top bar and feature content", () => {
    render(
      <AppShell title="Example">
        <p>Feature content</p>
      </AppShell>,
    );

    expect(screen.getByText("Example")).toBeInTheDocument();
    expect(screen.getByText("Feature content")).toBeInTheDocument();
  });

  it("uses the product name by default", () => {
    render(<AppShell>Content</AppShell>);

    expect(screen.getByText("Advanced Hello World")).toBeInTheDocument();
  });
});
