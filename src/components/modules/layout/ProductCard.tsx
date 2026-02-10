"use client"
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import Image from 'next/image';
import { discountType, Product } from '@/types';
import Link from 'next/link';




interface ProductCardProps {
  product: Product;
//   onAddToCart: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const price = product?.discount_type === discountType.FIXED
    ? Math.round((Number(product?.retails_price) - product?.discount_value)) 
    : product?.discount_type === discountType.PERCENTAGE ? 
    (Number(product?.retails_price) - (Number(product?.retails_price) * product?.discount_value) / 100)
    : product?.retails_price;

  const sanitizeUrl = (slug : string) => {
    const url = slug.split(" ").join("-");
    return url; 
  }
    
  return (
    <Link href={`/products/${sanitizeUrl(product.name)}/${product.id}`} className="bg-white rounded-xl border hover:shadow-lg transition-shadow duration-300 overflow-hidden group max-h-[430px]">
      <div className="relative overflow-hidden">
        <Image
          src={product.image_url[0]}
          alt={product.name}
          height={200}
          width={200}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.discount_value > 0 && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600">
            {product.discount_value}% OFF
          </Badge>
        )}
        {!product.stock  && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-4 py-2 rounded-lg font-semibold">Out of Stock</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/90 hover:bg-white"
        >
          <Heart className="size-4" />
        </Button>
      </div>

      <div className="p-4">
        <div className="text-xs text-teal-600 font-semibold mb-1">{product.category.category_name}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-10">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{product.description}</p>
        
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`size-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          {/* <span className="text-xs text-gray-500">({product.reviews})</span> */}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="text-2xl font-bold text-teal-700">${Number(price).toFixed?.(2)}</div>
            {product?.discount_value > 0 && (
              <div className="text-sm text-gray-400 line-through">
                ${product?.retails_price ? Number(product.retails_price)?.toFixed?.(2) : 0}   
              </div>
             )}
          </div>
          <Button 
            size="icon" 
            className="bg-teal-600 hover:bg-teal-700"
            // onClick={() => onAddToCart(product)}
            disabled={!product.stock}
          >
            <ShoppingCart className="size-5" />
          </Button>
        </div>
      </div>
    </Link>
  );
}
