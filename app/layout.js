import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Wounded Planet — Project Finance & ESG Platform",
  description:
    "Connecting climate capital with project opportunity. Where impact investors meet emerging market clean energy deals.",
  keywords: "project finance, ESG, clean energy, impact investing, solar, climate finance",
  openGraph: {
    title: "Wounded Planet",
    description: "Where Climate Capital Meets Project Opportunity",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
