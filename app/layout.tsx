import type { Metadata } from "next";
import Link from "next/link";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Doctor Amal",
  description: "Локальная платформа образовательных курсов Doctor Amal"
};

const navigation = [
  { href: "/", label: "Главная" },
  { href: "/doctor", label: "О докторе" },
  { href: "/courses", label: "Курсы" },
  { href: "/articles", label: "Статьи" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            Doctor Amal
          </Link>
          <nav className="site-nav" aria-label="Основная навигация">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="site-main">{children}</main>
      </body>
    </html>
  );
}
