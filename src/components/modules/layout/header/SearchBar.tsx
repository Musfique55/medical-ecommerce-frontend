"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/products/products.services";
import Link from "next/link";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 1000);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearchQuery],
    queryFn: () => getProducts({ searchTerm: debouncedSearchQuery }),
    enabled: debouncedSearchQuery.trim().length > 0,
  });

  return (
    <div className="flex-1 max-w-xl relative">
      <div className="hidden md:flex  ">
        <Input
          type="text"
          placeholder="Search for medicines, health products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pr-10"
        />
        <Button
          size="icon"
          className="absolute right-0 top-0 bg-teal-600 hover:bg-teal-700"
        >
          <Search className="size-4" />
        </Button>
      </div>
      {debouncedSearchQuery.length > 0 && (
        <div className="absolute bg-white w-full p-4 border rounded-md">
          {isLoading ? (
            <div>Loading...</div>
          ) : searchResults?.length === 0 ? (
            <div>No results found</div>
          ) : (
            searchResults?.map((item: any) => (
              <Link
                href={`/products/${item.slug}`}
                className="cursor-pointer block px-2 py-1 border-b hover:bg-gray-50"
                key={item.id}
              >
                {item.name}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
