import { Anek_Odia } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const anekOdia = Anek_Odia({ subsets: ["latin"] });

export const metadata = {
  title: "Organize Yourself - Uma ajuda para o seu dia-a-dia",
  description:
    "Uma aplicação para ajudar as pessoas a organizarem seu dia-a-dia através de listas, objetivos, etc.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={anekOdia.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
