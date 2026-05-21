import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Doctor Amal",
  description: "Одна Taplink-страница Doctor Amal с основными направлениями и внешними ссылками"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}
