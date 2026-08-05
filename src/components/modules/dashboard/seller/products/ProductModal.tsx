"use client";

import { X, Plus, Trash } from "lucide-react";
import { useState, useEffect } from "react";
import { Product } from "@/types";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<Product>) => void;
  product?: Product | null; // If null/undefined, we are creating a new product
}

const CATEGORIES = [
  { id: "1", category_name: "Tablets & Capsules", slug: "tablets-capsules" },
  { id: "2", category_name: "Syrups & Liquids", slug: "syrups-liquids" },
  { id: "3", category_name: "Inhalers & Sprays", slug: "inhalers-sprays" },
  { id: "4", category_name: "Ointments & Creams", slug: "ointments-creams" },
  { id: "5", category_name: "Medical Devices", slug: "medical-devices" },
  { id: "6", category_name: "Supplements & Vitamins", slug: "supplements-vitamins" },
];

const MANUFACTURERS = [
  { id: "1", name: "Square Pharmaceuticals", country: "Bangladesh" },
  { id: "2", name: "Incepta Pharmaceuticals", country: "Bangladesh" },
  { id: "3", name: "Beximco Pharmaceuticals", country: "Bangladesh" },
  { id: "4", name: "Opsonin Pharma", country: "Bangladesh" },
  { id: "5", name: "Renata Limited", country: "Bangladesh" },
  { id: "6", name: "Acme Laboratories", country: "Bangladesh" },
];

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}: ProductModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [retailsPrice, setRetailsPrice] = useState("");
  const [stock, setStock] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [manufacturerId, setManufacturerId] = useState("");
  const [discountType, setDiscountType] = useState<"NONE" | "PERCENTAGE" | "FIXED">("NONE");
  const [discountValue, setDiscountValue] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  // Fill in form values when editing a product
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDescription(product.description || "");
      setRetailsPrice(String(product.retails_price || ""));
      setStock(String(product.stock || "0"));
      setCategoryId(product.category?.id || CATEGORIES[0]?.id || "");
      setManufacturerId(product.manufacturer?.id || MANUFACTURERS[0]?.id || "");
      setDiscountType(product.discount_type || "NONE");
      setDiscountValue(String(product.discount_value || "0"));
      setPurchasePrice(String(product.purchase_price || ""));
      setImageUrls(product.image_url?.length ? [...product.image_url] : [""]);
    } else {
      // Clear form values when creating a new product
      setName("");
      setDescription("");
      setRetailsPrice("");
      setStock("");
      setCategoryId(CATEGORIES[0]?.id || "");
      setManufacturerId(MANUFACTURERS[0]?.id || "");
      setDiscountType("NONE");
      setDiscountValue("0");
      setPurchasePrice("");
      setImageUrls([""]);
    }
  }, [product, isOpen]);

  if (!isOpen) return null;

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleRemoveImageUrl = (index: number) => {
    if (imageUrls.length === 1) {
      setImageUrls([""]);
      return;
    }
    const updated = imageUrls.filter((_, idx) => idx !== index);
    setImageUrls(updated);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const updated = [...imageUrls];
    updated[index] = value;
    setImageUrls(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCategory = CATEGORIES.find((c) => c.id === categoryId);
    const selectedManufacturer = MANUFACTURERS.find((m) => m.id === manufacturerId);

    // Clean image URLs: remove empty ones. Fallback if empty.
    const cleanedImages = imageUrls.filter((url) => url.trim() !== "");
    if (cleanedImages.length === 0) {
      cleanedImages.push("https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60");
    }

    onSave({
      id: product?.id,
      name,
      description,
      retails_price: parseFloat(retailsPrice) || 0,
      purchase_price: parseFloat(purchasePrice) || 0,
      stock: parseInt(stock) || 0,
      discount_type: discountType,
      discount_value: parseFloat(discountValue) || 0,
      image_url: cleanedImages,
      category: selectedCategory
        ? {
            id: selectedCategory.id,
            category_name: selectedCategory.category_name,
            slug: selectedCategory.slug,
            description: "",
            icon_url: "",
            is_active: true,
            product_count: 0,
          }
        : undefined,
      manufacturer: selectedManufacturer
        ? {
            id: selectedManufacturer.id,
            name: selectedManufacturer.name,
            description: "",
            logo_url: "",
            country: selectedManufacturer.country,
            is_active: true,
            medicine_count: 0,
            created_at: "",
            updated_at: "",
          }
        : undefined,
      slug: product?.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/55 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-100 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? "Edit Product Info" : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-1.5 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Product Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Product Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Paracetamol 500mg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Detailed description of usage, dosage, and side effects..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none"
            />
          </div>

          {/* Grid for Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Purchase Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Purchase Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                min="0.01"
                placeholder="10.00"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Retails Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                required
                min="0.01"
                placeholder="12.99"
                value={retailsPrice}
                onChange={(e) => setRetailsPrice(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Stock Quantity *
              </label>
              <input
                type="number"
                required
                min="0"
                placeholder="150"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Grid for Relations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Category *
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Manufacturer Select */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Manufacturer *
              </label>
              <select
                value={manufacturerId}
                onChange={(e) => setManufacturerId(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all cursor-pointer"
              >
                {MANUFACTURERS.map((mfg) => (
                  <option key={mfg.id} value={mfg.id}>
                    {mfg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid for Discount */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-teal-50/50 p-4 rounded-xl border border-teal-100/50">
            {/* Discount Type */}
            <div>
              <label className="block text-sm font-semibold text-teal-900 mb-1.5">
                Discount Type
              </label>
              <select
                value={discountType}
                onChange={(e) => {
                  const val = e.target.value as "NONE" | "PERCENTAGE" | "FIXED";
                  setDiscountType(val);
                  if (val === "NONE") setDiscountValue("0");
                }}
                className="w-full px-4 py-2.5 bg-white border border-teal-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all cursor-pointer"
              >
                <option value="NONE">No Discount</option>
                <option value="PERCENTAGE">Percentage (%)</option>
                <option value="FIXED">Fixed Amount ($)</option>
              </select>
            </div>

            {/* Discount Value */}
            <div>
              <label className="block text-sm font-semibold text-teal-900 mb-1.5">
                Discount Value
              </label>
              <input
                type="number"
                min="0"
                disabled={discountType === "NONE"}
                placeholder={discountType === "PERCENTAGE" ? "10" : "2.00"}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-teal-200 disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
              />
            </div>
          </div>

          {/* Image URLs Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-semibold text-gray-700">
                Product Image URLs
              </label>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="flex items-center gap-1 text-xs font-bold text-teal-600 hover:text-teal-700 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Image
              </button>
            </div>

            <div className="space-y-2">
              {imageUrls.map((url, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={url}
                    onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                    className="flex-1 px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-900 text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(idx)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit & Cancel Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 active:bg-teal-800 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {product ? "Save Changes" : "Create Product"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
