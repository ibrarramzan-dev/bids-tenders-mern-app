"use client";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import BidsListHome from "@/components/BidsListHome";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { loadBids } from "./AppState/Features/bids/bidsSlice";
import { useEffect } from "react";
import axios from "axios";
import { formatTimeForTable } from "@/utils/helpers";
import SearchBidsHome from "@/components/SearchBidsHome";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/bids")
      .then((res) => {
        const bids = res.data;

        const _bids = formatTimeForTable(bids);
        dispatch(loadBids(_bids));
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  return (
    <main>
      <HomeBanner />
      <SearchBidsHome />
      <BidsListHome />
    </main>
  );
}
