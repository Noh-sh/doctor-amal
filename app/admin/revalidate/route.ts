import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type AdminUserRow = {
  role: string;
  is_active: boolean;
};

function getSupabaseConfig() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.DOCTOR_SUPABASE_URL ?? null;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? null;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return { supabaseUrl, supabaseKey };
}

function getBearerToken(request: Request) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice("Bearer ".length).trim();

  return token.length > 0 ? token : null;
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();
  const token = getBearerToken(request);

  if (!config || !token) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser(token);

  if (userError || !user) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("role,is_active")
    .eq("user_id", user.id)
    .eq("role", "doctor_admin")
    .eq("is_active", true)
    .maybeSingle<AdminUserRow>();

  if (error || data?.role !== "doctor_admin" || !data.is_active) {
    return NextResponse.json({ ok: false }, { status: 403 });
  }

  revalidatePath("/");

  return NextResponse.json({ ok: true });
}
