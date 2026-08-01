import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";

import type { MessageApi } from "./api";
import { HelloWorldPage } from "./HelloWorldPage";

vi.mock("sweetalert2", () => ({
  default: { fire: vi.fn().mockResolvedValue({}) },
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

test("saves entered text through the API", async () => {
  const create = vi.fn().mockResolvedValue({
    id: "example",
    text: "A message",
    createdAt: "2026-08-01T00:00:00Z",
  });
  const api: MessageApi = { create };
  render(<HelloWorldPage api={api} />);

  await userEvent.type(screen.getByLabelText("Text"), "A message");
  await userEvent.click(screen.getByRole("button", { name: "Save" }));

  expect(create).toHaveBeenCalledWith("A message");
});

test("does not send blank text", async () => {
  const create = vi.fn();
  render(<HelloWorldPage api={{ create }} />);

  await userEvent.click(screen.getByRole("button", { name: "Save" }));

  expect(create).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent("Enter some text");
});
