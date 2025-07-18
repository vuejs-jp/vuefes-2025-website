import { drizzle } from "drizzle-orm/sqlite-proxy";

export const db = drizzle(async (sql, params, method) => {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${process.env.CLOUDFLARE_DATABASE_ID}/query`;
  try {
    const resp = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
      },
      body: JSON.stringify({
        params: params,
        sql: sql,
      }),
    });

    const json = await resp.json() as unknown;

    if (typeof json !== "object" || json === null || !("result" in json) || !Array.isArray(json.result)) {
      throw new Error("Invalid response from D1 API");
    }

    const [result] = json.result;

    if (result.error) {
      throw new Error(result.error);
    }

    const rows = result.results.map((result: never) => {
      return Object.values(result);
    });

    if (method === "get") {
      return { rows: rows[0] };
    }

    return { rows: rows };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
    }
    return { rows: [] };
  }
});
