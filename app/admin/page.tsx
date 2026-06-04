import type { Metadata } from "next";
import { AdminAccess } from "@/components/admin/AdminAccess";

export const metadata: Metadata = {
  title: "Админка | Doctor Amal",
  description: "Защищенный вход в админку Doctor Amal"
};

export default function AdminPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.DOCTOR_SUPABASE_URL ?? null;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? null;

  return (
    <div className="admin-page">
      <AdminAccess supabaseKey={supabaseKey} supabaseUrl={supabaseUrl} />
    </div>
  );
}
