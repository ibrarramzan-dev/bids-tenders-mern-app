"use client";
import SearchResultsBids from "@/components/SearchResultsBids";
import { formatTimeForTable } from "@/utils/helpers";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBids() {
  const [searchResults, setSearchResults] = useState([]);

  const searchParams = useSearchParams();

  const keywords = searchParams.get("keywords");
  const status = searchParams.get("status");
  const classification = searchParams.get("classification");

  useEffect(() => {
    axios
      .get(`/api/bids/search?status=${status}&classification=${classification}`)
      .then((res) => {
        const bids = res.data;

        const _bids = formatTimeForTable(bids);

        setSearchResults(_bids);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  console.log("Search results: ", searchResults);

  return (
    <div>
      <SearchResultsBids list={searchResults} />
    </div>
  );
}
