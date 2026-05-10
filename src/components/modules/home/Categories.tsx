"use client";
import { Category } from "@/types";
import Link from "next/link";
import { use } from "react";

export function Categories({
  categoriesPromise,
}: {
  categoriesPromise: Promise<Category[]>;
}) {
  const categories = use(categoriesPromise);
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories &&
            categories.length &&
            categories.map((category) => (
              <Link
                href={`/category?category=${category.slug}`}
                key={category.id}
              >
                <button className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow text-center group cursor-pointer">
                  <h3 className="font-semibold text-gray-900">
                    {category.category_name}
                  </h3>
                </button>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
