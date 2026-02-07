import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Product } from "@/types";
import { AlertCircle, Badge, Check, Star } from "lucide-react";

const productInfo = {
  dosage:
    "Take 1-2 tablets every 4-6 hours as needed. Do not exceed 6 tablets in 24 hours.",
  ingredients:
    "Active Ingredient: Acetaminophen 500mg. Inactive Ingredients: Corn starch, microcrystalline cellulose, sodium starch glycolate.",
  warnings: [
    "Do not take more than directed",
    "Consult a doctor before use if you have liver disease",
    "Stop use and ask a doctor if pain persists for more than 10 days",
    "Keep out of reach of children",
  ],
  benefits: [
    "Fast-acting pain relief",
    "Reduces fever effectively",
    "Gentle on stomach",
    "Non-drowsy formula",
  ],
};

const TabsSection = ({product} : {product : Product}) => {
  return (
    <div className="mb-16">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="w-full justify-start bg-white border-b border-blue-100 rounded-none h-auto p-0 gap-8">
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 py-4 text-base font-semibold"
          >
            Details
          </TabsTrigger>
          <TabsTrigger
            value="usage"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 py-4 text-base font-semibold"
          >
            Usage & Dosage
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-0 py-4 text-base font-semibold"
          >
            Reviews ({product?.reviews?.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Key Benefits
              </h3>
              <ul className="space-y-4">
                {productInfo.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-lg p-1 mt-0.5">
                      <Check className="size-4 text-green-600" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Ingredients
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {productInfo.ingredients}
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="usage" className="mt-8">
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Dosage Instructions
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {productInfo.dosage}
              </p>
            </div>

            <div className="bg-amber-50 rounded-3xl p-8 border border-amber-200">
              <div className="flex items-start gap-4">
                <div className="bg-amber-200 rounded-2xl p-3">
                  <AlertCircle className="size-8 text-amber-700" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Warnings & Precautions
                  </h3>
                  <ul className="space-y-3">
                    {productInfo.warnings.map((warning, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-amber-700 font-bold mt-1">•</span>
                        <span className="text-gray-700 leading-relaxed">
                          {warning}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-8">
          <div className="space-y-6">
            {/* Review Summary */}
            <div className="bg-white rounded-3xl p-8 border border-blue-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-center md:text-left">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {product?.rating}
                  </div>
                  <div className="flex items-center justify-center md:justify-start mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`size-6 ${
                          i < Math.floor(product?.rating)
                            ? "text-amber-400 fill-amber-400"
                            : "text-gray-300 fill-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">
                    Based on {product?.reviews?.length} reviews
                  </p>
                </div>
                <div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 h-14 text-base font-semibold rounded-2xl">
                    Write a Review
                  </Button>
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {product.reviews.length > 0 && product.reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-3xl p-8 border border-blue-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold text-gray-900">
                          {review.author.name}
                        </h4>
                       
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 rounded-lg px-2 py-0.5 text-xs">
                            ✓ Verified Purchase
                          </Badge>
                      
                      </div>
                      <p className="text-sm text-gray-500">{review.created_at}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${
                            i < review.rating
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300 fill-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {review.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabsSection;
