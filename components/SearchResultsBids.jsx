import SearchResultsBidsItem from "./SearchResultsBidsItem";

export default function SearchResultsBids({ list }) {
  return (
    <div className="SearchResultsBids">
      {list.map((bid) => (
        <SearchResultsBidsItem bid={bid} />
      ))}
    </div>
  );
}
