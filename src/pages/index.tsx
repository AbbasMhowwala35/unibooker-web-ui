import Head from "next/head";
import Image from "next/image";
import { Jost } from "next/font/google";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "@/styles/Home.module.css";
import location1 from '../Images/locations/1.png'
import location2 from '../Images/locations/2.png'
import location3 from '../Images/locations/3.png'
import location4 from '../Images/locations/4.png'
import company1 from '../Images/company/1.png'
import company2 from '../Images/company/2.png'
import company3 from '../Images/company/3.png'
import company4 from '../Images/company/4.png'
import company5 from '../Images/company/5.png'
import d1 from '../Images/d1.svg'
import d2 from '../Images/d2.svg'
import d3 from '../Images/d3.svg'
import testimonial from '../Images/testimonial.png'
import person1 from '../Images/person1.jpg'
import Link from "next/link";
import Newsletter from "./components/common/Newsletter";
import CarCard from "./components/common/CarCard";
// Define Jost font
const jostFont = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export default function Home() {
  const testimonials = [
    {
      name: 'John Doe',
      location: 'New York, USA',
      testimonial: 'We have a unique combination of talents motivated by ambitious goals and a can-do attitude. Our drive to develop excellent products is built on teamwork, passion, and giving team members full control over their work to succeed on their own. We want to create an environment where ideas can flourish.',
      image: person1,
    },
    {
      name: 'Jane Smith',
      location: 'London, UK',
      testimonial: 'Amazing experience! I highly recommend this service.',
      image: person1,
    },
  ];

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <button className={styles.nextArrow}>Next</button>,
    prevArrow: <button className={styles.prevArrow}>Prev</button>,
  };

  const cars = [
    {
      id: "1",
      name: "Tesla",
      rating: 5,
      reviews: 242,
      location: "Wilora NT 0872, Australia",
      price: "$165,3",
      distance: "12 km",
      wishlist: "/static/wishlist.png",
    },
    {
      id: "2",
      name: "BMW",
      rating: 4.5,
      reviews: 128,
      location: undefined,
      price: "$120,0",
      distance: "8 km",
      wishlist: undefined,
    },
  ];

  return (
    <>
      <Head>
        <title>Unibooker | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page} ${jostFont.variable}`}>
        {/* Hero Section */}
        <div className={styles.hero_bg}>
          <Container>
            <Row className="align-items-center">
              <Col md={6}>
                <h1>Easy and Convenient Way of Car Booking in <span>UniBooker</span></h1>
                <p>Vestibulum ultricies aliquam convallis. Maecenas ut tellus mi. Proin tincidunt, lectus eu volutpat.</p>
              </Col>
              <Col md={6}>
                <Card className={styles.search_box}>
                  <Card.Body>
                    <form>
                      <div className="form-inputs mb-3">
                        <label htmlFor="location">Location</label>
                        <select id="location" className="form-control">
                          <option value="">Select a Location</option>
                          <option value="new-york">New York</option>
                          <option value="los-angeles">Los Angeles</option>
                          <option value="chicago">Chicago</option>
                          <option value="houston">Houston</option>
                          <option value="miami">Miami</option>
                        </select>
                      </div>
                      <div className="form-inputs mb-3">
                        <label htmlFor="date">Date</label>
                        <input id="date" type="date" className="form-control" />
                      </div>
                      <div className="form-inputs mb-3">
                        <label htmlFor="time">Time</label>
                        <input id="time" type="time" className="form-control" />
                      </div>
                      <Button className={styles.theme_btn} type="submit">
                        Search
                      </Button>
                    </form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        <main className={`${styles.main} container`}>
          {/* Popular Locations Section */}
          <section className={styles.popular_locations}>
            <h2 className={styles.main_heading}>Popular Locations</h2>
            <Slider className={styles.location_slider} {...sliderSettings}>
              <div className={styles.location_card}>
                <Image src={location1} alt="Location 1" />
                <h3>Location 1</h3>
              </div>
              <div className={styles.location_card}>
                <Image src={location2} alt="Location 2" />
                <h3>Location 2</h3>
              </div>
              <div className={styles.location_card}>
                <Image src={location3} alt="Location 2" />
                <h3>Location 2</h3>
              </div>
              <div className={styles.location_card}>
                <Image src={location4} alt="Location 2" />
                <h3>Location 2</h3>
              </div>
            </Slider>
            <Link className={styles.btn_link} href="/">Explore All</Link>
          </section>
          {/* Company Logos Section */}
          <section className={styles.company_logos}>
            <div className={styles.company_logos_row}>
              {/* {companyLogos.map((logo, index) => (
              <Col md={2} key={index}>
                <div className={styles.company_logos_div}>
                  <Image src={logo.src} alt={logo.alt} width={150} height={150} layout="intrinsic" />
                </div>
              </Col>
            ))} */}
              <div>
                <div className={styles.company_logos_div}>
                  <Image src={company1} alt="Company" />
                </div>
              </div>
              <div>
                <div className={styles.company_logos_div}>
                  <Image src={company2} alt="Company" />
                </div>
              </div>
              <div>
                <div className={styles.company_logos_div}>
                  <Image src={company3} alt="Company" />
                </div>
              </div>
              <div>
                <div className={styles.company_logos_div}>
                  <Image src={company4} alt="Company" />
                </div>
              </div>
              <div>
                <div className={styles.company_logos_div}>
                  <Image src={company5} alt="Company" />
                </div>
              </div>
            </div>
          </section>
          {/* Most Viewed Cars Section */}
          <section className={styles.most_viewed_cars}>
            <h2 className={styles.main_heading}>Most Viewed Cars</h2>
            <div className={styles.cars_row}>
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={{
                  pathname: `/cars/${car.id}`,
                  query: { car: JSON.stringify(car) }
                }}
                >
                <CarCard
                  id={car.id}
                  name={car.name}
                  rating={car.rating}
                  reviews={car.reviews}
                  location={car.location}
                  price={car.price}
                  distance={car.distance}
                  wishlist={car.wishlist}
                />
                </Link>
              ))}
            </div>
            <Link className={styles.btn_link} href="/">Explore All</Link>
          </section>
          {/* Deliverables Section */}
          <section className={styles.deliverables}>
            <div className={styles.deliverables_row}>
              <div className={styles.deliverables_block}>
                <Image src={d1} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
              <div className={styles.deliverables_block}>
                <Image src={d2} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
              <div className={styles.deliverables_block}>
                <Image src={d3} alt="Deliverables" />
                <div className={styles.deliverables_content_block}>
                  <h5>700 Destinations</h5>
                  <p>Our expert team handpicked all destinations in this site</p>
                </div>
              </div>
            </div>
          </section>
          {/* Short Advertising Banner */}
          <section className={styles.advertising_banner}>
            <div className={styles.advertising_banner_content}>
              <h3>Lend your car to make <br /> some extra cash</h3>
              <Link className={styles.advertising_btn} href="/">Become A Host</Link>
            </div>
          </section>
          {/* Recommended Cars Section */}
          <section className={styles.recommended_cars}>
            <h2 className={styles.main_heading}>Recommended Cars</h2>
            <div className={styles.cars_row}>
              {cars.map((car) => (
                <Link
                  key={car.id}
                  href={{
                    pathname: `/cars/${car.id}`,
                    query: { car: JSON.stringify(car) }
                  }}
                  >
                  <CarCard
                    id={car.id}
                    name={car.name}
                    rating={car.rating}
                    reviews={car.reviews}
                    location={car.location}
                    price={car.price}
                    distance={car.distance}
                    wishlist={car.wishlist}
                  />
                </Link>
              ))}
            </div>
          </section>
          {/* Travel Stories Section */}
          <section className={styles.travel_stories}>
            <h3>Client Testimonial</h3>
            <Row className="align-items-baseline">
              <Col md={6}>
                <Image src={testimonial} className={styles.travel_stories_img} alt="Travel Story" />
              </Col>
              <Col md={6}>
                <div>
                  <Slider {...settings}>
                    {testimonials.map((testimonial, index) => (
                      <div key={index} className={styles.testimonialSlide}>
                        <p>{testimonial.testimonial}</p>
                        <div className="d-flex gap-3">
                          <Image src={testimonial.image} className={styles.testimonial_img} alt={`Testimonial from ${testimonial.name}`} />
                          <div className={styles.clientInfo}>
                            <h5>{testimonial.name}</h5>
                            <p>{testimonial.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </Col>
            </Row>
          </section>
        </main>
        <Newsletter />
      </div>
    </>
  );
}