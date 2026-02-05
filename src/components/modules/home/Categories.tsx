
import { Category } from '@/types';
import { Pill, Heart, Thermometer, Stethoscope, Baby, Leaf } from 'lucide-react';


// const categories = [
//   { icon: Pill, name: 'Pain Relief', color: 'bg-red-100 text-red-600' },
//   { icon: Heart, name: 'Vitamins', color: 'bg-orange-100 text-orange-600' },
//   { icon: Thermometer, name: 'Cold & Flu', color: 'bg-blue-100 text-blue-600' },
//   { icon: Stethoscope, name: 'First Aid', color: 'bg-green-100 text-green-600' },
//   { icon: Baby, name: 'Baby Care', color: 'bg-pink-100 text-pink-600' },
//   { icon: Leaf, name: 'Herbal', color: 'bg-teal-100 text-teal-600' },
// ];

export function Categories({categories} : {categories : {data : Category[]}}) {
    // const categories = use(categoryPromise);
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.data &&
          categories.data.map((category : Category) => (
            <button
              key={category.category_name}
              className="bg-white rounded-xl p-6 hover:shadow-lg transition-shadow text-center group"
            >
              {/* <div className={` size-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <category.icon_url className="size-8" />
              </div> */}
              <h3 className="font-semibold text-gray-900">{category.category_name}</h3>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
