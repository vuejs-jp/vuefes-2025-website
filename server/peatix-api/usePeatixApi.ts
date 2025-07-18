import createClient from "openapi-fetch";

import type { paths } from "./schema";
import { useRuntimeConfig } from "#imports";

export const usePeatixApi = () => {
  const { peatixApiOrigin, peatixApiSecret } = useRuntimeConfig();

  return {
    client: createClient<paths>({
      baseUrl: peatixApiOrigin,
      headers: {
        Authorization: `Bearer ${peatixApiSecret}`,
      },
    }),
  };
};
