"use client";

import { Montserrat } from "next/font/google";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Select, Modal } from "antd";
import Highlighter from "react-highlight-words";
import bidStatuses from "@/utils/bidStatuses";
import bidClassification from "@/utils/bidClassification";
import FeaturedTenders from "./FeaturedTenders";
import data from "@/utils/bidsData";
import axios from "axios";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function BidsListHome() {
  const [bids, setBids] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isViewBidModalOpen, setIsViewBidModalOpen] = useState(false);
  const searchInput = useRef(null);

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

        setBids(_bids);
        // console.log("Bids: ", bids);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

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
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   ...getColumnSearchProps("status"),
    // },
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
            onClick={() => setIsViewBidModalOpen(true)}
            className="table-view-text"
          >
            View
          </p>
        );
      },
    },
  ];

  return (
    <section className={`BidsListHome ${montserrat.className}`}>
      <hr
        style={{
          width: "85%",
        }}
      />

      <p className={`BidsListHome-heading ${montserrat.className}`}>
        Latest bids
      </p>

      <div className="BidsListHome-actions-wrapper">
        <div className="BidsListHome-actions-input">
          <Input placeholder="Enter keywords" style={{ height: "3rem" }} />
        </div>

        <div className="BidsListHome-actions-select-status">
          <Select
            showSearch
            placeholder="Status"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={bidStatuses}
            style={{ width: "100%", height: "3rem" }}
          />
        </div>

        <div className="BidsListHome-actions-select-classification">
          <Select
            showSearch
            placeholder="Classification"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={bidClassification}
            style={{ width: "100%", height: "3rem" }}
          />
        </div>

        <div className="BidsListHome-actions-search-btn">
          <Button
            type="primary"
            style={{ width: "100%", height: "3rem", fontWeight: "bold" }}
          >
            Search
          </Button>
        </div>
      </div>

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
        title={<p className="modal-heading">Bid</p>}
        open={isViewBidModalOpen}
        onCancel={() => setIsViewBidModalOpen(false)}
        footer={false}
      >
        <p style={{ textAlign: "center" }}>(placeholder)</p>
      </Modal>
    </section>
  );
}
