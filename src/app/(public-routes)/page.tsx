import Benefits from "@/components/modules/home/Benefits";
import { Categories } from "@/components/modules/home/Categories";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import { Hero } from "@/components/modules/home/Hero";
import { TrustBadges } from "@/components/modules/home/TrustBadges";
import { getProducts } from "@/services/products/products.services";
import { getCategories } from "@/services/categories/categories.services";

export default async function Home() {
  const productsPromise = getProducts({
    isFeatured: true,
  });
  const categoriesPromise = getCategories();

  return (
    <>
      <Hero />
      <Categories categoriesPromise={categoriesPromise} />
      <FeaturedProducts productsPromise={productsPromise} />
      <Benefits />
      <TrustBadges />
    </>
  );
}
