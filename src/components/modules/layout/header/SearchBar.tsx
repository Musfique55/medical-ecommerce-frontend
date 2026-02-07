import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


const SearchBar = () => {
  return (
    <div className="hidden md:flex flex-1 max-w-xl relative">
      <Input
        type="text"
        placeholder="Search for medicines, health products..."
        className="pr-10"
      />
      <Button
        size="icon"
        className="absolute right-0 top-0 bg-teal-600 hover:bg-teal-700"
      >
        <Search className="size-4" />
      </Button>
    </div>
  );
};

export default SearchBar;
