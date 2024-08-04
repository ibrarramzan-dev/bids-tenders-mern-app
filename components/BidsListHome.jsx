"use client";

import { Montserrat } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Modal, notification } from "antd";
import Highlighter from "react-highlight-words";
import bidStatuses from "@/utils/bidStatuses";
import bidClassification from "@/utils/bidClassification";
import FeaturedTenders from "./FeaturedTenders";
import data from "@/utils/bidsData";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import ViewBid from "./ViewBid";
import { formatTimeForTable, isBidClosed } from "@/utils/helpers";
import { loadBids } from "@/app/AppState/Features/bids/bidsSlice";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function BidsListHome() {
  const [isSaved, setIsSaved] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isViewBidModalOpen, setIsViewBidModalOpen] = useState(false);
  const [activeViewBid, setActiveViewBid] = useState({});
  const bids = useSelector((state) => state.bids);

  const dispatch = useDispatch();

  useEffect(() => {}, [bids]);

  const searchInput = useRef(null);

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Bid name",
      dataIndex: "title",
      key: "title",
      fixed: "left",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      // ...getColumnSearchProps("status"),
      render: (text, record) => {
        return (
          <div>
            {isBidClosed(record.submissionClosingDate) ? "Closed" : "Open"}
          </div>
        );
      },
    },
    {
      title: "Published date",
      dataIndex: "createdAt",
      key: "createdAt",
      ...getColumnSearchProps("createdAt"),
    },
    {
      title: "Closing date",
      dataIndex: "submissionClosingDate",
      key: "submissionClosingDate",
      ...getColumnSearchProps("submissionClosingDate"),
    },
    {
      title: "Organization",
      dataIndex: "agencyName",
      key: "agencyName",
      render: (text, record) => {
        return (
          <div className="table-cell-flex-box">
            <Image src={record.agencyLogo} alt={text} width={20} height={20} />
            <p style={{ textAlign: "center" }}>{text}</p>
          </div>
        );
      },
    },
    {
      title: "View",
      key: "view",
      render: (text, record) => {
        return (
          <p
            onClick={() => {
              setIsViewBidModalOpen(true);
              setActiveViewBid(record);
            }}
            className="table-view-text"
          >
            View
          </p>
        );
      },
    },
  ];

  const onBidApplied = (title) => {
    axios
      .get("/api/bids")
      .then((res) => {
        const bids = res.data;
        const _bids = formatTimeForTable(bids);
        dispatch(loadBids(_bids));

        notification.success({
          message: "Success",
          description: `You've applied to Bid ${title}`,
        });

        setIsViewBidModalOpen(false);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const onBidSave = (title) => {
    axios
      .get("/api/bids")
      .then((res) => {
        const bids = res.data;
        const _bids = formatTimeForTable(bids);
        dispatch(loadBids(_bids));

        notification.success({
          message: "Success",
          description: `Bid ${title} has been saved`,
        });

        setIsViewBidModalOpen(false);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <section className={`BidsListHome ${montserrat.className}`}>
      <FeaturedTenders />

      <div className="BidsListHome-table-wrapper">
        <Table
          columns={columns}
          dataSource={bids}
          pagination={{ pageSize: 50 }}
          scroll={{ x: 1200, y: 400 }}
          style={{ width: "95%" }}
        />
      </div>

      <Modal
        // title={<p className="modal-heading">Bid</p>}
        open={isViewBidModalOpen}
        onCancel={() => setIsViewBidModalOpen(false)}
        footer={false}
      >
        <ViewBid
          bid={activeViewBid}
          onBidSave={onBidSave}
          onBidApplied={onBidApplied}
        />
      </Modal>
    </section>
  );
}
