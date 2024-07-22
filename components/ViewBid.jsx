import { Alert, Tag } from "antd";
import { HeartOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Image from "next/image";
import { isBidClosed, mapBidTypeToFullForm } from "@/utils/helpers";
import pin from "@/public/images/pin.png";
import Link from "next/link";
import { FileTextOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function ViewBid({ bid }) {
  const { type: userType } = useSelector((state) => state.user);

  const {
    createdAt,
    title,
    description,
    submissionClosingDate,
    classification,
    agencyName,
    agencyLogo,
    type,
    region,
    city,
    status,
    submissionLinkOrEmail,
    attachments,
  } = bid;

  const onApply = () => {
    alert("applied");
  };

  const onSave = () => {};

  return (
    <div className="ViewBid">
      <p className="ViewBid-title-and-status-wrapper">
        <p className="ViewBid-title">{title}</p>

        <div>
          <Tag
            color={`${
              isBidClosed(bid.submissionClosingDate) ? "red" : "green"
            }`}
            bordered={false}
            className="ViewBid-status-tag"
          >
            {isBidClosed(bid.submissionClosingDate) ? "Closed" : "Open"}
          </Tag>

          {userType === "supplier" &&
          !isBidClosed(bid.submissionClosingDate) ? (
            <Tag onClick={onApply} color="blue" className="ViewBid-apply-tag">
              APPLY <RightOutlined />
            </Tag>
          ) : null}

          {userType !== "guest" && !isBidClosed(bid.submissionClosingDate) ? (
            <HeartOutlined onClick={onSave} style={{ marginRight: "0.2rem" }} />
          ) : null}

          {!isBidClosed(bid.submissionClosingDate) &&
          userType !== "supplier" ? (
            <Alert message="Login as supplier to apply" type="warning" />
          ) : null}
        </div>
      </p>

      <p className="ViewBid-description">{description}</p>

      <div className="ViewBid-attachments">
        <span className="ViewBid-attachments-label">Attachments: </span>
        {attachments.map((attachment) => (
          <Link
            href={attachment}
            style={{ marginRight: "0.4rem", fontSize: "0.98rem" }}
            target="_blank"
          >
            <FileTextOutlined />
          </Link>
        ))}

        {attachments.length === 0 ? "N/A" : null}
      </div>

      <hr />
      <br />

      <div className="ViewBid-info-columns-wrapper">
        <div className="ViewBid-info-column-1">
          <p className="ViewBid-field-heading" style={{ marginTop: "0" }}>
            Date Published
          </p>
          <p>{createdAt}</p>

          <p className="ViewBid-field-heading ViewBid-field-heading-closing-date">
            Closing Date (Submission)
          </p>
          <p>{submissionClosingDate}</p>

          <p className="ViewBid-field-heading">Submission link</p>
          <Link href={`mailto:${submissionLinkOrEmail}`}>
            {submissionLinkOrEmail}
          </Link>
        </div>
        <div className="ViewBid-info-column-2">
          <div className="ViewBid-info-column-2-agency-info">
            <Image src={agencyLogo} alt={agencyName} width={35} height={35} />
            <p>
              <b>{agencyName}</b>
            </p>
          </div>

          <div className="ViewBid-info-column-2-location">
            <Image
              src={pin}
              alt=""
              width="15"
              height="18"
              style={{ marginTop: "5px" }}
            />{" "}
            <p>
              {region}, {city}
            </p>
          </div>

          <p className="ViewBid-field-heading">Bid type</p>
          <p>{mapBidTypeToFullForm(type)}</p>
        </div>
      </div>

      <br />
      <p>
        {classification.map((item) => (
          <Tag>{item}</Tag>
        ))}
      </p>
    </div>
  );
}
