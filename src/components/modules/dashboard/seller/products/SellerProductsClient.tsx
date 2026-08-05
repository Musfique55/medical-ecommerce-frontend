"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Product } from "@/types";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSellerProducts,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
  updateSellerProductStock,
} from "@/services/products/products.services";

import ProductStats from "./ProductStats";
import ProductFilters from "./ProductFilters";
import ProductTable from "./ProductTable";
import ProductModal from "./ProductModal";

interface SellerProductsClientProps {
  initialData?: any;
}

export default function SellerProductsClient({
  initialData,
}: SellerProductsClientProps) {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProductForEdit, setSelectedProductForEdit] =
    useState<Product | null>(null);

  const products: Product[] = initialData?.data || [];

  // React Query: Mutations
  const createMutation = useMutation({
    mutationFn: createSellerProduct,
    onSuccess: (res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("New product added to inventory!");
        queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create product");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Record<string, unknown> }) =>
      updateSellerProduct(id, data),
    onSuccess: (res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Product details updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update product");
    },
  });

  const updateStockMutation = useMutation({
    mutationFn: ({ id, stock }: { id: string; stock: number }) =>
      updateSellerProductStock(id, stock),
    onSuccess: (res) => {
      if (!res.error) {
        queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      }
    },
    onError: (err: any) => {
      console.error("Stock update failed: ", err);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSellerProduct,
    onSuccess: (res) => {
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Product deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["seller-products"] });
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete product");
    },
  });

  // Filter logic
  const filteredProducts = products.filter((prod) => {
    const matchesSearch =
      prod.name.toLowerCase().includes(search.toLowerCase()) ||
      (prod.description &&
        prod.description.toLowerCase().includes(search.toLowerCase()));

    const matchesCategory =
      categoryFilter === "ALL" ||
      prod.category?.category_name === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Extract categories dynamically
  const categoriesList = Array.from(
    new Set(products.map((p) => p?.category_name).filter(Boolean)),
  ) as string[];

  // Save handler for Add/Edit Form
  const handleSaveProduct = async (productData: Partial<Product>) => {
    // Construct database request body
    const dataBody: Record<string, unknown> = {
      name: productData.name,
      description: productData.description,
      retails_price: productData.retails_price,
      purchase_price: productData.purchase_price,
      category_id: productData.category?.id,
      manufacturer_id: productData.manufacturer?.id,
      discount_type: productData.discount_type,
      discount_value: productData.discount_value,
      image_url: productData.image_url,
    };

    if (productData.id) {
      // Update logic
      updateMutation.mutate({ id: productData.id, data: dataBody });

      // If stock has been updated, dispatch stock PATCH request
      if (
        productData.stock !== undefined &&
        productData.stock !== selectedProductForEdit?.stock
      ) {
        updateStockMutation.mutate({
          id: productData.id,
          stock: productData.stock,
        });
      }
    } else {
      // Create logic (include initial stock)
      dataBody.stock = productData.stock || 0;
      createMutation.mutate(dataBody);
    }

    setIsProductModalOpen(false);
    setSelectedProductForEdit(null);
  };

  // Delete trigger via toast confirmation
  const handleDeleteTrigger = (product: Product) => {
    toast.warning(`Delete "${product.name}"?`, {
      description: "This will permanently remove the product from inventory.",
      action: {
        label: "Delete",
        onClick: () => {
          deleteMutation.mutate(product.id);
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 8000,
    });
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Manage Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Create, view, update, and organize your medical products inventory.
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedProductForEdit(null);
            setIsProductModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Product stats */}
      <ProductStats products={products} />

      {/* Search & Filters */}
      <ProductFilters
        categories={categoriesList}
        selectedCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />

      {/* Products table list */}
      <ProductTable
        products={filteredProducts}
        onEdit={(product) => {
          setSelectedProductForEdit(product);
          setIsProductModalOpen(true);
        }}
        onDelete={handleDeleteTrigger}
      />

      {/* Create / Edit Modal */}
      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => {
          setIsProductModalOpen(false);
          setSelectedProductForEdit(null);
        }}
        onSave={handleSaveProduct}
        product={selectedProductForEdit}
      />
    </div>
  );
}
