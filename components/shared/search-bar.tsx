import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar({ placeholder, actionLabel = "Search" }: { placeholder: string; actionLabel?: string }) {
  return (
    <div className="surface-card flex flex-col gap-3 rounded-[28px] p-3 md:flex-row md:items-center">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-muted)]" />
        <Input placeholder={placeholder} className="border-none bg-transparent pl-10 shadow-none focus:ring-0" />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="justify-center">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        <Button>{actionLabel}</Button>
      </div>
    </div>
  );
}
