import ProductInfo from "@/components/modules/product-details/ProductInfo";
import { productServices } from "@/services/products/products.services";
import { Product } from "@/types";



export const generateStaticParams = async() => {
    const {data} = await productServices.getProducts();
    return data?.data.map((product : Product) => ({id : product.id})).splice(0,3);
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const productData = await productServices.getProduct(slug[1]);


  
  return (
    <div>
      <div className="container mx-auto px-6 py-12 lg:py-16">
        {/* Main Product Section */}
        <ProductInfo product={productData.data?.data}/>
      </div>
    </div>
  );
};

export default ProductDetails;
