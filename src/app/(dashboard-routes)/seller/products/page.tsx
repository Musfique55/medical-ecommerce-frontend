import SellerProductsClient from "@/components/modules/dashboard/seller/products/SellerProductsClient";
import { getSellerProducts } from "@/services/products/products.services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seller Products | LUXE. Medical Ecommerce",
  description:
    "Manage your medicine store catalog, monitor stock, and offer discounts.",
};

export const dynamic = "force-dynamic";

export default async function SellerProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{
    searchTerm?: string | undefined;
    category?: string | undefined;
  }>;
}) {
  const params = await searchParams;
  const medicines = await getSellerProducts(params);
  return (
    <div className="min-h-screen bg-gray-50/50">
      <SellerProductsClient initialData={medicines} />
    </div>
  );
}
