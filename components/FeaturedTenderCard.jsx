import Image from "next/image";

export default function FeaturedTenderCard({
  logo,
  coName,
  name,
  classification,
}) {
  return (
    <div className="FeaturedTenderCard">
      <div className="FeaturedTenderCard-co-logo-name-wrapper">
        <div>
          <div>
            <Image src={logo} alt={coName} width={50} height={50} />
          </div>
          <div>{coName}</div>
        </div>
      </div>

      <p>{name}</p>

      <p>{classification}</p>
    </div>
  );
}
