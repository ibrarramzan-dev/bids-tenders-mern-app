import { Tag } from "antd";
import React from "react";
import Image from "next/image";
import { isBidClosed, mapBidTypeToFullForm } from "@/utils/helpers";
import pin from "@/public/images/pin.png";
import Link from "next/link";
import { FileTextOutlined } from "@ant-design/icons";

export default function ViewBid({ bid }) {
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

  return (
    <div className="ViewBid">
      <p className="ViewBid-title-and-status-wrapper">
        <p className="ViewBid-title">{title}</p>
        <Tag
          color={`${isBidClosed(bid.submissionClosingDate) ? "red" : "green"}`}
          bordered={false}
          className="ViewBid-status"
        >
          {isBidClosed(bid.submissionClosingDate) ? "Closed" : "Open"}
        </Tag>
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
            <p>{agencyName}</p>
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
