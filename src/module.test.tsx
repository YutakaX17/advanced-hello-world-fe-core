import { describe, expect, it } from "vitest";

import { defineModule, MODULE_CONTRACT_VERSION } from "./module";

function Page() {
  return null;
}

describe("defineModule", () => {
  it("accepts typed declarative routes", () => {
    const module = defineModule({
      id: "messages",
      contractVersion: MODULE_CONTRACT_VERSION,
      routes: [{ path: "/", component: Page }],
    });

    expect(module.id).toBe("messages");
  });

  it("rejects duplicate routes", () => {
    expect(() =>
      defineModule({
        id: "messages",
        contractVersion: MODULE_CONTRACT_VERSION,
        routes: [
          { path: "/", component: Page },
          { path: "/", component: Page },
        ],
      }),
    ).toThrow("module route paths must be unique");
  });

  it("rejects an invalid module id", () => {
    expect(() =>
      defineModule({
        id: "Messages",
        contractVersion: MODULE_CONTRACT_VERSION,
        routes: [{ path: "/", component: Page }],
      }),
    ).toThrow("module id must use lower-case letters, digits, and hyphens");
  });

  it("rejects an unsupported contract version", () => {
    expect(() =>
      defineModule({
        id: "messages",
        contractVersion: 2 as typeof MODULE_CONTRACT_VERSION,
        routes: [{ path: "/", component: Page }],
      }),
    ).toThrow("unsupported frontend module contract");
  });

  it("rejects a relative route path at runtime", () => {
    expect(() =>
      defineModule({
        id: "messages",
        contractVersion: MODULE_CONTRACT_VERSION,
        routes: [
          {
            path: "relative" as `/${string}`,
            component: Page,
          },
        ],
      }),
    ).toThrow("module route paths must start with '/'");
  });
});
