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

export default function FeaturedTenders() {
  const bidsFeatured = data.filter((bid) => bid.featured);

  return (
    <section className="FeaturedTenders">
      <p className="FeaturedTenders-heading">Featured Tenders</p>

      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={125}
        totalSlides={bidsFeatured.length}
        isPlaying
        interval={4000}
        infinite
        className="FeaturedTenders-carousel"
        // style={{ height: "1rem" }}
      >
        <Slider style={{ height: "13rem" }}>
          {bidsFeatured.map((bid, index) => (
            <Slide index={index}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  // height: "70%",
                }}
              >
                <FeaturedTenderCard
                  logo={bid.organizationLogo}
                  coName={bid.organization}
                  name={bid.name}
                  classification={bid.classification}
                />
              </div>
            </Slide>
          ))}
        </Slider>
      </CarouselProvider>
    </section>
  );
}
