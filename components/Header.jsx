"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import {
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import logo from "@/public/images/logo.png";
import bidClassification from "@/utils/bidClassification";

const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

const uploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const supplierExperience = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "6",
    label: "6",
  },
  {
    value: "7",
    label: "7",
  },
  {
    value: "8",
    label: "8",
  },
  {
    value: "9",
    label: "9",
  },
  {
    value: "10",
    label: "10",
  },
  {
    value: "10+",
    label: "10+",
  },
];

export default function Header() {
  const [isLoginConfirmModalOpen, setIsLoginConfirmModalOpen] = useState(false);
  const [isSignupConfirmModalOpen, setIsSignupConfirmModalOpen] =
    useState(false);
  const [isSupplierLoginModalOpen, setIsSupplierLoginModalOpen] =
    useState(false);
  const [isClientLoginModalOpen, setIsClientLoginModalOpen] = useState(false);
  const [isSupplierSignupModalOpen, setIsSupplierSignupModalOpen] =
    useState(false);
  const [isClientSignupModalOpen, setIsClientSignupModalOpen] = useState(false);
  const [clientSignupFormValues, setClientSignupFormValues] = useState({});
  const [supplierSignupForm] = Form.useForm();
  const [clientSignupForm] = Form.useForm();

  const headerMobileMenuRef = useRef(null);

  const onSignupConfirmModalOpen = () => {
    setIsSignupConfirmModalOpen(true);
  };

  const onLoginConfirmModalClose = () => {
    setIsLoginConfirmModalOpen(false);
  };

  const onSignupConfirmModalClose = () => {
    setIsSignupConfirmModalOpen(false);
  };

  const onMobileMenuSignupConfirmOpen = () => {
    if (headerMobileMenuRef.current) {
      headerMobileMenuRef.current.style.visibility = "hidden";
    }
    setIsSignupConfirmModalOpen(true);
  };

  const onOpenMenu = () => {
    if (headerMobileMenuRef.current) {
      headerMobileMenuRef.current.style.visibility = "visible";
    }
  };

  const onCloseMenu = () => {
    if (headerMobileMenuRef.current) {
      headerMobileMenuRef.current.style.visibility = "hidden";
    }
  };

  const onSupplierLoginClick = () => {
    setIsLoginConfirmModalOpen(false);
    setIsSupplierLoginModalOpen(true);
  };

  const onClientLoginClick = () => {
    setIsLoginConfirmModalOpen(false);
    setIsClientLoginModalOpen(true);
  };

  const onSupplierSignupClick = () => {
    setIsSignupConfirmModalOpen(false);
    setIsSupplierSignupModalOpen(true);
  };

  const onClientSignupClick = () => {
    setIsSignupConfirmModalOpen(false);
    setIsClientSignupModalOpen(true);
  };

  const onValuesChange = ({ fieldName }) => {
    if (!fieldValue && fieldName) {
      setFieldvalue(fieldName);
    }
  };

  return (
    <header className="shadow bottom">
      <div className="Header-left">
        <Link href="/">
          <Image src={logo} alt="Logo" width={70} />
        </Link>
      </div>

      <div className="Header-right">
        <ul className={poppins.className}>
          <li>
            <Button
              onClick={() => setIsLoginConfirmModalOpen(true)}
              type="default"
              size="large"
            >
              Login
            </Button>
          </li>

          <li className="Header-right-sign-up-btn-wrapper">
            <Button
              onClick={onSignupConfirmModalOpen}
              type="primary"
              size="large"
            >
              Sign Up
            </Button>
          </li>
        </ul>

        <MenuOutlined className="Header-hamburger" onClick={onOpenMenu} />

        <div className="Header-mobile-menu" ref={headerMobileMenuRef}>
          <div className="Header-mobile-menu-close-icon-wrapper">
            <CloseOutlined onClick={onCloseMenu} />
          </div>

          <div className="Header-mobile-menu-ul-wrapper">
            <div className="Header-mobile-menu-search-wrapper">
              <SearchOutlined
                title="Search bids or suppliers"
                className="Header-mobile-menu-search-icon"
              />

              <input placeholder="Search bids or tender" />
            </div>

            <Link href="/supplier-login">
              <p>Supplier login</p>
            </Link>

            <Link href="/client-login">
              <p>Client login</p>
            </Link>

            <div>
              <button onClick={onMobileMenuSignupConfirmOpen}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>

      {/* Login confirm modal */}
      <Modal
        title={<p className="modal-heading">Login</p>}
        open={isLoginConfirmModalOpen}
        onCancel={onLoginConfirmModalClose}
        footer={false}
        className="Header-signup-confirm-modal"
      >
        <div className="Header-signup-confirm-modal-wrapper">
          <div className="Header-signup-confirm-modal-supplier-or-client-wrapper">
            <div>
              <Button type="primary" onClick={onClientLoginClick}>
                <p>Login as A Client?</p>
                <p>
                  Humanitarian Agencies, Government Agencies, Cooperations...
                  etc
                </p>
              </Button>
            </div>
            <div>
              <Button onClick={onSupplierLoginClick}>
                <p>Login as A Supplier?</p>
                <p>
                  Service Provider, Goods Supplier, Construction Companies,
                  Business Services, Consultancies... etc
                </p>
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Signup confirm modal */}
      <Modal
        title={<p className="modal-heading">Signup</p>}
        open={isSignupConfirmModalOpen}
        onCancel={onSignupConfirmModalClose}
        footer={false}
        className="Header-signup-confirm-modal"
      >
        <div className="Header-signup-confirm-modal-wrapper">
          <div className="Header-signup-confirm-modal-supplier-or-client-wrapper">
            <div>
              <Button type="primary" onClick={onClientSignupClick}>
                <p>Signup as A Client?</p>
                <p>
                  Humanitarian Agencies, Government Agencies, Cooperations...
                  etc
                </p>
              </Button>
            </div>
            <div>
              <Button onClick={onSupplierSignupClick}>
                <p>Signup as A Supplier?</p>
                <p>
                  Service Provider, Goods Supplier, Construction Companies,
                  Business Services, Consultancies... etc
                </p>
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Login as Supplier */}
      <Modal
        title={
          <p className="modal-heading">
            Login as <b>Supplier</b>
          </p>
        }
        open={isSupplierLoginModalOpen}
        onCancel={() => setIsSupplierLoginModalOpen(false)}
        footer={false}
      >
        <div>
          <Form onFinish={() => {}}>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="password" placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Login as Client */}
      <Modal
        title={
          <p className="modal-heading">
            Login as <b>Client</b>
          </p>
        }
        open={isClientLoginModalOpen}
        onCancel={() => setIsClientLoginModalOpen(false)}
        footer={false}
      >
        <div>
          <Form onFinish={() => {}}>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="password" placeholder="Enter password" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Signup as Supplier */}
      <Modal
        title={
          <p className="modal-heading">
            Signup as <b>Supplier</b>
          </p>
        }
        open={isSupplierSignupModalOpen}
        onCancel={() => setIsSupplierSignupModalOpen(false)}
        footer={false}
      >
        <div className="Header-signup-modal-form-wrapper">
          <Form form={supplierSignupForm} onFinish={() => {}}>
            <p className="modal-sub-heading">Supplier Company Details</p>

            <Form.Item
              label="Company Name"
              name="companyName"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>

            <Form.Item
              label="Company Logo"
              name="companyLogo"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload logo</Button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Scope of Operation"
              name="scopeOfOperation"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select scope of operation"
                onChange={() => {}}
                options={bidClassification}
              />
            </Form.Item>

            <Form.Item
              label="Experience"
              name="experience"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select experience"
                onChange={() => {}}
                options={supplierExperience}
              />
            </Form.Item>

            <p className="modal-sub-heading">Supplier User Details</p>

            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="password" placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Telephone"
              name="telephone"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  const val = e.target.value;
                  const numericVal = val.replace(/[^\d]/g, "");

                  supplierSignupForm.setFieldValue("telephone", numericVal);
                }}
                placeholder="Enter telephone"
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {/* Signup as Client */}
      <Modal
        title={
          <p className="modal-heading">
            Signup as <b>Client</b>
          </p>
        }
        open={isClientSignupModalOpen}
        onCancel={() => setIsClientSignupModalOpen(false)}
        footer={false}
        style={{ zIndex: "1000000000" }}
      >
        <div className="Header-signup-modal-form-wrapper">
          <Form
            form={clientSignupForm}
            onValuesChange={(values) => setClientSignupFormValues(values)}
            onFinish={() => {}}
          >
            <p className="modal-sub-heading">Client Company Details</p>

            <Form.Item
              label="Company Name"
              name="companyName"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input placeholder="Enter company name" />
            </Form.Item>
            <Form.Item
              label="Company Logo"
              name="companyLogo"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Upload logo</Button>
              </Upload>
            </Form.Item>

            <p className="modal-sub-heading">Client User Details</p>

            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="email" placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input type="password" placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              label="Telephone (Optional)"
              name="telephone"
              labelCol={{ span: 24 }}
            >
              <Input
                onChange={(e) => {
                  const val = e.target.value;
                  const numericVal = val.replace(/[^\d]/g, "");

                  supplierSignupForm.setFieldValue("telephone", numericVal);
                }}
                placeholder="Enter telephone"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </header>
  );
}
