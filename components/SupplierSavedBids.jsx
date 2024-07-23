"use client";

import { useState, useRef, useEffect } from "react";
import { Table, Input, Space, Button, Modal } from "antd";
import Image from "next/image";
import { SearchOutlined } from "@ant-design/icons";
import data from "@/utils/bidsData";
import { useSelector } from "react-redux";
import axios from "axios";
import { formatTimeForTable, isBidClosed } from "@/utils/helpers";

export default function SupplierSavedBids() {
  const [bids, setBids] = useState([]);
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isSubmittedBidModalOpen, setIsSubmittedBidModalOpen] = useState(false);
  const { data } = useSelector((state) => state.user);
  const searchInput = useRef(null);

  useEffect(() => {
    axios
      .get(`/api/bids/supplier-saved/${data._id}`)
      .then((res) => {
        const bids = res.data;

        const _bids = formatTimeForTable(bids);
        setBids(_bids);
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
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (text, record) => {
        return (
          <div className="table-cell-flex-box">
            <Image src={record.agencyLogo} alt={text} width={20} height={20} />
            <p style={{ textAlign: "center" }}>{record.agencyName}</p>
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
            onClick={() => setIsSubmittedBidModalOpen(true)}
            className="table-view-text"
          >
            View
          </p>
        );
      },
    },
  ];

  return (
    <div className="SupplierSavedBids">
      <p className="dashboard-heading">Saved Bids</p>

      <Table
        columns={columns}
        dataSource={bids}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 1200, y: 400 }}
      />

      <Modal
        title={<p className="modal-heading">Submitted Bid</p>}
        open={isSubmittedBidModalOpen}
        onCancel={() => setIsSubmittedBidModalOpen(false)}
        footer={false}
      >
        <p style={{ textAlign: "center" }}>(placeholder)</p>
      </Modal>
    </div>
  );
}
