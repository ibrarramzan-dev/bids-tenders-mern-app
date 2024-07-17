import { Montserrat } from "next/font/google";
import SearchResultsBidsItem from "./SearchResultsBidsItem";
import { useState } from "react";
import { Modal } from "antd";
import ViewBid from "./ViewBid";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function SearchResultsBids({ list }) {
  const [isViewBidModalOpen, setIsViewBidModalOpen] = useState(false);
  const [activeViewBid, setActiveViewBid] = useState({});

  const onItemClick = (bid) => {
    console.log("Item bid: ", bid);
    setActiveViewBid(bid);
    setIsViewBidModalOpen(true);
  };

  return (
    <div className={`SearchResultsBids ${montserrat.className}`}>
      {list.map((bid) => (
        <SearchResultsBidsItem onItemClick={onItemClick} bid={bid} />
      ))}

      {list.length === 0 ? (
        <p className="no-results-text">
          <br />
          <br />
          <br />
          <br /> No results
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </p>
      ) : null}

      <Modal
        title={<p className="modal-heading">Bid</p>}
        open={isViewBidModalOpen}
        onCancel={() => setIsViewBidModalOpen(false)}
        footer={false}
      >
        <ViewBid bid={activeViewBid} />
      </Modal>
    </div>
  );
}
