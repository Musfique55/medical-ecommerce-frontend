import Benefits from "@/components/modules/home/Benefits";
import { Categories } from "@/components/modules/home/Categories";
import FeaturedProducts from "@/components/modules/home/FeaturedProducts";
import { Hero } from "@/components/modules/home/Hero";
import { TrustBadges } from "@/components/modules/home/TrustBadges";
import { categoryServices } from "@/services/categories/categories.services";
import { productServices } from "@/services/products/products.services";



export default async function Home() {
  const categoriesData =  categoryServices.getCategories();
  const productsData =  productServices.getProducts();
  const [categories,products] = await Promise.all([
    categoriesData,productsData
  ]);

  // console.log(products);
  return (
    <>
      <Hero />
      <Categories categories={categories}/>
      <FeaturedProducts products={products.data}/>
      <Benefits />
      <TrustBadges />
    </>
  );
}
