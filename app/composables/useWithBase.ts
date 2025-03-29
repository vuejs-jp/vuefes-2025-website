import { useRuntimeConfig } from "#app";

export function useWithBase() {
  const baseUrl = useRuntimeConfig().app.baseURL;

  function withBase(path: string) {
    return (baseUrl + path).replace(/\/\//g, "/");
  }

  return withBase;
}
