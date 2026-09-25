import { ClassesSection } from "@/components/ClassesSection";
import { CompetitionsSection } from "@/components/CompetitionsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { NewsSection } from "@/components/NewsSection";
import { StylesSection } from "@/components/StylesSection";
import { TeachersSection } from "@/components/TeachersSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <div className="marquee" aria-label="Các phong cách nổi bật">
          <div>
            <span>Street dance</span><i />
            <span>Hip-hop</span><i />
            <span>K-pop</span><i />
            <span>Latin</span><i />
            <span aria-hidden="true">Street dance</span><i aria-hidden="true" />
            <span aria-hidden="true">Hip-hop</span><i aria-hidden="true" />
            <span aria-hidden="true">K-pop</span><i aria-hidden="true" />
            <span aria-hidden="true">Latin</span><i aria-hidden="true" />
          </div>
        </div>
        <ClassesSection />
        <StylesSection />
        <TeachersSection />
        <CompetitionsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
