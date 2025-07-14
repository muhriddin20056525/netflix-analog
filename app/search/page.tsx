import SearchClient from "@/components/SearchClient";
import { Suspense } from "react";

export default function SearchPage() {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Yuklanmoqda...</div>}>
        <SearchClient />
      </Suspense>
    </div>
  );
}
