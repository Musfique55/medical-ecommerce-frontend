"use client";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const BreadCrumbs = ({
  product_name,
  category_name,
}: {
  product_name: string;
  category_name: string;
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="bg-white border border-blue-100 mt-5">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-4" />
            Back to Shop
          </button>
          <ChevronRight className="size-4 text-gray-400" />
          <span className="text-gray-600">{category_name}</span>
          <ChevronRight className="size-4 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-xs">
            {product_name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreadCrumbs;
