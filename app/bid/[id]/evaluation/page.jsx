"use client";

import { useParams } from "next/navigation";

export default function Evaluation() {
  const params = useParams();

  const { id: bidId } = params;

  console.log("bidId: ", bidId);

  return <div>Evaluation</div>;
}
