import { Categories } from "@/components/Categories";
import { Hero } from "@/components/Hero";
import { categoryServices } from "@/modules/categories/categories.services";
import { Suspense } from "react";


export default function Home() {
  const categories = categoryServices.getCategories();
  return (
    <>
      <Hero />
      <Suspense>

      <Categories categoryPromise={categories}/>
      </Suspense>
    </>
  );
}
