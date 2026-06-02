import type { Metadata } from "next";
import { League_Spartan, Open_Sans } from "next/font/google";
import "@/styles/globals.css";
import { ApolloProvider } from "@/lib/graphql/ApolloProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BJJ Recovery | Recuperación muscular para deportistas",
    template: "%s | BJJ Recovery",
  },
  description:
    "Productos de recuperación muscular por y para deportistas de artes marciales. Envío incluido a todo el país.",
  openGraph: {
    siteName: "BJJ Recovery",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${leagueSpartan.variable} ${openSans.variable} font-body`}
      >
        <ApolloProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </ApolloProvider>
      </body>
    </html>
  );
}
