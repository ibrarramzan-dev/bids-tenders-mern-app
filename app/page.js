"use client";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import BidsListHome from "@/components/BidsListHome";
import Footer from "@/components/Footer";
import { useDispatch } from "react-redux";
import { loadBids } from "./AppState/Features/bids/bidsSlice";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/api/bids")
      .then((res) => {
        const bids = res.data;

        const _bids = bids.map((bid) => {
          const publishedDate = bid.createdAt.split("T")[0];
          const submissionClosingDateArr = bid.submissionClosingDate.split("T");
          const submissionClosingDate = submissionClosingDateArr[0];
          const submissionClosingTime = submissionClosingDateArr[1];
          const submissionClosingTimeArr = submissionClosingTime.split(":");
          const _submissionClosingTime = `${submissionClosingTimeArr[0]}:${submissionClosingTimeArr[1]}`;

          bid.createdAt = publishedDate;
          bid.submissionClosingDate = `${submissionClosingDate} ${_submissionClosingTime}`;

          return bid;
        });

        dispatch(loadBids(_bids));
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  return (
    <main>
      <HomeBanner />
      <BidsListHome />
    </main>
  );
}
