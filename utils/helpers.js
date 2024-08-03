import bidTypes from "./bidTypes";

export const formatTimeForTable = (bids) => {
  return bids.map((bid) => {
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
};

export const mapBidTypeToFullForm = (type) => {
  return bidTypes.find((obj) => obj.value === type).label;
};

export const isBidClosed = (closingDate) => {
  const [date, time] = closingDate.split(" ");
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const closingDateObj = new Date(year, month - 1, day, hour, minute);

  return new Date() > closingDateObj;
};

export const formatTextWithoutSpaceLowerCase = (text) => {
  return text.replace(/\s+/g, "").toLowerCase();
};

export const generateRandomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from({ length: 6 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join("");
};
