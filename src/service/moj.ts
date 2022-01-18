import fetch from "node-fetch";
import { System } from "../systems";

interface JusticeServiceResponse {
  build: { version: string };
}

export const withJusticeServiceVersion = async (
  system: Promise<System>
): Promise<System> => {
  const r_system = await system;

  const prod_version = await (async () => {
    if (r_system.prod_url) {
      const response = await fetch(r_system.prod_url);

      try {
        const data = (await response.json()) as JusticeServiceResponse;
        return data.build.version;
      } catch {
        return;
      }
    }
  })();

  return { ...r_system, prod_version };
};
