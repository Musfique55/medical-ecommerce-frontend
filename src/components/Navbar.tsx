"use client";
import { Category } from "@/types/category";
import Link from "next/link";
import { use } from "react";

const Navbar = ({ categoryPromise }: {categoryPromise : Promise<{data : Category[]}>}) => {
  const categories = use(categoryPromise);
  return (
    <div>
      <nav className="border-t hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-3 text-sm">
            <li>
              <Link
                href="#"
                className="text-teal-700 font-semibold hover:text-teal-800"
              >
                All Categories
              </Link>
            </li>
            {categories?.data &&
              categories.data.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/category/${item.slug}`}
                    className="text-teal-700 font-semibold hover:text-teal-800"
                  >
                    {item.category_name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
