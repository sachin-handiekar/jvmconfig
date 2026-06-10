import { Roboto } from "next/font/google";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import "../App.css";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  title: "JVM Config Generator",
  description:
    "JVM Options Configuration Tool - A JVM config tool to configure flags/parameters used in changing the behaviour, debugging and many more features within the JVM.",
  keywords: [
    "java",
    "jdk",
    "jvm",
    "JVM",
    "config",
    "memory",
    "garbage collection",
    "GC",
    "options",
    "diagnostic",
    "performance",
  ],
  authors: [{ name: "Sachin Handiekar", url: "https://sachinhandiekar.com/" }],
  verification: {
    google: "4qKENUnCgn-C0xX3hWCtcbDhXB-E8bAKnxOAxHVz18Y",
  },
  manifest: "/manifest.json",
  icons: {
    shortcut: "/favicon.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable}>
      {/* suppressHydrationWarning: browser extensions (e.g. Grammarly) inject
          attributes into <body> before hydration */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
