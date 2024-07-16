import axios from "axios";
import { formatTimeForTable } from "./helpers";

export const getClientBids = async (clientId) => {
  const { data } = await axios.get(
    `/api/bids/client-published/${user.data._id}`
  );

  return formatTimeForTable(data);
};
