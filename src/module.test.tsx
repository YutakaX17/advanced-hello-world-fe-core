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
});
