"use client";
import FullScreenLoader from "@/components/FullScreenLoader";
import SearchResultsBids from "@/components/SearchResultsBids";
import { formatTimeForTable } from "@/utils/helpers";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBids() {
  const [searchResults, setSearchResults] = useState([]);
  const [showSpin, setShowSpin] = useState(true);

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

        const filteredBids = _bids.filter(
          (bid) =>
            bid.title.toLowerCase().includes(keywords.toLowerCase()) ||
            bid.description.toLowerCase().includes(keywords.toLowerCase())
        );

        setSearchResults(filteredBids);
        setShowSpin(false);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  console.log("Search results: ", searchResults);

  return (
    <div>
      {showSpin && <FullScreenLoader />}
      <p className="page-heading">Search Bids</p>

      <SearchResultsBids list={searchResults} />
    </div>
  );
}
