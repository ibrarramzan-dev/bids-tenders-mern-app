"use client";

import { useEffect, useRef, useState } from "react";
import {
  Modal,
  Table,
  Input,
  Space,
  Button,
  Image,
  Form,
  DatePicker,
  Checkbox,
  Select,
} from "antd";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useSelector } from "react-redux";
import axios from "axios";
import { bidsFormatTimeForTable } from "@/utils/helpers";
import ClientEditBid from "./ClientEditBid";

export default function ClientPublishedBids() {
  const [bids, setBids] = useState([]);
  const [activeEditBid, setActiveEditBid] = useState({});
  const [searchedColumn, setSearchedColumn] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isViewBidModalOpen, setIsViewBidModalOpen] = useState(false);
  const [isEditBidModalOpen, setIsEditBidModalOpen] = useState(false);
  const { user } = useSelector((state) => state);

  console.log("user: ", user);
  useEffect(() => {
    if (user.data._id) {
      axios
        .get(`/api/bids/client-published/${user.data._id}`)
        .then((res) => {
          const bids = res.data;

          const _bids = bidsFormatTimeForTable(bids);
          setBids(_bids);
        })
        .catch((err) => console.log("Error: ", err));
    }
  }, [user]);

  const searchInput = useRef(null);

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
      ...getColumnSearchProps("status"),
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
      title: "Actions",
      key: "actions",
      render: (text, record) => {
        return (
          <div className="ClientDashboard-action-cell-texts">
            <p>
              <span
                onClick={() => {
                  setActiveEditBid(record);
                  setIsEditBidModalOpen(true);
                }}
                className="ClientDashboard-action-cell-texts-item"
              >
                Edit
              </span>
              <span className="ClientDashboard-action-cell-texts-item-separator-dot">
                .
              </span>
              <span className="ClientDashboard-action-cell-texts-item">
                Delete
              </span>
            </p>
            <p>
              <span className="ClientDashboard-action-cell-texts-item">
                Upload file
              </span>
            </p>
          </div>
        );
      },
    },
    {
      title: "View insights",
      key: "viewInsights",
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
    <div>
      <p className="dashboard-heading">Published Bids</p>

      <Table
        columns={columns}
        dataSource={bids}
        pagination={{ pageSize: 50 }}
        scroll={{ x: 1200, y: 400 }}
      />

      <Modal
        title={<p className="modal-heading">Edit Bid</p>}
        open={isEditBidModalOpen}
        onCancel={() => setIsEditBidModalOpen(false)}
        footer={false}
      >
        <ClientEditBid bid={activeEditBid} />
      </Modal>

      <Modal
        title={<p className="modal-heading">Bid Insights</p>}
        open={isViewBidModalOpen}
        onCancel={() => setIsViewBidModalOpen(false)}
        footer={false}
      >
        <p style={{ textAlign: "center" }}>(placeholder)</p>
      </Modal>
    </div>
  );
}
