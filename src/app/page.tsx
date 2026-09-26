import { Hero } from "@/components/home/Hero";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PopularSection } from "@/components/home/PopularSection";
import { PacksSection } from "@/components/home/PacksSection";
import { FinderSection } from "@/components/home/FinderSection";
import { CustomCtaSection } from "@/components/home/CustomCtaSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <PopularSection />
      <PacksSection />
      <FinderSection />
      <CustomCtaSection />
    </>
  );
}
