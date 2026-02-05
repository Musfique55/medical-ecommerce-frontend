import { ProductCard } from '../layout/ProductCard';
import { Product } from '@/types';

const FeaturedProducts = ({products} : {products : {data :Product[]}}) => {
    // console.dir(products,{depth : Infinity});
    // return;
    return (
        <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Top-rated OTC medicines and supplements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products?.data && products?.data.length &&
            products.data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                // onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    );
};

export default FeaturedProducts;