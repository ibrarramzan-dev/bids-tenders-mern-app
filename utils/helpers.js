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
  return bidTypes.find((obj) => obj.value).label;
};
