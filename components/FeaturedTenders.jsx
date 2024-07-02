import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FeaturedTenderCard from "./FeaturedTenderCard";
import data from "@/utils/bidsData";
import { useSelector } from "react-redux";

export default function FeaturedTenders() {
  const bidsFeatured = data.filter((bid) => bid.featured);

  const bids = useSelector((state) => state.bids);

  const featuredBids = bids.filter((bid) => bid.featured);

  return (
    <section className="FeaturedTenders">
      <p className="FeaturedTenders-heading">Featured Tenders</p>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={featuredBids.length}
        isPlaying
        interval={4000}
        infinite
        className="FeaturedTenders-carousel"
        // style={{ height: "1rem" }}
      >
        <Slider style={{ height: "13rem" }}>
          {featuredBids.map((bid, index) => (
            <Slide index={index} key={bid.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // height: "70%",
                }}
              >
                <FeaturedTenderCard
                  logo={bid.agencyLogo}
                  coName={bid.agencyName}
                  name={bid.title}
                  classification={bid.classification.join(", ")}
                />
              </div>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </section>
  );
}
