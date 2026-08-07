import BreadCrumbs from "@/components/modules/product-details/BreadCrumbs";
import ProductInfo from "@/components/modules/product-details/ProductInfo";
import { getProduct, getProducts } from "@/services/products/products.services";
import { Product } from "@/types";

export const revalidate = 60;

export const generateStaticParams = async () => {
  const data = await getProducts();
  return data
    .slice(0, 10)
    .map((product: Product) => ({ slug: [product.slug] }));
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) => {
  const { slug } = await params;

  const productData = await getProduct(slug[0]);

  return (
    <div>
      <BreadCrumbs
        product_name={productData?.data?.name}
        category_name={productData?.data?.category_name}
      />
      <div className="container mx-auto px-6 py-12 lg:py-16">
        {/* Main Product Section */}
        <ProductInfo product={productData.data} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
