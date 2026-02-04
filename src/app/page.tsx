import { Categories } from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
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
    </>
  );
}
