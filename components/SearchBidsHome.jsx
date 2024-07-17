import bidClassification from "@/utils/bidClassification";
import bidStatuses from "@/utils/bidStatuses";
import { Button, Input, Select } from "antd";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function SearchBidsHome() {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [status, setStatus] = useState("");
  const [classification, setClassification] = useState("");

  const router = useRouter();

  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onSearchBid = () => {
    console.log(`
        Search keywords: ${searchKeywords}
        Status: ${status}
        Classification: ${classification}
      `);

    router.push(
      `/search-bids?searchKeywords=${searchKeywords}&status=${status}&classification=${classification}`
    );
  };

  return (
    <div className="SearchBidsHome">
      <hr
        style={{
          width: "85%",
        }}
      />

      <p className={`SearchBidsHome-heading ${montserrat.className}`}>
        Latest bids
      </p>

      <div className="SearchBidsHome-actions-wrapper">
        <div className="SearchBidsHome-actions-input">
          <Input
            placeholder="Enter keywords"
            style={{ height: "3rem" }}
            onChange={(e) => setSearchKeywords(e.target.value)}
          />
        </div>

        <div className="SearchBidsHome-actions-select-status">
          <Select
            showSearch
            placeholder="Status"
            optionFilterProp="children"
            onChange={(value) => setStatus(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={bidStatuses}
            style={{ width: "100%", height: "3rem" }}
          />
        </div>

        <div className="SearchBidsHome-actions-select-classification">
          <Select
            showSearch
            placeholder="Classification"
            optionFilterProp="children"
            onChange={(value) => setClassification(value)}
            onSearch={onSearch}
            filterOption={filterOption}
            options={bidClassification}
            style={{ width: "100%", height: "3rem" }}
          />
        </div>

        <div className="SearchBidsHome-actions-search-btn">
          <Button
            onClick={onSearchBid}
            type="primary"
            style={{ width: "100%", height: "3rem", fontWeight: "bold" }}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
