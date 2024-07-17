import { Montserrat } from "next/font/google";
import SearchResultsBidsItem from "./SearchResultsBidsItem";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["500"] });

export default function SearchResultsBids({ list }) {
  return (
    <div className={`SearchResultsBids ${montserrat.className}`}>
      {list.map((bid) => (
        <SearchResultsBidsItem bid={bid} />
      ))}
    </div>
  );
}
