import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import BidsListHome from "@/components/BidsListHome";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <HomeBanner />
      <BidsListHome />
    </main>
  );
}
