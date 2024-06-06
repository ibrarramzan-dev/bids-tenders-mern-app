import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function HomeBanner() {
  return (
    <section className={`HomeBanner ${montserrat.className}`}>
      <div>
        <p className="HomeBanner-heading">Bid Opportunities</p>
        <p className="HomeBanner-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation.
        </p>
      </div>
    </section>
  );
}
