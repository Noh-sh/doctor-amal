import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const browserSupabaseClients = new Map<string, SupabaseClient>();

type GlobalWithSupabaseCache = typeof globalThis & {
  __doctorAmalSupabaseClients?: Map<string, SupabaseClient>;
};

function getBrowserSupabaseClients() {
  if (typeof window === "undefined") {
    return browserSupabaseClients;
  }

  const globalScope = globalThis as GlobalWithSupabaseCache;
  globalScope.__doctorAmalSupabaseClients ??= browserSupabaseClients;

  return globalScope.__doctorAmalSupabaseClients;
}

function getAuthStorageKey(supabaseUrl: string) {
  const host = new URL(supabaseUrl).host;
  const projectRef = host.split(".")[0];

  return `sb-${projectRef}-auth-token`;
}

export function createBrowserSupabaseClient(supabaseUrl: string, supabaseKey: string) {
  const clients = getBrowserSupabaseClients();
  const storageKey = getAuthStorageKey(supabaseUrl);
  const cacheKey = storageKey;
  const existingClient = clients.get(cacheKey);

  if (existingClient) {
    return existingClient;
  }

  const client = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      storageKey
    }
  });

  clients.set(cacheKey, client);

  return client;
}
