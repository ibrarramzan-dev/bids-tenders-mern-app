export default function SearchResultsBidsItem({ bid, onItemClick }) {
  const { title, description } = bid;

  return (
    <div onClick={() => onItemClick(bid)} className="SearchResultsBidsItem">
      <p className="SearchResultsBidsItem-title">{title}</p>
      <p>{description}</p>
    </div>
  );
}
