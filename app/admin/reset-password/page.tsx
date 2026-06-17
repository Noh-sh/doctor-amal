import type { Metadata } from "next";
import { AdminPasswordReset } from "@/components/admin/AdminPasswordReset";

export const metadata: Metadata = {
  title: "Новый пароль | Doctor Amal",
  description: "Восстановление пароля админки Doctor Amal"
};

export default function AdminResetPasswordPage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.DOCTOR_SUPABASE_URL ?? null;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? null;

  return (
    <div className="admin-page">
      <AdminPasswordReset supabaseKey={supabaseKey} supabaseUrl={supabaseUrl} />
    </div>
  );
}
