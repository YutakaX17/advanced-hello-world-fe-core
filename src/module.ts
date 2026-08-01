import type { ComponentType } from "react";

export const MODULE_CONTRACT_VERSION = 1 as const;

export interface ApplicationRoute {
  readonly path: `/${string}` | "/";
  readonly component: ComponentType;
}

export interface ApplicationModule {
  readonly id: string;
  readonly contractVersion: typeof MODULE_CONTRACT_VERSION;
  readonly routes: readonly ApplicationRoute[];
}

export interface ModuleContext {
  readonly apiBaseUrl: string;
}

export type ApplicationModuleFactory = (
  context: ModuleContext,
) => Readonly<ApplicationModule>;

const moduleId = /^[a-z][a-z0-9-]*$/;

export function defineModule(
  module: ApplicationModule,
): Readonly<ApplicationModule> {
  if (!moduleId.test(module.id)) {
    throw new Error(
      "module id must use lower-case letters, digits, and hyphens",
    );
  }
  if (module.contractVersion !== MODULE_CONTRACT_VERSION) {
    throw new Error(
      `unsupported frontend module contract: ${module.contractVersion}`,
    );
  }
  const paths = module.routes.map(({ path }) => path);
  if (paths.some((path) => !path.startsWith("/"))) {
    throw new Error("module route paths must start with '/'");
  }
  if (new Set(paths).size !== paths.length) {
    throw new Error("module route paths must be unique");
  }
  return Object.freeze(module);
}
