import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AuditRoute | Control de combustible para pequeñas flotillas",
  description:
    "Detecta fugas de combustible, valida kilometraje y controla rutas desde el celular de tus choferes, sin instalar GPS costosos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
