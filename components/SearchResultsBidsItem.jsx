export default function SearchResultsBidsItem({ bid }) {
  const { title, description } = bid;

  return (
    <div className="SearchResultsBidsItem">
      <p className="SearchResultsBidsItem-title">{title}</p>
      <p>{description}</p>

      <br />
      <hr />
    </div>
  );
}
