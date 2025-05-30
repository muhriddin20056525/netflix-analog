"use client";

import SearchCard from "@/components/SearchCard";
import { getSearchResults } from "@/lib/tmdb";
import { MovieProps } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const router = useRouter();

  const [searchedData, setSearchedData] = useState<MovieProps[]>([]);

  useEffect(() => {
    if (!q) {
      toast.error("Enter movie Name");
      return;
    }

    const getData = async () => {
      const [tv, movie] = await Promise.all([
        getSearchResults("tv", q),
        getSearchResults("movie", q),
      ]);

      const combinedResults = [...(tv || []), ...(movie || [])];

      setSearchedData(combinedResults);
    };

    getData();
  }, [q]);

  return (
    <div className="p-10">
      <button
        onClick={() => router.back()}
        className="bg-blue-900 text-white fixed py-2 px-4 rounded-md font-bold"
      >
        Go Back
      </button>
      <div>
        {searchedData.length > 0 ? (
          searchedData.map((item) => <SearchCard key={item.id} item={item} />)
        ) : (
          <div className="w-full flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No Results Found
            </h2>
            <p className="text-gray-600 text-base max-w-md">
              We couldn’t find any movies or TV shows matching your search. Try
              using different keywords.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
